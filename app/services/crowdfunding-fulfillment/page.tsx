import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, TruckIcon, ClipboardCheck, Users, ArrowRight } from "lucide-react"

export default function CrowdfundingFulfillment() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - White background */}
      <section className="relative bg-white py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Crowdfunding Fulfillment"
            fill
            className="object-cover opacity-5"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6 text-gray-800">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Crowdfunding Fulfillment</h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Turn your brilliant idea into reality with crowdfunding fulfillment! Let us handle the complexities of
                fulfillment and shipping, offering you the best rates to ensure your backers are satisfied from the
                initial pledge to final delivery.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-royalblue-600"></div>
                  <span className="text-lg font-medium">Kickstarter fulfillment</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-royalblue-600"></div>
                  <span className="text-lg font-medium">Indiegogo fulfillment</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-royalblue-600"></div>
                  <span className="text-lg font-medium">And many more</span>
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
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white">
                {/* Courier Logos */}
                <div className="grid h-full w-full place-items-center rounded-lg bg-white p-6">
                  <div className="flex flex-wrap justify-center gap-12">
                    <div className="flex h-32 w-44 items-center justify-center rounded-lg bg-white p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <Image
                        src="/sf-express-logo.png"
                        width={120}
                        height={60}
                        alt="SF Express"
                        className="h-auto max-h-20 w-auto max-w-[120px] object-contain"
                      />
                    </div>
                    <div className="flex h-32 w-44 items-center justify-center rounded-lg bg-white p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <Image
                        src="/ups-logo.jpg"
                        width={120}
                        height={60}
                        alt="UPS"
                        className="h-auto max-h-20 w-auto max-w-[120px] object-contain"
                      />
                    </div>
                    <div className="flex h-32 w-44 items-center justify-center rounded-lg bg-white p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <Image
                        src="/fedex-logo.webp"
                        width={120}
                        height={60}
                        alt="FedEx"
                        className="h-auto max-h-20 w-auto max-w-[120px] object-contain"
                      />
                    </div>
                    <div className="flex h-32 w-44 items-center justify-center rounded-lg bg-white p-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <Image
                        src="/dhl-express.png"
                        width={120}
                        height={60}
                        alt="DHL Express"
                        className="h-auto max-h-20 w-auto max-w-[120px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-800 shadow-sm">
                  <div className="text-3xl font-bold">$567,691</div>
                  <div className="text-sm text-gray-600">Published (avg goal: $5,000)</div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-800 shadow-sm">
                  <div className="text-3xl font-bold">1,562</div>
                  <div className="text-sm text-gray-600">Supporters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Matching homepage white section */}
      <section className="bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "50+", label: "Campaigns Fulfilled" },
              { number: "3", label: "Fulfillment Centers" },
              { number: "15%", label: "Reduction on Cost" },
              { number: "200+", label: "Satisfied Creators" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">{stat.number}</span>
                <span className="mt-2 text-sm font-medium text-royalblue-700 md:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section - Matching homepage gray section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                SPECIALIZED SERVICE
                <span className="ml-2 rounded-full bg-royalblue-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  NEW
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Introduction to Crowdfunding Fulfillment
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Crowdfunding fulfillment is the process of getting rewards to backers who supported a project on a
                platform like Kickstarter or Indiegogo.
              </p>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                For creators, it's the most challenging phase after a successful campaign. It involves inventory
                management, packaging, shipping, and customer service - all while meeting backer expectations and
                deadlines.
              </p>
              <ul className="space-y-2">
                {[
                  "End-to-end fulfillment from manufacturer to backer",
                  "Custom packaging and inserts for premium unboxing experience",
                  "Real-time tracking and backer updates",
                  "International shipping with customs clearance",
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
                alt="Crowdfunding Fulfillment Process"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Matching homepage white section */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose ChinaTo.ca</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Specialized solutions for crowdfunding creators shipping from China to Canada
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Direct Manufacturer Connection",
                description:
                  "We're based in China with direct access to manufacturers, eliminating middlemen and reducing costs.",
                icon: Package,
              },
              {
                title: "Backer-Ready Packaging",
                description:
                  "Custom packaging solutions designed specifically for crowdfunding backers, including special inserts and thank-you notes.",
                icon: Package,
              },
              {
                title: "Quality Control",
                description:
                  "Comprehensive quality inspection before shipping to ensure backers receive products that match campaign promises.",
                icon: ClipboardCheck,
              },
              {
                title: "Global Distribution",
                description:
                  "Efficient shipping from Chinese manufacturers to backers across Canada and beyond, with customs clearance handled for you.",
                icon: TruckIcon,
              },
              {
                title: "Backer Management",
                description:
                  "We help manage backer information, address verification, and shipping notifications to keep your backers informed.",
                icon: Users,
              },
              {
                title: "Campaign Timeline Support",
                description:
                  "We align our fulfillment schedule with your campaign timeline to ensure timely delivery to backers.",
                icon: ClipboardCheck,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 rounded-full bg-gray-100 p-3 text-burgundy-700 w-fit">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="mb-4 flex-1 text-gray-500">{feature.description}</p>
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

      {/* Process Section - Matching homepage gray section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Fulfillment Process</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple, transparent process from campaign success to backer delivery
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-5">
            {[
              {
                step: "1",
                title: "Campaign Planning",
                description:
                  "We work with you during your campaign planning phase to develop realistic shipping timelines.",
              },
              {
                step: "2",
                title: "Manufacturing",
                description:
                  "Our team in China works directly with your manufacturer to coordinate production schedules.",
              },
              {
                step: "3",
                title: "Preparation",
                description: "We prepare your products for individual backer shipments, including custom packaging.",
              },
              {
                step: "4",
                title: "Shipping",
                description: "Your products are shipped from China to Canada with all customs documentation handled.",
              },
              {
                step: "5",
                title: "Distribution",
                description: "We distribute individual packages to your backers with tracking information provided.",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center px-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-royalblue-700 text-xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study - Matching homepage white section */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=500"
                width={500}
                height={400}
                alt="TechGadget Case Study"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Success Story: TechGadget Campaign</h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Learn how we helped TechGadget deliver their innovative product to 5,000+ backers across Canada on time
                and under budget.
              </p>
              <ul className="space-y-2">
                {[
                  "5,000+ backers fulfilled",
                  "98% on-time delivery rate",
                  "15% shipping cost savings",
                  "Custom packaging solution",
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
          </div>
        </div>
      </section>

      {/* Testimonials - Matching homepage gray section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Campaign Creators Say</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from crowdfunding creators who've trusted us with their fulfillment
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "ChinaTo.ca was instrumental in helping us deliver our product to backers on time. Their expertise in handling crowdfunding campaigns was evident at every step.",
                author: "Sarah Johnson",
                company: "TechGadgets Inc.",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                quote:
                  "The custom packaging solution they created for our campaign enhanced the unboxing experience for our backers and resulted in amazing social media shares.",
                author: "Michael Chen",
                company: "InnoDesign",
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                quote:
                  "Their ability to coordinate with our manufacturer in China saved us countless headaches and ensured our product quality met our backers' expectations.",
                author: "Emily Wong",
                company: "EcoProducts",
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

      {/* FAQ Section - Matching homepage gray section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Common questions about our crowdfunding fulfillment services
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6">
            {[
              {
                question: "When should I start planning for fulfillment?",
                answer:
                  "Ideally, you should start planning for fulfillment before your campaign launches. This allows you to accurately estimate shipping costs and delivery timelines for your backers.",
              },
              {
                question: "How do you handle international backers?",
                answer:
                  "We have established shipping routes to over 200 countries and can handle customs documentation for international shipments. We'll work with you to develop a shipping strategy that balances cost and delivery speed for your international backers.",
              },
              {
                question: "Can you handle custom packaging and inserts?",
                answer:
                  "Yes! We specialize in creating custom packaging solutions for crowdfunding campaigns, including branded boxes, thank-you notes, instruction manuals, and other inserts that enhance the unboxing experience.",
              },
              {
                question: "How do you handle returns or damaged items?",
                answer:
                  "We have a comprehensive returns process in place. If backers receive damaged items, we can coordinate replacements directly from our warehouse in China, minimizing delays and additional shipping costs.",
              },
              {
                question: "What information do you need from me to get started?",
                answer:
                  "To provide an accurate quote, we'll need details about your product (dimensions, weight), estimated quantity, backer locations, and your desired delivery timeline. Once you're ready to proceed, we'll need your backer list with shipping addresses.",
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

      {/* CTA Section - Matching homepage blue CTA */}
      <section className="bg-royalblue-800 py-20 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Fulfill Your Campaign?
              </h2>
              <p className="max-w-[700px] text-royalblue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with ChinaTo.ca today and experience seamless crowdfunding fulfillment
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

// Import Link component
import Link from "next/link"
