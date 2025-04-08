import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { GamepadIcon as GameController } from "lucide-react"
import Link from "next/link"

export default function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <div className="min-h-screen bg-black">
          <header className="sticky top-0 z-50 w-full border-b bg-black/80 backdrop-blur-sm border-white/10">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto">
              <div className="flex items-center">
                <Link href="/seller" className="flex items-center gap-2">
                  <GameController className="w-8 h-8 text-purple-500" />
                  <span className="text-xl font-bold text-white">BloxySkins Seller</span>
                </Link>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

