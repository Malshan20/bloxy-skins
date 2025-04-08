"use client"

import type React from "react"

import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "./cart-provider"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const router = useRouter()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    router.push("/checkout")
  }

  const discountedPrice = product.discount ? Math.round(product.price * (1 - product.discount / 100)) : null

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="overflow-hidden border-white/10 bg-black/80 transition-all hover:border-purple-500/50 hover:shadow-md hover:shadow-purple-500/10">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
          {product.discount && <Badge className="absolute top-2 right-2 bg-purple-600">{product.discount}% OFF</Badge>}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-white line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviews})</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
          <div className="flex items-center gap-2">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold text-white">{discountedPrice.toLocaleString()} R$</span>
                <span className="text-sm text-gray-400 line-through">{product.price.toLocaleString()} R$</span>
              </>
            ) : (
              <span className="text-lg font-bold text-white">{product.price.toLocaleString()} R$</span>
            )}
          </div>
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-purple-600 text-purple-400"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add
            </Button>
            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

