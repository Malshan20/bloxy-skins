"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Search, ShoppingBag, Ticket, Users, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Redirect if not logged in or not admin
  useEffect(() => {
    if (!user) {
      router.push("/auth")
    } else if (user.role !== "admin") {
      router.push("/")
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      })
    }
  }, [user, router, toast])

  if (!user || user.role !== "admin") {
    return null
  }

  const handleApprove = (id: string) => {
    toast({
      title: "Application approved",
      description: `Seller application #${id} has been approved.`,
    })
  }

  const handleReject = (id: string) => {
    toast({
      title: "Application rejected",
      description: `Seller application #${id} has been rejected.`,
    })
  }

  const handleResolve = (id: string) => {
    toast({
      title: "Support ticket resolved",
      description: `Support ticket #${id} has been marked as resolved.`,
    })
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your marketplace</p>
          </div>
          <div className="w-full md:w-auto">
            <form className="flex w-full gap-2 md:w-auto">
              <Input placeholder="Search..." className="w-full md:w-[300px] bg-white/5" />
              <Button type="submit" variant="secondary" size="icon">
                <Search className="w-4 h-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-white/10 bg-black/80">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+21 from last week</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-black/80">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">567</div>
              <p className="text-xs text-muted-foreground">+34 from last week</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-black/80">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
              <Ticket className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">5 unresolved</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-3">
            <TabsTrigger value="applications">Seller Applications</TabsTrigger>
            <TabsTrigger value="support">Support Tickets</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="mt-6">
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>Seller Applications</CardTitle>
                <CardDescription>Review and manage seller applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "APP001",
                        name: "John Smith",
                        email: "john@example.com",
                        date: "2023-04-01",
                        status: "Pending",
                      },
                      {
                        id: "APP002",
                        name: "Sarah Johnson",
                        email: "sarah@example.com",
                        date: "2023-04-02",
                        status: "Pending",
                      },
                      {
                        id: "APP003",
                        name: "Michael Brown",
                        email: "michael@example.com",
                        date: "2023-04-03",
                        status: "Pending",
                      },
                      {
                        id: "APP004",
                        name: "Emily Davis",
                        email: "emily@example.com",
                        date: "2023-04-04",
                        status: "Approved",
                      },
                      {
                        id: "APP005",
                        name: "David Wilson",
                        email: "david@example.com",
                        date: "2023-04-05",
                        status: "Rejected",
                      },
                    ].map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.id}</TableCell>
                        <TableCell>{application.name}</TableCell>
                        <TableCell>{application.email}</TableCell>
                        <TableCell>{application.date}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              application.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : application.status === "Rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {application.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {application.status === "Pending" && (
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 border-green-600 text-green-500 hover:text-green-600"
                                onClick={() => handleApprove(application.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 border-red-600 text-red-500 hover:text-red-600"
                                onClick={() => handleReject(application.id)}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Manage customer support tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "TKT001",
                        subject: "Payment issue",
                        user: "john@example.com",
                        date: "2023-04-01",
                        status: "Open",
                      },
                      {
                        id: "TKT002",
                        subject: "Account access",
                        user: "sarah@example.com",
                        date: "2023-04-02",
                        status: "Open",
                      },
                      {
                        id: "TKT003",
                        subject: "Product not received",
                        user: "michael@example.com",
                        date: "2023-04-03",
                        status: "Open",
                      },
                      {
                        id: "TKT004",
                        subject: "Refund request",
                        user: "emily@example.com",
                        date: "2023-04-04",
                        status: "Resolved",
                      },
                      {
                        id: "TKT005",
                        subject: "Technical issue",
                        user: "david@example.com",
                        date: "2023-04-05",
                        status: "Resolved",
                      },
                    ].map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{ticket.user}</TableCell>
                        <TableCell>{ticket.date}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              ticket.status === "Resolved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {ticket.status === "Open" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-green-600 text-green-500 hover:text-green-600"
                              onClick={() => handleResolve(ticket.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Resolve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage marketplace products</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "PRD001",
                        name: "Legendary Sword Skin",
                        seller: "GameMaster",
                        price: "1,000 R$",
                        status: "Active",
                      },
                      {
                        id: "PRD002",
                        name: "Mythic Armor Set",
                        seller: "PixelArtist",
                        price: "2,500 R$",
                        status: "Active",
                      },
                      {
                        id: "PRD003",
                        name: "Rare Character Skin",
                        seller: "DesignPro",
                        price: "800 R$",
                        status: "Active",
                      },
                      {
                        id: "PRD004",
                        name: "Epic Vehicle Skin",
                        seller: "3DCreator",
                        price: "1,200 R$",
                        status: "Inactive",
                      },
                      {
                        id: "PRD005",
                        name: "Limited Edition Hat",
                        seller: "FashionGamer",
                        price: "500 R$",
                        status: "Active",
                      },
                    ].map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.seller}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="h-8">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

