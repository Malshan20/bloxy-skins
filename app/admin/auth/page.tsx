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

export default function AdminAuthPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login"
  const [activeTab, setActiveTab] = useState(defaultTab)
  const { signIn, signUp, user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && user.role === "admin") {
      router.push("/admin")
    }
  }, [user, router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would connect to your authentication system
    signIn({ email: "admin@example.com", password: "password", role: "admin" })
    toast({
      title: "Logged in as admin",
      description: "Welcome to the admin dashboard!",
    })
    router.push("/admin")
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would connect to your authentication system
    signUp({ email: "admin@example.com", password: "password", role: "admin" })
    toast({
      title: "Admin account created",
      description: "Your admin account has been created successfully!",
    })
    router.push("/admin")
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
                <CardTitle className="text-2xl text-white">Admin Portal</CardTitle>
                <CardDescription className="text-gray-400">
                  Sign in to your admin account or create a new one
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Admin Sign In</TabsTrigger>
              <TabsTrigger value="register">Admin Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="admin@example.com" required />
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
                    <Label htmlFor="admin-code">Admin Access Code</Label>
                    <Input id="admin-code" type="password" placeholder="Enter admin access code" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Sign In as Admin
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Admin Name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="admin@example.com" required />
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
                    <Label htmlFor="admin-registration-key">Admin Registration Key</Label>
                    <Input
                      id="admin-registration-key"
                      type="password"
                      placeholder="Enter admin registration key"
                      required
                    />
                    <p className="text-xs text-muted-foreground">This key is provided by the system administrator</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Create Admin Account
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

