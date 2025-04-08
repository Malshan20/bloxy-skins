"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getProductById, getRelatedProducts } from "@/lib/data"
import { useCart } from "@/components/cart-provider"
import { ProductCard } from "@/components/product-card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const router = useRouter()

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.id)

  const discountedPrice = product.discount ? Math.round(product.price * (1 - product.discount / 100)) : null

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    router.push("/checkout")
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-black/50">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
          {product.discount && <Badge className="absolute top-4 right-4 bg-purple-600">{product.discount}% OFF</Badge>}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-white">{product.name}</h1>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-700 text-gray-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            {discountedPrice ? (
              <>
                <span className="text-3xl font-bold text-white">{discountedPrice.toLocaleString()} R$</span>
                <span className="text-xl text-gray-400 line-through">{product.price.toLocaleString()} R$</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-white">{product.price.toLocaleString()} R$</span>
            )}
          </div>

          <Separator className="my-6" />

          <p className="text-gray-400">{product.description}</p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">
              Seller: <span className="text-purple-400">{product.seller}</span>
            </p>
            <p className="mb-2 text-sm font-medium">
              Category:{" "}
              <span className="text-purple-400">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </p>
            <p className="mb-2 text-sm font-medium">
              Availability:
              {product.stock > 0 ? (
                <span className="text-green-500"> In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-500"> Out of Stock</span>
              )}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-r-none"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="flex h-10 w-14 items-center justify-center border border-l-0 border-r-0 border-input">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-l-none"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
              <Heart className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-purple-600 text-purple-400"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleBuyNow} disabled={product.stock === 0}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="rounded-lg border border-white/10 bg-black/50 p-6">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <p className="text-gray-400">{product.description}</p>

              <h4 className="text-lg font-semibold mt-6 mb-2">Features</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-400">
                <li>High-quality digital asset for Roblox games</li>
                <li>Instant delivery to your account after purchase</li>
                <li>Compatible with most popular Roblox games</li>
                <li>Unique design not available elsewhere</li>
                <li>Created by verified seller {product.seller}</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="rounded-lg border border-white/10 bg-black/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button className="bg-purple-600 hover:bg-purple-700">Write a Review</Button>
              </div>

              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b border-white/10 pb-6 last:border-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
                          <span className="font-semibold text-purple-400">{["JD", "MK", "TS"][i]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{["John Doe", "Mary Kim", "Tom Smith"][i]}</p>
                          <p className="text-xs text-gray-400">{["2 days ago", "1 week ago", "3 weeks ago"][i]}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < [5, 4, 5][i] ? "fill-yellow-400 text-yellow-400" : "fill-gray-700 text-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400">
                      {
                        [
                          "Amazing product! The quality is outstanding and it looks even better in-game than in the preview images. Highly recommend!",
                          "Great value for the price. The design is unique and I've received many compliments from other players.",
                          "Exactly what I was looking for. The seller was responsive to my questions and the delivery was instant.",
                        ][i]
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <div className="rounded-lg border border-white/10 bg-black/50 p-6">
              <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
              <p className="text-gray-400 mb-4">
                As this is a digital product, delivery is instant after purchase confirmation. The item will be
                automatically added to your Roblox inventory.
              </p>

              <h4 className="text-lg font-semibold mt-6 mb-2">How it works</h4>
              <ol className="list-decimal pl-5 space-y-2 text-gray-400">
                <li>Complete your purchase through our secure checkout</li>
                <li>We'll process your order immediately</li>
                <li>The digital item will be added to your Roblox account</li>
                <li>You'll receive a confirmation email with details</li>
                <li>Log into Roblox to start using your new item</li>
              </ol>

              <div className="mt-6 p-4 bg-purple-600/10 rounded-lg border border-purple-600/20">
                <p className="text-purple-400 font-medium">
                  Note: Make sure your Roblox account is correctly linked to your GameSkins profile for seamless
                  delivery.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

