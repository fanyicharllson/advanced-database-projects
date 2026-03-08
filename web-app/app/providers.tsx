"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { JSX, useState } from "react";

/**
 * A higher-order component that wraps the application in a QueryClientProvider
 * and ReactQueryDevtools for easy debugging of the application's queries.
 *
 * @param {{ children: React.ReactNode }} props - The children to render wrapped in the provider.
 * @returns {JSX.Element} The wrapped children with query client and devtools.
 */
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
