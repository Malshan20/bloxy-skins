"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { Mail } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login"
  const [activeTab, setActiveTab] = useState(defaultTab)
  const { signIn, signUp, user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would connect to your authentication system
    signIn({ email: "user@example.com", password: "password" })
    toast({
      title: "Logged in successfully",
      description: "Welcome back to GameSkins!",
    })
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would connect to your authentication system
    signUp({ email: "user@example.com", password: "password" })
    toast({
      title: "Account created successfully",
      description: "Welcome to GameSkins!",
    })
  }

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} login initiated`,
      description: "This would connect to the provider in a real app.",
    })
    // In a real app, this would redirect to the OAuth provider
    setTimeout(() => {
      signIn({ provider })
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-black to-purple-950/40">
      <div className="w-full max-w-md">
        <Card className="border-white/10 bg-black/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">Welcome to BloxySkins</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
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
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Sign In
                  </Button>

                  <div className="relative flex items-center justify-center w-full mt-6 mb-4">
                    <div className="absolute w-full border-t border-white/10"></div>
                    <div className="relative px-4 text-xs text-gray-400 bg-black">or continue with</div>
                  </div>

                  <div className="grid w-full grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10"
                      onClick={() => handleSocialLogin("Google")}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10"
                      onClick={() => handleSocialLogin("Discord")}
                    >
                      <DiscordLogoIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10"
                      onClick={() => handleSocialLogin("Steam")}
                    >
                      <GitHubLogoIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-4 text-center space-y-2">
                    <Button variant="link" className="text-purple-400" onClick={() => router.push("/admin/auth")}>
                      Admin Login
                    </Button>
                    <Button variant="link" className="text-purple-400" onClick={() => router.push("/seller/auth")}>
                      Seller Login
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                    Create Account
                  </Button>

                  <div className="relative flex items-center justify-center w-full mt-6 mb-4">
                    <div className="absolute w-full border-t border-white/10"></div>
                    <div className="relative px-4 text-xs text-gray-400 bg-black">or continue with</div>
                  </div>

                  <div className="grid w-full grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10"
                      onClick={() => handleSocialLogin("Google")}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10"
                      onClick={() => handleSocialLogin("Discord")}
                    >
                      <DiscordLogoIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10"
                      onClick={() => handleSocialLogin("Steam")}
                    >
                      <GitHubLogoIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-4 text-center space-y-2">
                    <Button variant="link" className="text-purple-400" onClick={() => router.push("/admin/auth")}>
                      Admin Login
                    </Button>
                    <Button variant="link" className="text-purple-400" onClick={() => router.push("/seller/auth")}>
                      Seller Login
                    </Button>
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

