import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Play,
  CheckCircle2,
  ArrowRight,
  Rocket,
  Ship,
  Package,
  HelpCircle,
  MessageSquareQuote,
  UserPlus,
  Warehouse,
  Store,
  TruckIcon,
  LineChart,
} from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gray-800 py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Logistics Warehouse"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6 text-white">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">How ChinaTo.ca Works</h1>
              <p className="text-lg text-gray-300 md:text-xl">
                Our goal is to make China-Canada logistics a stress-free process for you. Talk to our helpful shipping
                advisors today to find out how you can optimize for time and cost, and start shipping within a week.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Button size="lg" className="bg-royalblue-700 text-white hover:bg-royalblue-800">
                  Sign Up Free
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-gray-700">
                  Talk to Expert
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative h-[300px] w-full overflow-hidden rounded-lg md:h-[350px]">
                <Image
                  src="/placeholder.svg?height=350&width=600"
                  fill
                  alt="Logistics Process Illustration"
                  className="object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-white/30">
                    <Play className="h-8 w-8 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Easy Shipping Section */}
      <section className="bg-white py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100">
              <Rocket className="h-8 w-8 text-royalblue-700" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Easy Shipping Starts from Today
            </h2>
            <p className="max-w-[900px] text-gray-500 text-lg md:text-xl">
              Our streamlined process makes shipping from China to Canada simple, efficient, and hassle-free
            </p>
          </div>

          {/* Step 1 */}
          <div className="mt-20 grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100 mb-4">
                <UserPlus className="h-8 w-8 text-royalblue-700" />
              </div>
              <div className="text-8xl font-bold text-gray-100">01</div>
              <h3 className="mt-[-30px] text-3xl font-bold">Set Up Your Account</h3>
              <div className="mt-6 space-y-4">
                <p className="text-gray-600">
                  Create your free ChinaTo.ca account in minutes. Our simple onboarding process helps us understand your
                  specific shipping needs from China to Canada.
                </p>
                <ul className="space-y-2">
                  {[
                    "No setup fees or monthly minimums",
                    "Secure dashboard access",
                    "Dedicated account manager",
                    "Custom shipping preferences",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button className="bg-royalblue-700 hover:bg-royalblue-800">Create Account</Button>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  width={500}
                  height={300}
                  alt="Account Dashboard"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mt-24 grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  width={500}
                  height={300}
                  alt="Inventory Management"
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100 mb-4">
                <Warehouse className="h-8 w-8 text-royalblue-700" />
              </div>
              <div className="text-8xl font-bold text-gray-100">02</div>
              <h3 className="mt-[-30px] text-3xl font-bold">Send Your Inventory</h3>
              <div className="mt-6 space-y-4">
                <p className="text-gray-600">
                  Ship your products to our fulfillment center in China. We'll receive, inspect, and store your
                  inventory, making it ready for shipment to Canada.
                </p>
                <ul className="space-y-2">
                  {[
                    "Multiple receiving locations in China",
                    "Quality inspection available",
                    "Secure warehouse storage",
                    "Real-time inventory tracking",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button className="bg-royalblue-700 hover:bg-royalblue-800">Get Warehouse Address</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mt-24 grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100 mb-4">
                <Store className="h-8 w-8 text-royalblue-700" />
              </div>
              <div className="text-8xl font-bold text-gray-100">03</div>
              <h3 className="mt-[-30px] text-3xl font-bold">Connect Your Store</h3>
              <div className="mt-6 space-y-4">
                <p className="text-gray-600">
                  Integrate your online store with our system for automated order processing. We support all major
                  ecommerce platforms for seamless order fulfillment.
                </p>
                <ul className="space-y-2">
                  {[
                    "One-click integration with major platforms",
                    "Manual order submission available",
                    "Bulk order processing",
                    "Real-time synchronization",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button className="bg-royalblue-700 hover:bg-royalblue-800">View Integrations</Button>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="grid grid-cols-3 gap-4">
                {["Shopify", "WooCommerce", "Amazon", "eBay", "Magento", "Etsy"].map((platform, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <span className="text-sm font-medium">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mt-24 grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  width={500}
                  height={300}
                  alt="Shipping Process"
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100 mb-4">
                <TruckIcon className="h-8 w-8 text-royalblue-700" />
              </div>
              <div className="text-8xl font-bold text-gray-100">04</div>
              <h3 className="mt-[-30px] text-3xl font-bold">We Ship Your Orders</h3>
              <div className="mt-6 space-y-4">
                <p className="text-gray-600">
                  When orders come in, we pick, pack, and ship your products directly to you or your customers in Canada or to
                  Amazon FBA warehouses, handling all customs and documentation.
                </p>
                <ul className="space-y-2">
                  {[
                    "Professional packaging",
                    "Customs clearance handling",
                    "Multiple shipping methods",
                    "Tracking information provided",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button className="bg-royalblue-700 hover:bg-royalblue-800">View Shipping Options</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="mt-24 grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100 mb-4">
                <LineChart className="h-8 w-8 text-royalblue-700" />
              </div>
              <div className="text-8xl font-bold text-gray-100">05</div>
              <h3 className="mt-[-30px] text-3xl font-bold">Track & Manage</h3>
              <div className="mt-6 space-y-4">
                <p className="text-gray-600">
                  Monitor your inventory, orders, and shipments in real-time through our intuitive dashboard. Access
                  detailed analytics to optimize your supply chain.
                </p>
                <ul className="space-y-2">
                  {[
                    "Real-time tracking updates",
                    "Inventory level alerts",
                    "Performance analytics",
                    "Mobile app access",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button className="bg-royalblue-700 hover:bg-royalblue-800">Demo Dashboard</Button>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-lg">
                <Image
                  src="/placeholder.svg?height=300&width=500"
                  width={500}
                  height={300}
                  alt="Analytics Dashboard"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Methods Section */}
      <section className="bg-gray-50 py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100">
              <Ship className="h-8 w-8 text-royalblue-700" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Shipping Methods</h2>
            <p className="max-w-[800px] text-gray-500 text-lg md:text-xl">
              Choose the shipping method that best fits your timeline and budget
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                title: "Express Air",
                time: "5-7 days",
                price: "",
                features: [
                  "Door-to-door service",
                  "Real-time tracking",
                  "Priority customs clearance",
                  "Best for time-sensitive shipments",
                ],
                recommended: false,
              },
              {
                title: "Standard Air",
                time: "8-12 days",
                price: "",
                features: [
                  "Door-to-door service",
                  "Regular tracking updates",
                  "Customs clearance included",
                  "Best for balanced cost & speed",
                ],
                recommended: false,
              },
              {
                title: "Sea Freight",
                time: "30-40 days",
                price: "",
                features: [
                  "Port-to-door service",
                  "Weekly tracking updates",
                  "Customs clearance included",
                  "Best for large, non-urgent shipments",
                ],
                recommended: true,
              },
            ].map((method, index) => (
              <div
                key={index}
                className={`relative flex flex-col rounded-lg border bg-white p-6 shadow-sm ${
                  method.recommended ? "border-royalblue-700 ring-1 ring-royalblue-700" : "border-gray-200"
                }`}
              >
                {method.recommended && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-royalblue-700 px-3 py-1 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">{method.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                    {method.time}
                  </span>
                </div>
                {method.price && <div className="mt-4 text-2xl font-bold text-gray-800">{method.price}</div>}
                <ul className="mt-6 mb-6 space-y-2 text-sm">
                  {method.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-burgundy-700" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button
                    className={`w-full ${
                      method.recommended ? "bg-royalblue-700 hover:bg-royalblue-800" : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    Get a Quote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value-Added Services */}
      <section className="bg-white py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100">
              <Package className="h-8 w-8 text-royalblue-700" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Value-Added Services</h2>
            <p className="max-w-[800px] text-gray-500 text-lg md:text-xl">
              Enhance your logistics experience with our premium services
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Quality Inspection",
                description:
                  "Our team inspects your products before shipping to ensure they meet your quality standards.",
                price: "",
              },
              {
                title: "Custom Packaging",
                description: "Custom branded packaging solutions to enhance your customer's unboxing experience.",
                price: "",
              },
              {
                title: "Amazon FBA Prep",
                description: "We prepare your products according to Amazon's strict requirements for FBA acceptance.",
                price: "",
              },
              {
                title: "Kitting & Assembly",
                description: "Combine multiple products into ready-to-ship kits or gift sets.",
                price: "",
              },
              {
                title: "Product Photography",
                description: "Professional product photography for your ecommerce listings.",
                price: "",
              },
              {
                title: "Returns Processing",
                description: "Handling of customer returns and reverse logistics.",
                price: "",
              },
            ].map((service, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-gray-500">{service.description}</p>
                {service.price && <div className="mt-4 text-lg font-bold text-royalblue-700">{service.price}</div>}
                <Button className="mt-4 w-full bg-royalblue-700 hover:bg-royalblue-800">Learn More</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100">
              <HelpCircle className="h-8 w-8 text-royalblue-700" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[800px] text-gray-500 text-lg md:text-xl">
              Common questions about our logistics process
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6">
            {[
              {
                question: "How long does shipping from China to Canada typically take?",
                answer:
                  "Shipping times vary based on the method chosen. Express air typically takes 5-7 business days, standard air takes 8-12 days, while sea freight can take 30-40 days. We offer expedited options for time-sensitive shipments.', business days, standard air takes 8-12 days, while sea freight can take 30-40 days. We offer expedited options for time-sensitive shipments.",
              },
              {
                question: "Do you handle customs clearance?",
                answer:
                  "Yes, we provide complete customs clearance services for both Chinese and Canadian customs. Our team prepares all necessary documentation and manages the entire process to ensure smooth transit.",
              },
              {
                question: "Can you ship directly to Amazon FBA warehouses?",
                answer:
                  "Absolutely. We specialize in Amazon FBA preparation and can ship directly to any Amazon fulfillment center in Canada, ensuring your products meet all Amazon's requirements.",
              },
              {
                question: "What if my goods are damaged during transit?",
                answer:
                  "All shipments include basic insurance coverage. We also offer additional insurance options for high-value shipments to ensure complete peace of mind.",
              },
              {
                question: "How do I track my shipments?",
                answer:
                  "You can track all your shipments in real-time through our online dashboard. We also provide regular email updates and notifications at key milestones during the shipping process.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="mt-2 text-gray-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-royalblue-800 py-24 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[800px] text-royalblue-100 text-lg md:text-xl">
                Experience our streamlined logistics process for yourself
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-royalblue-800 hover:bg-gray-100">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-royalblue-100">
              <MessageSquareQuote className="h-8 w-8 text-royalblue-700" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">What Our Clients Say</h2>
            <p className="max-w-[800px] text-gray-500 text-lg md:text-xl">
              Hear from businesses who trust us with their China to Canada logistics
            </p>
          </div>
          <div className="mx-auto mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "ChinaTo.ca transformed our supply chain. Their attention to detail and reliability have made our business more efficient and our customers happier.",
                author: "Sarah Johnson",
                company: "TechGadgets Inc.",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                quote:
                  "As an Amazon seller, their FBA prep services have saved us countless hours and headaches. The cost savings are significant too!",
                author: "Michael Chen",
                company: "Global Imports",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                quote:
                  "Their B2B fulfillment services have helped us scale our business and enter the Canadian market with confidence. Highly recommended!",
                author: "David Williams",
                company: "Maple Enterprises",
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
          <div className="mt-12 flex justify-center">
            <Link href="/about">
              <Button variant="outline" className="gap-2">
                Read More Success Stories <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
