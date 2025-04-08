"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { products, getFeaturedProducts } from "@/lib/data"
import type { FilterState } from "@/lib/types"
import { ProductFilters } from "@/components/product-filters"
import { filterProducts } from "@/lib/data"

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    priceRange: [0, 5000],
    sortBy: "newest",
    search: "",
  })

  const [filteredProducts, setFilteredProducts] = useState(products)
  const featuredProducts = getFeaturedProducts()

  // Find the maximum price in the product list
  const maxPrice = Math.max(...products.map((product) => product.price))

  useEffect(() => {
    setFilteredProducts(filterProducts(products, filters.category, filters.priceRange, filters.sortBy, filters.search))
  }, [filters])

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/header.jpg?height=1080&width=1920"
            alt="Gaming characters"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Go shop exclusive digital items
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-300">
            Find exclusive experiences to level up your gaming during the Roblox season. Invest in the digital transfer,
            skins, and upgrades for your character.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-950/40">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Items</h2>
            <Link href="/products">
              <Button variant="outline" className="border-purple-600 text-purple-400">
                View All Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products with Filters */}
      <section className="py-20 bg-black">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <ProductFilters filters={filters} onChange={setFilters} maxPrice={maxPrice} />
            </div>

            <div className="w-full md:w-3/4">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="No results"
                    width={200}
                    height={200}
                    className="opacity-50 mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        category: null,
                        priceRange: [0, maxPrice],
                        sortBy: "newest",
                        search: "",
                      })
                    }
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-950/40">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white">Why GameSkins?</h2>
              <div className="mt-8 space-y-8">
                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600/20">
                    <CheckCircle className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Premium Content</h3>
                    <p className="mt-2 text-gray-400">
                      Bring characters to the next level with special in-game skins and items.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600/20">
                    <CheckCircle className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Trusted Sellers</h3>
                    <p className="mt-2 text-gray-400">
                      Verified and trusted collaborators with global brands and businesses.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600/20">
                    <CheckCircle className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Limited Edition</h3>
                    <p className="mt-2 text-gray-400">
                      Enjoy custom crafted items - each uniquely numbered for authenticity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">We work with:</h2>
              <div className="grid grid-cols-2 gap-6 mt-8 sm:grid-cols-2">
                <div className="flex items-center justify-center p-6 bg-white/5 rounded-xl">
                  <Image src="/roblox.svg?height=80&width=160" alt="Partner logo" width={160} height={80} />
                </div>
                <div className="flex items-center justify-center p-6 bg-white/5 rounded-xl">
                  <Image src="/steam.svg?height=80&width=160" alt="Partner logo" width={160} height={80} />
                </div>
                <div className="flex items-center justify-center p-6 bg-white/5 rounded-xl">
                  <Image src="/riot.svg?height=80&width=160" alt="Partner logo" width={160} height={80} />
                </div>
                <div className="flex items-center justify-center p-6 bg-white/5 rounded-xl">
                  <Image src="/asg.svg?height=80&width=160" alt="Partner logo" width={160} height={80} />
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

