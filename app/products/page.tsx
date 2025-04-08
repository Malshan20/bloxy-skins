"use client"

import { useState, useEffect } from "react"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import type { FilterState } from "@/lib/types"
import { filterProducts } from "@/lib/data"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    priceRange: [0, 5000],
    sortBy: "newest",
    search: "",
  })

  const [filteredProducts, setFilteredProducts] = useState(products)

  // Find the maximum price in the product list
  const maxPrice = Math.max(...products.map((product) => product.price))

  useEffect(() => {
    setFilteredProducts(filterProducts(products, filters.category, filters.priceRange, filters.sortBy, filters.search))
  }, [filters])

  return (
    <div className="container px-4 py-12 mx-auto">
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
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

