import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, Truck, Clock, BarChart4 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Comprehensive logistics solutions from China to Canada tailored to your business needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-12">
            {[
              {
                title: "Crowdfunding Fulfillment",
                description:
                  "Specialized logistics solutions for crowdfunding campaigns shipping from China to Canada.",
                features: [
                  "Backer-ready packaging and presentation",
                  "Customs clearance and documentation",
                  "Bulk shipping with individual distribution",
                  "Campaign timeline coordination",
                  "Quality control before shipping",
                ],
                icon: Package,
                image: "/placeholder.svg?height=300&width=500",
                href: "/services/crowdfunding-fulfillment",
              },
              {
                title: "Ecommerce Fulfillment",
                description:
                  "End-to-end fulfillment services for ecommerce businesses operating between China and Canada.",
                features: [
                  "Inventory management and storage",
                  "Order processing and fulfillment",
                  "Integration with major ecommerce platforms",
                  "Custom packaging and branding options",
                  "Returns management",
                ],
                icon: Truck,
                image: "/placeholder.svg?height=300&width=500",
                href: "/services/ecommerce-fulfillment",
              },
              {
                title: "Amazon Fulfillment",
                description:
                  "Optimized logistics for Amazon sellers importing products from China to Canadian markets.",
                features: [
                  "FBA preparation and compliance",
                  "Amazon labeling and packaging requirements",
                  "Direct shipping to Amazon fulfillment centers",
                  "Inventory forecasting and management",
                  "Amazon seller account support",
                ],
                icon: Clock,
                image: "/placeholder.svg?height=300&width=500",
                href: "/services/amazon-fulfillment",
              },
              {
                title: "B2B Fulfillment",
                description: "Business-to-business logistics solutions for importing from China to Canada.",
                features: [
                  "Bulk shipping and container management",
                  "Commercial customs clearance",
                  "Warehouse-to-warehouse delivery",
                  "Inventory distribution to multiple locations",
                  "Supply chain optimization",
                ],
                icon: BarChart4,
                image: "/placeholder.svg?height=300&width=500",
                href: "/services/b2b-fulfillment",
              },
            ].map((service, index) => (
              <div key={index} className="grid gap-6 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <service.icon className="h-6 w-6 text-red-700" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">{service.title}</h2>
                    <p className="text-gray-500 md:text-lg">{service.description}</p>
                  </div>
                  <ul className="grid gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-red-700" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <Link href={service.href}>
                      <Button className="mt-4 bg-blue-700 hover:bg-blue-800">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    width={500}
                    height={300}
                    alt={service.title}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Custom Logistics Solutions</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't see exactly what you need? We specialize in creating tailored logistics solutions for unique
                requirements.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-blue-700 hover:bg-blue-800">Contact Our Team</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Import the CheckCircle2 icon at the top of the file
import { CheckCircle2 } from "lucide-react"
