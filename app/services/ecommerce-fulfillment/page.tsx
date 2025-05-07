import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ShoppingCart, Package, TruckIcon, ArrowRight, Clock, Database, Boxes } from "lucide-react"

export default function EcommerceFulfillment() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Changed to white background */}
      <section className="relative bg-white py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Ecommerce Fulfillment"
            fill
            className="object-cover opacity-5"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6 text-gray-800">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Ecommerce Fulfillment</h1>
              <p className="text-lg text-gray-600 md:text-xl">
                E-Commerce fulfillment is the process of receiving, processing, packaging, and delivering online orders
                to customers. With ChinaTo.ca, DTC brands benefit from a trusted partner that supports their expansion
                into new markets and focuses on growth.
              </p>
              <p className="text-lg text-gray-600">Our comprehensive services include:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-royalblue-600"></div>
                  <span className="text-lg font-medium">Efficient inventory management</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-royalblue-600"></div>
                  <span className="text-lg font-medium">Streamlined order processing</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-royalblue-600"></div>
                  <span className="text-lg font-medium">On time package delivery</span>
                </li>
              </ul>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button size="lg" className="bg-royalblue-700 text-white hover:bg-royalblue-800">
                  Get A Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-royalblue-700 text-royalblue-700 hover:bg-royalblue-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                {/* Platform Integrations */}
                <div className="grid h-full w-full place-items-center rounded-lg bg-white p-8">
                  <div className="relative h-full w-full">
                    {/* Center logo */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-royalblue-600">
                        <Image src="/logo.png" width={40} height={40} alt="ChinaTo.ca Logo" className="h-10 w-10" />
                      </div>
                    </div>

                    {/* Platform logos in a circle around the center */}
                    <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600">
                        <span className="text-white font-bold text-sm">Shopify</span>
                      </div>
                    </div>
                    <div className="absolute right-1/4 top-1/4 translate-x-1/2 -translate-y-1/2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600">
                        <span className="text-white font-bold text-sm">WooCommerce</span>
                      </div>
                    </div>
                    <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600">
                        <span className="text-white font-bold text-sm">Magento</span>
                      </div>
                    </div>
                    <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500">
                        <span className="text-black font-bold text-sm">Amazon</span>
                      </div>
                    </div>
                    <div className="absolute left-1/2 top-10 -translate-x-1/2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                        <span className="text-white font-bold text-sm">Wix</span>
                      </div>
                    </div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
                        <span className="text-white font-bold text-sm">eBay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "99.8%", label: "Order Accuracy" },
              { number: "24h", label: "Processing Time" },
              { number: "15%", label: "Cost Reduction" },
              { number: "200+", label: "Ecommerce Clients" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">{stat.number}</span>
                <span className="mt-2 text-sm font-medium text-royalblue-700 md:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Efficient Ecommerce Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why <span className="text-royalblue-600">Efficient eCommerce</span> Fulfillment Matters
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Every e-commerce brand's best ally is a reliable fulfillment strategy that aligns with customer
                expectations. At ChinaTo.ca, we ensure:
              </p>
              <ul className="space-y-2">
                {[
                  "Faster delivery times to meet customer expectations",
                  "Reduced shipping costs through optimized logistics",
                  "Improved inventory management to prevent stockouts",
                  "Enhanced unboxing experience with custom packaging",
                  "Seamless integration with your ecommerce platform",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button className="bg-royalblue-700 hover:bg-royalblue-800">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Ecommerce Fulfillment Warehouse"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Ecommerce Fulfillment Services */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Ecommerce Fulfillment Services</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Comprehensive solutions for ecommerce businesses shipping from China to Canada
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Inventory Management",
                description:
                  "Real-time inventory tracking, automated reorder notifications, and strategic stock placement across our fulfillment centers.",
                icon: Database,
              },
              {
                title: "Order Processing",
                description:
                  "Automated order fulfillment with same-day processing for orders received before cutoff time, reducing delivery times.",
                icon: ShoppingCart,
              },
              {
                title: "Warehousing",
                description:
                  "Secure storage in our state-of-the-art facilities with climate control and 24/7 security monitoring.",
                icon: Boxes,
              },
              {
                title: "Pick & Pack",
                description:
                  "Accurate order picking and careful packaging with quality checks to ensure products arrive in perfect condition.",
                icon: Package,
              },
              {
                title: "Shipping & Delivery",
                description:
                  "Multiple shipping options with real-time tracking and delivery notifications for you and your customers.",
                icon: TruckIcon,
              },
              {
                title: "Returns Management",
                description:
                  "Streamlined returns process with inspection, restocking, and detailed reporting on return reasons.",
                icon: Clock,
              },
            ].map((service, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 rounded-full bg-gray-100 p-3 text-burgundy-700 w-fit">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="mb-4 flex-1 text-gray-500">{service.description}</p>
                <Link
                  href="#"
                  className="mt-auto inline-flex items-center text-sm font-medium text-royalblue-700 hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Ecommerce Integrations"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Seamless Platform Integrations</h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Connect your online store directly to our fulfillment system for automated order processing and
                real-time inventory management. We integrate with all major ecommerce platforms.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
                {["Shopify", "WooCommerce", "Magento", "Amazon", "eBay", "Etsy", "BigCommerce", "Wix"].map(
                  (platform, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <span className="text-sm font-medium">{platform}</span>
                    </div>
                  ),
                )}
              </div>
              <div className="pt-4">
                <Button className="bg-royalblue-700 hover:bg-royalblue-800">
                  View All Integrations <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How Our Fulfillment Works</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple, transparent process from inventory receipt to customer delivery
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Inventory Receipt",
                description: "Send your inventory to our fulfillment center in China for processing and storage.",
              },
              {
                step: "2",
                title: "Integration",
                description: "Connect your ecommerce store to our system for automated order processing.",
              },
              {
                step: "3",
                title: "Order Fulfillment",
                description: "We pick, pack, and ship orders directly to your customers as they come in.",
              },
              {
                step: "4",
                title: "Tracking & Support",
                description: "Monitor everything in real-time and access our customer support team when needed.",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-royalblue-700 text-xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Success Story: GadgetWorld</h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Learn how we helped GadgetWorld scale their ecommerce operations, reduce shipping costs by 20%, and
                improve delivery times by 35%.
              </p>
              <ul className="space-y-2">
                {[
                  "Increased order volume from 500 to 5,000 per month",
                  "Reduced shipping costs by 20%",
                  "Improved delivery times by 35%",
                  "99.8% order accuracy rate",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button className="bg-royalblue-700 hover:bg-royalblue-800">
                  Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                width={500}
                height={400}
                alt="GadgetWorld Case Study"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from ecommerce businesses who trust us with their fulfillment
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "ChinaTo.ca has transformed our ecommerce operations. Their efficient fulfillment process has allowed us to scale rapidly while maintaining customer satisfaction.",
                author: "Jennifer Lee",
                company: "TechAccessories.com",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                quote:
                  "The integration with our Shopify store was seamless, and the real-time inventory tracking has eliminated stockouts completely. Our customers love the fast shipping!",
                author: "Michael Zhang",
                company: "FashionTrends",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                quote:
                  "As we expanded into the Canadian market, ChinaTo.ca's expertise in customs and international shipping was invaluable. They've become an essential part of our business.",
                author: "Sarah Johnson",
                company: "HomeGoods Direct",
                image: "/placeholder.svg?height=60&width=60",
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <p className="mb-4 text-gray-600">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    width={60}
                    height={60}
                    alt={testimonial.author}
                    className="mr-4 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-royalblue-600">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Common questions about our ecommerce fulfillment services
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6">
            {[
              {
                question: "How quickly will my orders be processed?",
                answer:
                  "Orders received before 2 PM are processed the same day. Orders received after the cutoff time will be processed the next business day.",
              },
              {
                question: "How do you handle returns?",
                answer:
                  "We offer a comprehensive returns management service. Returns are received at our facility, inspected, and either restocked or disposed of according to your preferences. We provide detailed reporting on all returns.",
              },
              {
                question: "Can you handle custom packaging?",
                answer:
                  "Yes! We offer custom packaging solutions including branded boxes, custom inserts, gift wrapping, and personalized notes. Our team will work with you to create a memorable unboxing experience for your customers.",
              },
              {
                question: "How do I track my inventory levels?",
                answer:
                  "Our real-time inventory management system allows you to monitor stock levels 24/7 through our online dashboard. You'll also receive automated alerts when inventory reaches predetermined reorder points.",
              },
              {
                question: "What ecommerce platforms do you integrate with?",
                answer:
                  "We integrate with all major ecommerce platforms including Shopify, WooCommerce, Magento, Amazon, eBay, Etsy, BigCommerce, and Wix. Our API also allows for custom integrations with other platforms.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-bold">{faq.question}</h3>
                <p className="text-gray-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-royalblue-800 py-20 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Scale Your Ecommerce Business?
              </h2>
              <p className="max-w-[700px] text-royalblue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with ChinaTo.ca today and experience seamless ecommerce fulfillment
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-royalblue-800 hover:bg-gray-100">
                Get a Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-royalblue-700">
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
