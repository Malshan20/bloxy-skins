"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { DollarSign, Plus, Search, ShoppingBag, Trash, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SellerPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // Redirect if not logged in or not seller
  useEffect(() => {
    if (!user) {
      router.push("/seller/auth")
    } else if (user.role !== "seller" && user.role !== "admin") {
      router.push("/become-seller")
      toast({
        title: "Access denied",
        description: "You need to be a seller to access this page.",
      })
    }
  }, [user, router, toast])

  if (!user || (user.role !== "seller" && user.role !== "admin")) {
    return null
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Product added",
      description: "Your product has been added to the marketplace.",
    })
  }

  const handleDeleteProduct = (id: string) => {
    toast({
      title: "Product deleted",
      description: `Product #${id} has been deleted.`,
    })
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Seller Dashboard</h1>
            <p className="text-gray-400">Manage your products and sales</p>
          </div>
          <div className="w-full md:w-auto">
            <form className="flex w-full gap-2 md:w-auto">
              <Input placeholder="Search products..." className="w-full md:w-[300px] bg-white/5" />
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
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-black/80">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,230 R$</div>
              <p className="text-xs text-muted-foreground">+1,200 R$ from last month</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-black/80">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Upload className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-3">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="sales">Sales History</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>My Products</CardTitle>
                <CardDescription>Manage your products in the marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
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
                        category: "Weapons",
                        price: "1,000 R$",
                        status: "Active",
                      },
                      {
                        id: "PRD002",
                        name: "Mythic Armor Set",
                        category: "Armor",
                        price: "2,500 R$",
                        status: "Active",
                      },
                      {
                        id: "PRD003",
                        name: "Rare Character Skin",
                        category: "Characters",
                        price: "800 R$",
                        status: "Active",
                      },
                      {
                        id: "PRD004",
                        name: "Epic Vehicle Skin",
                        category: "Vehicles",
                        price: "1,200 R$",
                        status: "Inactive",
                      },
                      {
                        id: "PRD005",
                        name: "Limited Edition Hat",
                        category: "Accessories",
                        price: "500 R$",
                        status: "Active",
                      },
                    ].map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
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
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="h-8">
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 border-red-600 text-red-500 hover:text-red-600"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add-product" className="mt-6">
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Add a new product to the marketplace</CardDescription>
              </CardHeader>
              <form onSubmit={handleAddProduct}>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input id="product-name" placeholder="Enter product name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-category">Category</Label>
                      <Select>
                        <SelectTrigger id="product-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weapons">Weapons</SelectItem>
                          <SelectItem value="armor">Armor</SelectItem>
                          <SelectItem value="characters">Characters</SelectItem>
                          <SelectItem value="vehicles">Vehicles</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-price">Price (R$)</Label>
                      <Input id="product-price" type="number" placeholder="Enter price" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product-quantity">Quantity</Label>
                      <Input id="product-quantity" type="number" placeholder="Enter quantity" required />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea
                        id="product-description"
                        placeholder="Enter product description"
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="product-image">Product Image</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="product-image"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-white/20 bg-white/5 hover:bg-white/10"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">PNG, JPG or GIF (MAX. 2MB)</p>
                          </div>
                          <input id="product-image" type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="mt-6">
            <Card className="border-white/10 bg-black/80">
              <CardHeader>
                <CardTitle>Sales History</CardTitle>
                <CardDescription>View your sales history and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        id: "ORD001",
                        product: "Legendary Sword Skin",
                        customer: "User123",
                        date: "2023-04-01",
                        amount: "1,000 R$",
                        status: "Completed",
                      },
                      {
                        id: "ORD002",
                        product: "Mythic Armor Set",
                        customer: "Gamer456",
                        date: "2023-04-02",
                        amount: "2,500 R$",
                        status: "Completed",
                      },
                      {
                        id: "ORD003",
                        product: "Rare Character Skin",
                        customer: "Player789",
                        date: "2023-04-03",
                        amount: "800 R$",
                        status: "Completed",
                      },
                      {
                        id: "ORD004",
                        product: "Epic Vehicle Skin",
                        customer: "Robloxian101",
                        date: "2023-04-04",
                        amount: "1,200 R$",
                        status: "Processing",
                      },
                      {
                        id: "ORD005",
                        product: "Limited Edition Hat",
                        customer: "GamerPro",
                        date: "2023-04-05",
                        amount: "500 R$",
                        status: "Completed",
                      },
                    ].map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
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

