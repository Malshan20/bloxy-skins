"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"

export default function BecomeSellerPage() {
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Application submitted",
      description: "We'll review your application and get back to you soon.",
    })
    // In a real app, this would submit the application to your backend
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto">
      
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Become a Seller</h1>
          <p className="text-gray-400">Join our marketplace and start selling your digital items</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>Seller Application</CardTitle>
                <CardDescription>Fill out the form below to apply to become a seller</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roblox-username">Roblox Username</Label>
                    <Input id="roblox-username" placeholder="Your Roblox username" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio URL (Optional)</Label>
                    <Input id="portfolio" type="url" placeholder="Link to your portfolio or previous work" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Textarea
                      id="experience"
                      placeholder="Describe your experience creating digital items"
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="why-join">Why do you want to join?</Label>
                    <Textarea
                      id="why-join"
                      placeholder="Tell us why you want to become a seller on our platform"
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    Submit Application
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div>
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>Benefits of Becoming a Seller</CardTitle>
                <CardDescription>Why you should join our marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-500 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Reach Millions of Players</h3>
                      <p className="text-sm text-gray-400">
                        Gain access to our large user base of Roblox players looking for unique digital items.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-500 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Competitive Commission Rates</h3>
                      <p className="text-sm text-gray-400">
                        Enjoy some of the most competitive commission rates in the industry, keeping more of your
                        earnings.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-500 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Powerful Seller Tools</h3>
                      <p className="text-sm text-gray-400">
                        Access our suite of seller tools to manage your products, track sales, and grow your business.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-500 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Dedicated Support</h3>
                      <p className="text-sm text-gray-400">
                        Get priority support from our team to help you succeed as a seller on our platform.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCircle className="w-6 h-6 text-purple-500 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-white">Community & Collaboration</h3>
                      <p className="text-sm text-gray-400">
                        Join a community of talented creators and collaborate on exciting projects.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-400"
                  onClick={() => router.push("/seller/auth")}
                >
                  Already approved? Sign in as a seller
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

