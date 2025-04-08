"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories } from "@/lib/data"
import type { FilterState } from "@/lib/types"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

interface ProductFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  maxPrice: number
}

export function ProductFilters({ filters, onChange, maxPrice }: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters)
  const [priceLabel, setPriceLabel] = useState<string>(`0 - ${maxPrice.toLocaleString()} R$`)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  // Update price label when price range changes
  useEffect(() => {
    setPriceLabel(`${localFilters.priceRange[0].toLocaleString()} - ${localFilters.priceRange[1].toLocaleString()} R$`)
  }, [localFilters.priceRange])

  const handlePriceChange = (value: number[]) => {
    setLocalFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]] as [number, number],
    }))
  }

  const handleCategoryChange = (value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      category: value === "all" ? null : value,
    }))
  }

  const handleSortChange = (value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      sortBy: value as FilterState["sortBy"],
    }))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters((prev) => ({
      ...prev,
      search: e.target.value,
    }))
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    applyFilters()
  }

  const applyFilters = () => {
    onChange(localFilters)
  }

  const resetFilters = () => {
    const resetState: FilterState = {
      category: null,
      priceRange: [0, maxPrice],
      sortBy: "newest",
      search: "",
    }
    setLocalFilters(resetState)
    onChange(resetState)
  }

  const MobileFilters = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={localFilters.category || "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Price Range</Label>
              <span className="text-sm text-muted-foreground">{priceLabel}</span>
            </div>
            <Slider
              min={0}
              max={maxPrice}
              step={100}
              value={[localFilters.priceRange[0], localFilters.priceRange[1]]}
              onValueChange={handlePriceChange}
              className="py-4"
            />
          </div>

          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={localFilters.sortBy} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter className="flex-row gap-2 sm:flex-row">
          <Button variant="outline" className="flex-1" onClick={resetFilters}>
            Reset
          </Button>
          <SheetClose asChild>
            <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={applyFilters}>
              Apply Filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )

  const DesktopFilters = () => (
    <div className="hidden space-y-6 md:block">
      <div className="space-y-2">
        <h3 className="font-medium">Categories</h3>
        <div className="space-y-1">
          <Button
            variant={!localFilters.category ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => handleCategoryChange("all")}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={localFilters.category === category.slug ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => handleCategoryChange(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <h3 className="font-medium">Price Range</h3>
          <span className="text-sm text-muted-foreground">{priceLabel}</span>
        </div>
        <Slider
          min={0}
          max={maxPrice}
          step={100}
          value={[localFilters.priceRange[0], localFilters.priceRange[1]]}
          onValueChange={handlePriceChange}
          className="py-4"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Sort By</h3>
        <Select value={localFilters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 pt-4">
        <Button onClick={applyFilters} className="w-full bg-purple-600 hover:bg-purple-700">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={resetFilters} className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  )

  return (
    <div className="w-full">
      <form onSubmit={handleSearchSubmit} className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-10 bg-white/5"
          value={localFilters.search}
          onChange={handleSearchChange}
        />
        {localFilters.search && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full aspect-square"
            onClick={() => {
              setLocalFilters((prev) => ({ ...prev, search: "" }))
              onChange({ ...localFilters, search: "" })
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Products</h2>
        <div className="flex items-center gap-2">
          <MobileFilters />
          <Select
            value={localFilters.sortBy}
            onValueChange={(value) => {
              handleSortChange(value)
              onChange({ ...localFilters, sortBy: value as FilterState["sortBy"] })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {DesktopFilters()}
    </div>
  )
}

