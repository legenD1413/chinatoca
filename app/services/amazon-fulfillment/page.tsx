import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Store, Package, TruckIcon, ArrowRight, BarChart4, Tag } from "lucide-react"

export default function AmazonFulfillment() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Amazon Fulfillment"
            fill
            className="object-cover opacity-5"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-center text-gray-800">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Ready to scale your Amazon business?
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-600 md:text-lg">
              Selling on Amazon is a winning strategy for most ecommerce businesses today. While Fulfillment by Amazon
              (FBA) offers many benefits such as Amazon Prime two-day shipping, its strict and lengthy policies create a
              huge obstacle for many sellers.
            </p>
            <p className="mx-auto max-w-[800px] text-gray-600 md:text-lg">
              ChinaTo.ca provides all the support you need for FBA Prep, including barcode labeling, packaging and
              repackaging, poly-bagging, and more. Your store could even double its sales opportunities by offering
              Fulfillment by Merchant (FBM) with ChinaTo.ca
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button size="lg" className="bg-royalblue-700 text-white hover:bg-royalblue-800">
                Sign Up Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-royalblue-700 text-royalblue-700 hover:bg-royalblue-50"
              >
                Talk to Expert
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
              { number: "99.99%", label: "Shipping Coverage" },
              { number: "40%", label: "Reduction in Costs" },
              { number: "24/7", label: "Customer Service" },
              { number: "2-day", label: "Domestic Shipping" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">{stat.number}</span>
                <span className="mt-2 text-sm font-medium text-royalblue-700 md:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FBA Prep Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simplifying FBA Prep and fulfillment for fast-growing brands.
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our FBA Prep service includes storage, quality inspection, packaging, repackaging, and shipping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FBA Prep Services */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                AMAZON SELLER SOLUTIONS
                <span className="ml-2 rounded-full bg-royalblue-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  FBA
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Comprehensive FBA Prep Services</h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                We handle all the complex requirements of Amazon FBA preparation, ensuring your products meet Amazon's
                strict standards and are ready for Prime shipping.
              </p>
              <ul className="space-y-2">
                {[
                  "Product inspection and quality control",
                  "FNSKU labeling and barcode application",
                  "Poly-bagging, bubble wrapping, and bundling",
                  "Box preparation and package inserts",
                  "Shipping directly to Amazon fulfillment centers",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Button className="bg-royalblue-700 hover:bg-royalblue-800">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="FBA Prep Services"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FBA vs FBM Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">FBA vs. FBM: The Best of Both Worlds</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Maximize your Amazon sales potential by leveraging both fulfillment methods
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-royalblue-100 p-3">
                  <Store className="h-6 w-6 text-royalblue-700" />
                </div>
                <h3 className="text-2xl font-bold">Fulfillment by Amazon (FBA)</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Products stored in Amazon's fulfillment centers",
                  "Prime badge increases visibility and sales",
                  "Amazon handles shipping and customer service",
                  "Higher fees but potentially higher sales volume",
                  "Strict preparation requirements",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-royalblue-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="font-medium">How we help:</p>
                <p className="mt-2 text-gray-500">
                  We prepare your products according to Amazon's requirements and ship them directly to FBA fulfillment
                  centers, saving you time and ensuring compliance.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-burgundy-100 p-3">
                  <TruckIcon className="h-6 w-6 text-burgundy-700" />
                </div>
                <h3 className="text-2xl font-bold">Fulfillment by Merchant (FBM)</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "You control the fulfillment process",
                  "Lower fees and higher profit margins",
                  "No storage fees or long-term storage penalties",
                  "More control over packaging and branding",
                  "Backup option during FBA restrictions or peak seasons",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="font-medium">How we help:</p>
                <p className="mt-2 text-gray-500">
                  We store your inventory and fulfill orders directly to your customers when they purchase through
                  Amazon, meeting delivery time requirements while reducing your costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Amazon Fulfillment Process */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Amazon Fulfillment Process</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Simple, efficient process to get your products to Amazon and your customers
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Receive",
                description: "We receive your inventory at our fulfillment center in China and inspect for quality.",
                icon: Package,
              },
              {
                step: "2",
                title: "Prepare",
                description:
                  "We prepare your products according to Amazon's requirements, including labeling and packaging.",
                icon: Tag,
              },
              {
                step: "3",
                title: "Ship",
                description: "We ship your products directly to Amazon fulfillment centers or to your customers.",
                icon: TruckIcon,
              },
              {
                step: "4",
                title: "Track",
                description: "Monitor everything in real-time through our advanced dashboard.",
                icon: BarChart4,
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-gray-100 p-3 text-burgundy-700">
                  <step.icon className="h-6 w-6" />
                </div>
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

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="Amazon Seller Benefits"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Benefits for Amazon Sellers</h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Partner with ChinaTo.ca for your Amazon fulfillment needs and experience these advantages:
              </p>
              <ul className="space-y-2">
                {[
                  "Reduce FBA fees by optimizing packaging dimensions and weight",
                  "Avoid long-term storage fees with our flexible inventory management",
                  "Maintain Prime eligibility with our FBA prep services",
                  "Expand to FBM during peak seasons or inventory restrictions",
                  "Improve seller ratings with fast, reliable shipping",
                  "Reduce shipping costs from China to Amazon fulfillment centers",
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
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Success Story: TechGear</h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Learn how we helped TechGear increase their Amazon sales by 150% while reducing fulfillment costs by
                35%.
              </p>
              <ul className="space-y-2">
                {[
                  "Expanded from FBA-only to hybrid FBA/FBM strategy",
                  "Maintained inventory during Amazon's COVID restrictions",
                  "Reduced dimensional weight charges through optimized packaging",
                  "Improved seller rating from 92% to 98%",
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
                alt="TechGear Case Study"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Common questions about our Amazon fulfillment services
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6">
            {[
              {
                question: "How do you ensure compliance with Amazon's FBA requirements?",
                answer:
                  "Our team stays up-to-date with Amazon's constantly changing requirements. We have a comprehensive checklist for each product category and regularly audit our processes to ensure compliance with all FBA guidelines.",
              },
              {
                question: "Can you handle both FBA and FBM fulfillment for the same products?",
                answer:
                  "Yes! We recommend a hybrid approach for most sellers. We can prepare and ship some of your inventory to Amazon FBA while keeping the rest in our fulfillment center for FBM orders, giving you the best of both worlds.",
              },
              {
                question: "How quickly can you ship products to Amazon fulfillment centers?",
                answer:
                  "Once your products arrive at our facility, we typically complete FBA prep within 1-3 business days. Shipping time to Amazon fulfillment centers depends on the destination but usually takes 3-7 days.",
              },
              {
                question: "Do you handle Amazon returns?",
                answer:
                  "Yes, we can receive and process Amazon returns for your FBM orders. For FBA returns, we can arrange to have returned inventory sent back to our facility for inspection, refurbishment, and reshipment to Amazon.",
              },
              {
                question: "Can you help with Amazon listing optimization?",
                answer:
                  "While our core expertise is in fulfillment, we have partnerships with Amazon marketing specialists who can help optimize your listings for better visibility and conversion rates.",
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
                Ready to Optimize Your Amazon Business?
              </h2>
              <p className="max-w-[700px] text-royalblue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with ChinaTo.ca today and experience seamless Amazon fulfillment
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-royalblue-800 hover:bg-gray-100">
                Sign Up Free
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
