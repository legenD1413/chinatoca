import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-[48px] h-[32px]">
                <Image src="/spss-logo.png" alt="SinoPrimeShipping Logo" fill className="object-contain" />
              </div>
             
            </Link>
            <p className="text-sm text-gray-500">
            SinoPrimeShipping logistics solutions for shipping from China to Canada. Reliable, efficient, and cost-effective.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-800">Services</h3>
            <ul className="space-y-2">
              {[
                { name: "Crowdfunding Fulfillment", href: "/services/crowdfunding-fulfillment" },
                { name: "Ecommerce Fulfillment", href: "/services/ecommerce-fulfillment" },
                { name: "Amazon Fulfillment", href: "/services/amazon-fulfillment" },
                { name: "B2B Fulfillment", href: "/services/b2b-fulfillment" },
                { name: "Pick & Pack", href: "/services/pick-and-pack" },
              ].map((service) => (
                <li key={service.name}>
                  <Link href={service.href} className="text-sm text-gray-600 hover:text-blue-700">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-800">Company</h3>
            <ul className="space-y-2">
              {[
                { name: "How it Works", href: "/how-it-works" },
                { name: "Pricing", href: "/price" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-blue-700">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-800">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-700" />
                <Link href="/about#locations" className="text-sm text-gray-600 hover:text-blue-700">Our Locations</Link>
              </li>
            

              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-700" />
                <span className="text-sm text-gray-600">info@SinoPrimeshipping.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} SinoPrimeShipping. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
