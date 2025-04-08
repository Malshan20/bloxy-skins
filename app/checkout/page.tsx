"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CreditCard, Landmark, Truck, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [step, setStep] = useState<"cart" | "shipping" | "payment" | "confirmation">("cart")
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "bank-transfer">("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  // Shipping cost calculation (simplified)
  const shippingCost = 0 // Digital products have no shipping cost
  const tax = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + shippingCost + tax

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="container max-w-4xl px-4 py-12 mx-auto">
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Empty cart"
            width={200}
            height={200}
            className="opacity-50 mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some products to your cart to proceed to checkout</p>
          <Link href="/products">
            <Button className="bg-purple-600 hover:bg-purple-700">Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleContinueToShipping = () => {
    setStep("shipping")
    window.scrollTo(0, 0)
  }

  const handleContinueToPayment = () => {
    setStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep("confirmation")
      clearCart()
      window.scrollTo(0, 0)
    }, 2000)
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <div className="container max-w-6xl px-4 py-12 mx-auto">
      {step !== "confirmation" ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            {/* Checkout Steps */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-6">Checkout</h1>
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "cart" ? "bg-purple-600" : "bg-green-600"}`}
                >
                  {step === "cart" ? "1" : <Check className="w-4 h-4" />}
                </div>
                <div className={`flex-1 h-1 mx-2 ${step === "cart" ? "bg-gray-700" : "bg-green-600"}`}></div>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "shipping" ? "bg-purple-600" : step === "payment" || step === "confirmation" ? "bg-green-600" : "bg-gray-700"}`}
                >
                  {step === "shipping" ? (
                    "2"
                  ) : step === "payment" || step === "confirmation" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    "2"
                  )}
                </div>
                <div
                  className={`flex-1 h-1 mx-2 ${step === "cart" || step === "shipping" ? "bg-gray-700" : "bg-green-600"}`}
                ></div>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "payment" ? "bg-purple-600" : step === "confirmation" ? "bg-green-600" : "bg-gray-700"}`}
                >
                  {step === "payment" ? "3" : step === "confirmation" ? <Check className="w-4 h-4" /> : "3"}
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>Cart</span>
                <span>Shipping</span>
                <span>Payment</span>
              </div>
            </div>

            {/* Cart Review Step */}
            {step === "cart" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Review Your Cart</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-white/10 bg-black/50"
                    >
                      <div className="relative h-20 w-20 rounded-md overflow-hidden bg-secondary">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">Seller: {item.product.seller}</p>
                        <div className="flex justify-between mt-2">
                          <p className="text-sm">Qty: {item.quantity}</p>
                          <p className="font-medium">{(item.product.price * item.quantity).toLocaleString()} R$</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleContinueToShipping}>
                    Continue to Shipping
                  </Button>
                </div>
              </div>
            )}

            {/* Shipping Step */}
            {step === "shipping" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
                <div className="p-4 rounded-lg border border-purple-600/20 bg-purple-600/10">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-purple-400" />
                    <p className="text-purple-400">Digital products will be delivered instantly to your account</p>
                  </div>
                </div>

                <div className="space-y-4 p-6 rounded-lg border border-white/10 bg-black/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roblox-username">Roblox Username</Label>
                    <Input id="roblox-username" placeholder="Your Roblox username" />
                    <p className="text-xs text-muted-foreground">Required for digital item delivery</p>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setStep("cart")}>
                    Back to Cart
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleContinueToPayment}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {step === "payment" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Payment Method</h2>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as "credit-card" | "bank-transfer")}
                  className="space-y-4"
                >
                  <div
                    className={`flex items-start p-4 rounded-lg border ${paymentMethod === "credit-card" ? "border-purple-600" : "border-white/10"} bg-black/50`}
                  >
                    <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
                    <div className="ml-3 flex-1">
                      <Label htmlFor="credit-card" className="flex items-center gap-2 font-medium">
                        <CreditCard className="h-5 w-5" />
                        Credit / Debit Card
                      </Label>

                      {paymentMethod === "credit-card" && (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="name-on-card">Name on Card</Label>
                            <Input id="name-on-card" placeholder="John Doe" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`flex items-start p-4 rounded-lg border ${paymentMethod === "bank-transfer" ? "border-purple-600" : "border-white/10"} bg-black/50`}
                  >
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-1" />
                    <div className="ml-3 flex-1">
                      <Label htmlFor="bank-transfer" className="flex items-center gap-2 font-medium">
                        <Landmark className="h-5 w-5" />
                        Bank Transfer
                      </Label>

                      {paymentMethod === "bank-transfer" && (
                        <div className="mt-4 space-y-2">
                          <p className="text-sm text-muted-foreground">
                            You will receive bank transfer instructions after placing your order.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setStep("shipping")}>
                    Back to Shipping
                  </Button>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-1/3">
            <div className="sticky top-20 rounded-lg border border-white/10 bg-black/50 p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal.toLocaleString()} R$</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `${shippingCost.toLocaleString()} R$`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{tax.toLocaleString()} R$</span>
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{total.toLocaleString()} R$</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Order Details</h3>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>{(item.product.price * item.quantity).toLocaleString()} R$</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Order Confirmation */
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-green-600/20 flex items-center justify-center">
              <Check className="h-12 w-12 text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-6">Thank you for your purchase</p>

          <div className="rounded-lg border border-white/10 bg-black/50 p-6 mb-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number</span>
                <span className="font-medium">ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold">{total.toLocaleString()} R$</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span>{paymentMethod === "credit-card" ? "Credit Card" : "Bank Transfer"}</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-8">
            Your digital items will be delivered to your Roblox account shortly. You will also receive a confirmation
            email with your order details.
          </p>

          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleBackToHome}>
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  )
}

