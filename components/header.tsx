"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Package, ShoppingCart, Store, Building2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-[48px] h-[32px]">
            <Image src="/ku-logo2.png" alt="ChinaTo.ca Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-semibold">ChinaTo.ca</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/how-it-works" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    How it Works
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[600px] gap-4 p-6 md:w-[750px] md:grid-cols-2 lg:w-[900px]">
                    {services.map((service) => (
                      <ListItem
                        key={service.title}
                        title={service.title}
                        href={service.href}
                        description={service.description}
                        icon={service.icon}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/price" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-2 py-2" onClick={() => setIsOpen(false)}>
                  <div className="relative w-[36px] h-[24px]">
                    <Image src="/ku-logo2.png" alt="ChinaTo.ca Logo" fill className="object-contain" />
                  </div>
                  <span className="text-lg font-semibold">ChinaTo.ca</span>
                </Link>
                <Link href="/how-it-works" className="py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                  How it Works
                </Link>
                <div className="py-2">
                  <h3 className="mb-2 text-lg font-medium">Services</h3>
                  <div className="ml-4 flex flex-col gap-2">
                    {services.map((service) => (
                      <Link
                        key={service.title}
                        href={service.href}
                        className="text-gray-600 hover:text-blue-700"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/price" className="py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Pricing
                </Link>
                <Link href="/about" className="py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                  About Us
                </Link>
                <Link href="/get-a-quote" className="py-2 text-lg font-medium" onClick={() => setIsOpen(false)}>
                  Get a Quote
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:block">
          <Button className="bg-blue-700 hover:bg-blue-800">
            <Link href="/get-a-quote">Get a Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

const services = [
  {
    title: "Crowdfunding Fulfillment",
    href: "/services/crowdfunding-fulfillment",
    description: "Specialized logistics solutions for crowdfunding campaigns shipping from China to Canada.",
    icon: Package,
  },
  {
    title: "Ecommerce Fulfillment",
    href: "/services/ecommerce-fulfillment",
    description: "End-to-end fulfillment services for ecommerce businesses operating between China and Canada.",
    icon: ShoppingCart,
  },
  {
    title: "Amazon Fulfillment",
    href: "/services/amazon-fulfillment",
    description: "Optimized logistics for Amazon sellers importing products from China to Canadian markets.",
    icon: Store,
  },
  {
    title: "B2B Fulfillment",
    href: "/services/b2b-fulfillment",
    description: "Business-to-business logistics solutions for importing from China to Canada.",
    icon: Building2,
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
    description: string
    icon: LucideIcon
  }
>(({ className, title, description, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-blue-700 focus:bg-gray-100 focus:text-blue-700",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-blue-100 p-2">
              <Icon className="h-5 w-5 text-blue-700" />
            </div>
            <div className="text-base font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500 ml-10">{description}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
