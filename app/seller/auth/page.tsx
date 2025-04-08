"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function SellerAuthPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login"
  const [activeTab, setActiveTab] = useState(defaultTab)
  const { signIn, signUp, user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Redirect if already logged in as seller
  useEffect(() => {
    if (user && user.role === "seller") {
      router.push("/seller")
    }
  }, [user, router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would connect to your authentication system
    signIn({ email: "seller@example.com", password: "password", role: "seller" })
    toast({
      title: "Logged in as seller",
      description: "Welcome to your seller dashboard!",
    })
    router.push("/seller")
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would connect to your authentication system
    signUp({ email: "seller@example.com", password: "password", role: "seller" })
    toast({
      title: "Seller account created",
      description: "Your seller account has been created successfully!",
    })
    router.push("/seller")
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-black to-purple-950/40">
      <div className="w-full max-w-md">
        <Card className="border-white/10 bg-black/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => router.push("/auth")} className="mr-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <CardTitle className="text-2xl text-white">Seller Portal</CardTitle>
                <CardDescription className="text-gray-400">
                  Sign in to your seller account or create a new one
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Seller Sign In</TabsTrigger>
              <TabsTrigger value="register">Seller Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seller@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button variant="link" className="h-auto p-0 text-xs text-purple-400">
                        Forgot password?
                      </Button>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seller-id">Seller ID</Label>
                    <Input id="seller-id" placeholder="Enter your seller ID" required />
                    <p className="text-xs text-muted-foreground">
                      Your seller ID was provided when your application was approved
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Sign In as Seller
                  </Button>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have a seller account?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-purple-400"
                        onClick={() => router.push("/become-seller")}
                      >
                        Apply to become a seller
                      </Button>
                    </p>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name</Label>
                    <Input id="name" placeholder="Your store name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seller@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="approval-code">Seller Approval Code</Label>
                    <Input id="approval-code" type="text" placeholder="Enter your approval code" required />
                    <p className="text-xs text-muted-foreground">
                      This code was sent to you when your seller application was approved
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Create Seller Account
                  </Button>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Don't have an approval code?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-purple-400"
                        onClick={() => router.push("/become-seller")}
                      >
                        Apply to become a seller
                      </Button>
                    </p>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

