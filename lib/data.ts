import type { Product, Category } from "./types"

export const categories: Category[] = [
  { id: "1", name: "Weapons", slug: "weapons" },
  { id: "2", name: "Armor", slug: "armor" },
  { id: "3", name: "Characters", slug: "characters" },
  { id: "4", name: "Vehicles", slug: "vehicles" },
  { id: "5", name: "Accessories", slug: "accessories" },
]

export const products: Product[] = [
  {
    id: "prod_1",
    name: "Legendary Dragon Sword",
    description: "A legendary sword forged from dragon scales. Deals extra damage to mythical creatures.",
    price: 1200,
    category: "weapons",
    image: "/placeholder.svg?height=400&width=400",
    seller: "DragonForge",
    rating: 4.8,
    reviews: 124,
    featured: true,
    tags: ["legendary", "sword", "dragon"],
    stock: 5,
  },
  {
    id: "prod_2",
    name: "Shadow Assassin Armor",
    description: "Complete armor set that grants stealth abilities and increased movement speed.",
    price: 2500,
    category: "armor",
    image: "/placeholder.svg?height=400&width=400",
    seller: "NightStalker",
    rating: 4.9,
    reviews: 89,
    featured: true,
    tags: ["armor", "stealth", "assassin"],
    stock: 3,
  },
  {
    id: "prod_3",
    name: "Cyber Ninja Character",
    description: "Futuristic ninja character with cybernetic enhancements and unique abilities.",
    price: 1800,
    category: "characters",
    image: "/placeholder.svg?height=400&width=400",
    seller: "FutureTech",
    rating: 4.7,
    reviews: 56,
    featured: false,
    tags: ["character", "ninja", "cyber"],
    stock: 10,
  },
  {
    id: "prod_4",
    name: "Hover Racer X2000",
    description: "Ultra-fast hover vehicle with custom paint job and nitro boost capabilities.",
    price: 3200,
    category: "vehicles",
    image: "/placeholder.svg?height=400&width=400",
    seller: "SpeedDemon",
    rating: 4.5,
    reviews: 42,
    featured: true,
    discount: 15,
    tags: ["vehicle", "hover", "racing"],
    stock: 2,
  },
  {
    id: "prod_5",
    name: "Crown of the Ancient King",
    description: "Rare cosmetic headpiece that grants a royal aura and special emotes.",
    price: 950,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    seller: "RoyalTreasures",
    rating: 4.6,
    reviews: 78,
    featured: false,
    tags: ["accessory", "crown", "royal"],
    stock: 7,
  },
  {
    id: "prod_6",
    name: "Dual Plasma Blasters",
    description: "Pair of high-tech energy weapons with custom particle effects.",
    price: 1500,
    category: "weapons",
    image: "/placeholder.svg?height=400&width=400",
    seller: "GalacticArms",
    rating: 4.4,
    reviews: 63,
    featured: false,
    tags: ["weapon", "blaster", "energy"],
    stock: 8,
  },
  {
    id: "prod_7",
    name: "Elemental Mage Robes",
    description: "Magical robes that change appearance based on the elemental magic being used.",
    price: 1750,
    category: "armor",
    image: "/placeholder.svg?height=400&width=400",
    seller: "ArcaneWeavers",
    rating: 4.7,
    reviews: 51,
    featured: false,
    tags: ["armor", "magic", "elemental"],
    stock: 4,
  },
  {
    id: "prod_8",
    name: "Robot Companion Pet",
    description: "Customizable robot pet that follows your character and performs helpful actions.",
    price: 800,
    category: "accessories",
    image: "/placeholder.svg?height=400&width=400",
    seller: "CompanionBots",
    rating: 4.9,
    reviews: 112,
    featured: true,
    tags: ["accessory", "pet", "robot"],
    stock: 15,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter((product) => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const currentProduct = getProductById(productId)
  if (!currentProduct) return []

  return products
    .filter(
      (product) =>
        product.id !== productId &&
        (product.category === currentProduct.category ||
          (product.tags && currentProduct.tags && product.tags.some((tag) => currentProduct.tags?.includes(tag)))),
    )
    .slice(0, limit)
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm)),
  )
}

export function filterProducts(
  products: Product[],
  category: string | null,
  priceRange: [number, number],
  sortBy: string,
  searchTerm = "",
): Product[] {
  let filtered = [...products]

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  // Filter by category
  if (category && category !== "all") {
    filtered = filtered.filter((product) => product.category === category)
  }

  // Filter by price range
  filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

  // Sort products
  switch (sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case "newest":
      // In a real app, you would sort by date
      // Here we'll just use the ID as a proxy for "newest"
      filtered.sort((a, b) => b.id.localeCompare(a.id))
      break
    default:
      break
  }

  return filtered
}

