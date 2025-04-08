export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  seller: string
  rating: number
  reviews: number
  featured?: boolean
  discount?: number
  tags?: string[]
  stock: number
}

export type CartItem = {
  product: Product
  quantity: number
}

export type Category = {
  id: string
  name: string
  slug: string
}

export type FilterState = {
  category: string | null
  priceRange: [number, number]
  sortBy: "price-asc" | "price-desc" | "rating" | "newest"
  search: string
}

