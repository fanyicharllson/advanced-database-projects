import { useEffect, useMemo, useState } from "react";
import { UNSPLASH_KEY } from "./unsplash";

type Orientation = "squarish" | "landscape" | "portrait";

interface UnsplashItem {
  name: string;
  query: string;
  orientation?: Orientation;
}

// Layer 1: in-memory cache — survives re-renders within the same page lifecycle
const memoryCache: Record<string, string> = {};
const SESSION_PREFIX = "unsplash:";

function getCacheKey(name: string, query: string, orientation: string) {
  return `${SESSION_PREFIX}${name}|${query}|${orientation}`;
}

function readCache(key: string): string | null {
  if (memoryCache[key]) return memoryCache[key];
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeCache(key: string, url: string) {
  memoryCache[key] = url;
  try {
    sessionStorage.setItem(key, url);
  } catch {
    // sessionStorage unavailable (e.g. SSR or private mode quota exceeded) — silent fallback
  }
}

export function useUnsplashImages(
  items: UnsplashItem[],
  orientation: Orientation = "squarish",
): Record<string, string> {
  // Start empty on server — avoids SSR/client hydration mismatch from sessionStorage reads
  const [images, setImages] = useState<Record<string, string>>({});

  // After mount (client only), pre-populate from session/memory cache
  useEffect(() => {
    const cached: Record<string, string> = {};
    for (const item of items) {
      const key = getCacheKey(
        item.name,
        item.query,
        item.orientation ?? orientation,
      );
      const url = readCache(key);
      if (url) cached[item.name] = url;
    }
    if (Object.keys(cached).length) setImages(cached);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stable string dep — prevents re-fetching when parent re-renders with a new array reference
  const itemsKey = useMemo(
    () => items.map((i) => `${i.name}|${i.query}`).join(","),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items.map((i) => `${i.name}|${i.query}`).join(",")],
  );

  useEffect(() => {
    if (!UNSPLASH_KEY || !items.length) return;

    // Skip items already in session or memory cache
    const uncached = items.filter(
      (item) =>
        !readCache(
          getCacheKey(item.name, item.query, item.orientation ?? orientation),
        ),
    );

    if (!uncached.length) return;

    const fetchImages = async () => {
      // All requests fire in parallel instead of sequentially
      const results = await Promise.all(
        uncached.map(async (item) => {
          const itemOrientation = item.orientation ?? orientation;
          try {
            const res = await fetch(
              `https://api.unsplash.com/photos/random?query=${encodeURIComponent(item.query)}&orientation=${itemOrientation}&client_id=${UNSPLASH_KEY}`,
            );
            const data = await res.json();
            const url: string = data.urls?.small || "";
            writeCache(
              getCacheKey(item.name, item.query, itemOrientation),
              url,
            );
            return [item.name, url] as const;
          } catch {
            return [item.name, ""] as const;
          }
        }),
      );

      setImages((prev) => ({ ...prev, ...Object.fromEntries(results) }));
    };

    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, orientation]);

  return images;
}
