import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, Truck, Clock, BarChart4, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gray-800 py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/homewarehouse.png"
            alt="Logistics Warehouse"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-center text-white">
            {/* Logo section added here */}
            <div className="flex justify-center items-center mb-6">
              <div className="relative w-[120px] h-[60px]">
                <Image src="/ku-logo2.png" alt="ChinaTo.ca Logo" fill className="object-contain" />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white drop-shadow-md">ChinaTo.ca</h1>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white drop-shadow-md">
              The <span className="text-blue-500 drop-shadow-md">Fulfillment Solution</span> That Knows China-Canada Shipping Best
            </h2>
            <p className="mx-auto max-w-[800px] text-white md:text-lg drop-shadow-md">
              Every business shipping from China to Canada needs a reliable partner. Our diverse team with extensive
              logistics experience can help fulfill your shipping needs and deliver your products better.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button size="lg" className="bg-blue-700 text-white hover:bg-blue-800">
                Get A Quote
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-gray-700">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "20+", label: "Shipping Lines" },
              { number: "3", label: "Fulfillment Centers" },
              { number: "15%", label: "Reduction on Cost" },
              { number: "200+", label: "Satisfied Clients" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">{stat.number}</span>
                <span className="mt-2 text-sm font-medium text-blue-700 md:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fast & Affordable Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                NEW
                <span className="ml-2 rounded-full bg-blue-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  2025
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fast & Affordable</h2>
              <p className="max-w-[600px] text-gray-700 md:text-lg font-medium">
                Our optimized shipping routes and strategic partnerships with carriers allow us to offer the fastest
                delivery times at the most competitive rates in the industry.
              </p>
              <ul className="space-y-2">
                {[
                  "Express shipping in as little as 5-7 days",
                  "Cost savings of up to 15% compared to market rates",
                  "Real-time tracking and notifications",
                  "Dedicated account manager for your business",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-red-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button className="bg-blue-700 hover:bg-blue-800">
                  View Pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/api/placeholder?width=600&height=400"
                width={600}
                height={400}
                alt="Fast Shipping"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Complete Fulfillment Solutions</h2>
              <p className="max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
                End-to-end logistics services tailored for businesses shipping from China to Canada
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Crowdfunding Fulfillment",
                description: "Specialized logistics for crowdfunding campaigns with backer-ready packaging.",
                icon: Package,
                href: "/services/crowdfunding-fulfillment",
              },
              {
                title: "Ecommerce Fulfillment",
                description: "End-to-end fulfillment services for ecommerce businesses with seamless integration.",
                icon: Truck,
                href: "/services/ecommerce-fulfillment",
              },
              {
                title: "Amazon FBA Prep",
                description: "Optimized logistics for Amazon sellers with FBA preparation and direct shipping.",
                icon: Clock,
                href: "/services/amazon-fulfillment",
              },
              {
                title: "B2B Fulfillment",
                description: "Business-to-business logistics solutions with bulk shipping and customs handling.",
                icon: BarChart4,
                href: "/services/b2b-fulfillment",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 rounded-full bg-gray-100 p-3 text-red-700">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="mb-4 flex-1 text-gray-700">{service.description}</p>
                <Link
                  href={service.href}
                  className="mt-auto inline-flex items-center text-sm font-medium text-blue-700 hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Seamless Ecommerce Integrations</h2>
              <p className="max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
                Connect your online store directly to our fulfillment system for automated order processing and
                real-time inventory management.
              </p>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <Image
                src="/ecommerce-integrations.jpg"
                width={600}
                height={400}
                alt="Ecommerce Integrations"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
                {["Shopify", "WooCommerce", "Magento", "Amazon", "eBay", "Etsy", "BigCommerce", "Wix"].map(
                  (platform, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-sm font-medium">{platform}</span>
                    </div>
                  ),
                )}
              </div>
              <div className="flex justify-center md:justify-start">
                <Button className="bg-blue-700 hover:bg-blue-800">
                  View All Integrations <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
              <p className="max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
                Simple, transparent process from pickup in China to delivery in Canada
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Connect",
                description: "Integrate your store or send inventory to our fulfillment center in China.",
              },
              {
                step: "2",
                title: "Store",
                description: "We safely store your products in our state-of-the-art warehouse facilities.",
              },
              {
                step: "3",
                title: "Ship",
                description: "When orders come in, we pick, pack, and ship your products to your customers.",
              },
              {
                step: "4",
                title: "Track",
                description: "Monitor everything in real-time through our advanced dashboard.",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button className="bg-blue-700 hover:bg-blue-800">Learn More About Our Process</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
              <p className="max-w-[700px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium">
                Trusted by businesses across Canada
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "ChinaTo.ca transformed our supply chain. Their attention to detail and reliability have made our business more efficient and our customers happier.",
                author: "Sarah Johnson",
                company: "TechGadgets Inc.",
                image: "/api/placeholder?width=60&height=60",
              },
              {
                quote:
                  "As an Amazon seller, their FBA prep services have saved us countless hours and headaches. The cost savings are significant too!",
                author: "Michael Chen",
                company: "Global Imports",
                image: "/api/placeholder?width=60&height=60",
              },
              {
                quote:
                  "Their B2B fulfillment services have helped us scale our business and enter the Canadian market with confidence. Highly recommended!",
                author: "David Williams",
                company: "Maple Enterprises",
                image: "/api/placeholder?width=60&height=60",
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <p className="mb-4 text-gray-700">{testimonial.quote}</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/api/placeholder?width=60&height=60"}
                    width={60}
                    height={60}
                    alt={testimonial.author}
                    className="mr-4 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 py-20 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Simplify Your Logistics?
              </h2>
              <p className="max-w-[700px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with ChinaTo.ca today and experience seamless shipping from China to Canada
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
                Get a Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
