"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/auth")
    }
  }, [user, router])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully.",
    })
  }

  if (!user) {
    return null
  }

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <Card className="border-white/10 bg-black/80">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <form onSubmit={handleSave}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about your account via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new products, features, and more
                    </p>
                  </div>
                  <Switch id="marketing-emails" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="social-notifications">Social Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when someone follows you or likes your content
                    </p>
                  </div>
                  <Switch id="social-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-products">New Products</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about new product launches</p>
                  </div>
                  <Switch id="new-products" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="border-white/10 bg-black/80">
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>Manage your privacy settings</CardDescription>
          </CardHeader>
          <form onSubmit={handleSave}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-profile">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                  </div>
                  <Switch id="public-profile" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-online">Show Online Status</Label>
                    <p className="text-sm text-muted-foreground">Show when you're online to other users</p>
                  </div>
                  <Switch id="show-online" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-collection">Data Collection</Label>
                    <p className="text-sm text-muted-foreground">Allow us to collect data to improve your experience</p>
                  </div>
                  <Switch id="data-collection" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

