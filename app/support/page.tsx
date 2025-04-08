"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SupportPage() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Support ticket submitted",
      description: "We'll get back to you as soon as possible.",
    })
  }

  return (
    <div className="container max-w-4xl px-4 py-12 mx-auto">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Support Center</h1>
          <p className="text-gray-400">Get help with your account or purchases</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Fill out the form below to get in touch with our support team</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Subject of your inquiry" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue in detail"
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    Submit Ticket
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div>
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I purchase a skin?</AccordionTrigger>
                    <AccordionContent>
                      To purchase a skin, browse our marketplace, select the skin you want, and click the "Buy Now"
                      button. You'll need to be logged in and have sufficient Robux in your account to complete the
                      purchase.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I become a seller?</AccordionTrigger>
                    <AccordionContent>
                      To become a seller, go to the "Become a Seller" page and fill out the application form. Our team
                      will review your application and get back to you within 3-5 business days.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      We accept Robux as the primary payment method on our platform. All transactions are processed
                      securely through the Roblox platform.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I download my purchased skins?</AccordionTrigger>
                    <AccordionContent>
                      After purchasing a skin, it will be automatically added to your inventory. You can access your
                      inventory from your profile page and apply the skins to your characters in-game.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>What is your refund policy?</AccordionTrigger>
                    <AccordionContent>
                      Due to the digital nature of our products, all sales are final and we do not offer refunds. If you
                      encounter any issues with your purchase, please contact our support team.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

