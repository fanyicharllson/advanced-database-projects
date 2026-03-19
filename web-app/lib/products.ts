export interface ProductAttributeValue {
  name: string;
  value: string;
}

export interface ProductInventoryValue {
  quantity: number;
  reorderThreshold: number;
  warehouseLocation?: string;
}

export interface ProductRecord {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  currencyCode: string;
  currencySymbol: string;
  rating: number;
  reviews: number;
  badge: string | null;
  stockCount: number;
  stockLabel: string;
  shortDescription: string;
  description: string;
  imageQuery: string;
  attributes: ProductAttributeValue[];
  highlights: string[];
  warehouseLocations: string[];
  inventory: ProductInventoryValue[];
}

export interface RawProduct {
  product_id: number;
  product_name: string;
  base_price: unknown;
  currency_code?: string | null;
  category?: string | null;
  currency?: {
    currency_code?: string | null;
    symbol?: string | null;
  } | null;
  inventory?: Array<{
    quantity_on_hand?: number | null;
    reorder_threshold?: number | null;
    warehouse?: {
      location?: string | null;
    } | null;
  }>;
  product_attributes?: Array<{
    value?: string | null;
    attribute?: {
      attribute_name?: string | null;
    } | null;
  }>;
}

const FALLBACK_PRODUCTS: RawProduct[] = [
  {
    product_id: 1,
    product_name: "MacBook Pro M3",
    base_price: 1999.99,
    currency_code: "USD",
    category: "Electronics",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 150,
        reorder_threshold: 20,
        warehouse: { location: "New York, USA" },
      },
      {
        quantity_on_hand: 80,
        reorder_threshold: 10,
        warehouse: { location: "London, UK" },
      },
    ],
    product_attributes: [
      { value: "16GB", attribute: { attribute_name: "RAM" } },
      { value: "512GB SSD", attribute: { attribute_name: "Storage" } },
      { value: "14-inch", attribute: { attribute_name: "Screen Size" } },
    ],
  },
  {
    product_id: 2,
    product_name: "Wireless Earbuds Pro",
    base_price: 199.99,
    currency_code: "USD",
    category: "Electronics",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 300,
        reorder_threshold: 50,
        warehouse: { location: "New York, USA" },
      },
      {
        quantity_on_hand: 120,
        reorder_threshold: 30,
        warehouse: { location: "Paris, France" },
      },
    ],
    product_attributes: [
      { value: "Black", attribute: { attribute_name: "Color" } },
      { value: "30 hours", attribute: { attribute_name: "Battery Life" } },
      { value: "0.2kg", attribute: { attribute_name: "Weight" } },
    ],
  },
  {
    product_id: 3,
    product_name: "Running Shoes X1",
    base_price: 129.99,
    currency_code: "USD",
    category: "Sports",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 200,
        reorder_threshold: 40,
        warehouse: { location: "New York, USA" },
      },
      {
        quantity_on_hand: 90,
        reorder_threshold: 20,
        warehouse: { location: "Douala, Cameroon" },
      },
    ],
    product_attributes: [
      { value: "42-45", attribute: { attribute_name: "Size" } },
      { value: "Blue", attribute: { attribute_name: "Color" } },
      { value: "Lightweight mesh", attribute: { attribute_name: "Material" } },
    ],
  },
  {
    product_id: 4,
    product_name: "Leather Handbag",
    base_price: 89.99,
    currency_code: "USD",
    category: "Fashion",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 175,
        reorder_threshold: 25,
        warehouse: { location: "London, UK" },
      },
    ],
    product_attributes: [
      { value: "Brown", attribute: { attribute_name: "Color" } },
      { value: "Leather", attribute: { attribute_name: "Material" } },
      { value: "Medium", attribute: { attribute_name: "Size" } },
    ],
  },
  {
    product_id: 5,
    product_name: "Smart Watch Ultra",
    base_price: 299.99,
    currency_code: "USD",
    category: "Electronics",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 220,
        reorder_threshold: 30,
        warehouse: { location: "New York, USA" },
      },
    ],
    product_attributes: [
      { value: "Titanium", attribute: { attribute_name: "Material" } },
      { value: "48 hours", attribute: { attribute_name: "Battery Life" } },
      { value: "49mm", attribute: { attribute_name: "Screen Size" } },
    ],
  },
  {
    product_id: 6,
    product_name: "Office Chair Pro",
    base_price: 449.99,
    currency_code: "USD",
    category: "Furniture",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 60,
        reorder_threshold: 10,
        warehouse: { location: "New York, USA" },
      },
    ],
    product_attributes: [
      { value: "Black", attribute: { attribute_name: "Color" } },
      { value: "Ergonomic mesh", attribute: { attribute_name: "Material" } },
      { value: "15kg", attribute: { attribute_name: "Weight" } },
    ],
  },
  {
    product_id: 7,
    product_name: "Kids Winter Jacket",
    base_price: 59.99,
    currency_code: "USD",
    category: "Fashion",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 400,
        reorder_threshold: 60,
        warehouse: { location: "Douala, Cameroon" },
      },
    ],
    product_attributes: [
      { value: "Red", attribute: { attribute_name: "Color" } },
      { value: "Warm fleece", attribute: { attribute_name: "Material" } },
      { value: "Kids sizes", attribute: { attribute_name: "Size" } },
    ],
  },
  {
    product_id: 8,
    product_name: "Yoga Mat Premium",
    base_price: 45.99,
    currency_code: "USD",
    category: "Sports",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 350,
        reorder_threshold: 50,
        warehouse: { location: "New York, USA" },
      },
    ],
    product_attributes: [
      { value: "Purple", attribute: { attribute_name: "Color" } },
      { value: "Non-slip foam", attribute: { attribute_name: "Material" } },
      { value: "Standard", attribute: { attribute_name: "Size" } },
    ],
  },
  {
    product_id: 9,
    product_name: "Bluetooth Speaker",
    base_price: 79.99,
    currency_code: "USD",
    category: "Electronics",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 180,
        reorder_threshold: 40,
        warehouse: { location: "London, UK" },
      },
    ],
    product_attributes: [
      { value: "Portable", attribute: { attribute_name: "Size" } },
      { value: "20 hours", attribute: { attribute_name: "Battery Life" } },
      { value: "Black", attribute: { attribute_name: "Color" } },
    ],
  },
  {
    product_id: 10,
    product_name: "Leather Briefcase",
    base_price: 99.99,
    currency_code: "USD",
    category: "Fashion",
    currency: { currency_code: "USD", symbol: "$" },
    inventory: [
      {
        quantity_on_hand: 130,
        reorder_threshold: 25,
        warehouse: { location: "Paris, France" },
      },
    ],
    product_attributes: [
      { value: "Brown", attribute: { attribute_name: "Color" } },
      { value: "Leather", attribute: { attribute_name: "Material" } },
      { value: "15-inch devices", attribute: { attribute_name: "Size" } },
    ],
  },
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Electronics:
    "Built for smooth everyday performance, sharp design, and dependable tech-focused value.",
  Fashion:
    "A polished wardrobe piece designed to look premium and stay comfortable through the day.",
  Sports:
    "Made to support movement, durability, and confident performance wherever your routine takes you.",
  Furniture:
    "A practical statement piece that balances comfort, build quality, and modern styling.",
};

const CATEGORY_HIGHLIGHTS: Record<string, string[]> = {
  Electronics: [
    "Reliable performance for work, study, and entertainment",
    "Clean modern finish that suits premium setups",
    "Easy to pair with other devices in your ecosystem",
  ],
  Fashion: [
    "Versatile styling for casual and elevated looks",
    "Thoughtful finish with a premium everyday feel",
    "Designed to stay comfortable across long wear",
  ],
  Sports: [
    "Lightweight feel with performance-first comfort",
    "Durable enough for regular active use",
    "Built to support training, travel, and daily routines",
  ],
  Furniture: [
    "Comfort-led design for longer use sessions",
    "Professional look that lifts any room instantly",
    "Balanced proportions for home and office spaces",
  ],
};

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  if (
    typeof value === "object" &&
    value !== null &&
    "toString" in value &&
    typeof value.toString === "function"
  ) {
    return Number(value.toString());
  }
  return 0;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getOriginalPrice(price: number, category: string, id: number): number {
  const multiplier =
    {
      Electronics: 1.18,
      Fashion: 1.14,
      Sports: 1.12,
      Furniture: 1.1,
    }[category] ?? 1.08;

  const variation = id % 2 === 0 ? 1.01 : 1;
  return Number((price * multiplier * variation).toFixed(2));
}

function getRating(id: number): number {
  return Number((4.2 + ((id * 7) % 7) * 0.1).toFixed(1));
}

function getReviewCount(id: number): number {
  return 120 + id * 43;
}

function getBadge(stockCount: number, category: string, price: number): string | null {
  if (stockCount > 250) return "Best Seller";
  if (stockCount > 0 && stockCount < 80) return "Limited Stock";
  if (category === "Electronics" && price > 500) return "Premium";
  if (category === "Fashion") return "Trending";
  return null;
}

function getStockLabel(stockCount: number): string {
  if (stockCount <= 0) return "Out of stock";
  if (stockCount < 30) return `Only ${stockCount} left in stock`;
  if (stockCount < 100) return "Ready to ship";
  return "In stock";
}

function getShortDescription(name: string, category: string): string {
  return `${name} brings polished ${category.toLowerCase()} shopping with dependable quality and a premium everyday feel.`;
}

function getDescription(name: string, category: string): string {
  return (
    CATEGORY_DESCRIPTIONS[category] ??
    `${name} is a well-balanced pick for shoppers who want quality, clean styling, and strong everyday value.`
  );
}

function getHighlights(
  category: string,
  attributes: ProductAttributeValue[],
): string[] {
  const attributeHighlights = attributes
    .slice(0, 3)
    .map((attribute) => `${attribute.name}: ${attribute.value}`);

  if (attributeHighlights.length) {
    return attributeHighlights;
  }

  return (
    CATEGORY_HIGHLIGHTS[category] ?? [
      "Thoughtful design that fits everyday use",
      "Solid value for shoppers who want reliability",
      "Works well as a personal upgrade or gift option",
    ]
  );
}

export function formatPrice(product: Pick<ProductRecord, "price" | "currencyCode">) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currencyCode || "USD",
    maximumFractionDigits: 2,
  }).format(product.price);
}

export function normalizeProduct(raw: RawProduct): ProductRecord {
  const price = toNumber(raw.base_price);
  const category = raw.category ?? "General";
  const attributes =
    raw.product_attributes?.map((attribute) => ({
      name: attribute.attribute?.attribute_name ?? "Feature",
      value: attribute.value ?? "Included",
    })) ?? [];
  const inventory =
    raw.inventory?.map((item) => ({
      quantity: item.quantity_on_hand ?? 0,
      reorderThreshold: item.reorder_threshold ?? 0,
      warehouseLocation: item.warehouse?.location ?? undefined,
    })) ?? [];
  const stockCount = inventory.reduce((total, item) => total + item.quantity, 0);

  const product: ProductRecord = {
    id: raw.product_id,
    name: raw.product_name,
    slug: slugify(raw.product_name),
    category,
    price,
    originalPrice: getOriginalPrice(price, category, raw.product_id),
    currencyCode: raw.currency?.currency_code ?? raw.currency_code ?? "USD",
    currencySymbol: raw.currency?.symbol ?? "$",
    rating: getRating(raw.product_id),
    reviews: getReviewCount(raw.product_id),
    badge: getBadge(stockCount, category, price),
    stockCount,
    stockLabel: getStockLabel(stockCount),
    shortDescription: getShortDescription(raw.product_name, category),
    description: getDescription(raw.product_name, category),
    imageQuery: `${raw.product_name} ${category}`.trim(),
    attributes,
    highlights: getHighlights(category, attributes),
    warehouseLocations: inventory
      .map((item) => item.warehouseLocation)
      .filter((location): location is string => Boolean(location)),
    inventory,
  };

  return product;
}

export function getFallbackProducts(): ProductRecord[] {
  return FALLBACK_PRODUCTS.map((product) => normalizeProduct(product));
}
