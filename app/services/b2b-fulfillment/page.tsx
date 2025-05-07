import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Building2, Package, TruckIcon, ArrowRight, Warehouse, ClipboardList } from "lucide-react"

export default function B2BFulfillment() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="B2B Fulfillment"
            fill
            className="object-cover opacity-5"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-6 text-center text-gray-800">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Ship large, batch orders to your retailers or wholesalers
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-600 md:text-lg">
              B2B fulfillment is the backbone of wholesale distribution. As your business grows, managing large orders,
              maintaining inventory accuracy, and ensuring timely deliveries becomes increasingly complex.
            </p>
            <p className="mx-auto max-w-[800px] text-gray-600 md:text-lg">
              ChinaTo.ca provides specialized B2B fulfillment services designed for businesses shipping large volumes
              from China to Canadian retailers, distributors, and wholesalers. Our streamlined process ensures your
              products reach your business customers efficiently and cost-effectively.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button size="lg" className="bg-royalblue-700 text-white hover:bg-royalblue-800">
                Get a Quote
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
              { number: "99.8%", label: "Order Accuracy" },
              { number: "45%", label: "Cost Reduction" },
              { number: "3-5 days", label: "Processing Time" },
              { number: "100+", label: "B2B Clients" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">{stat.number}</span>
                <span className="mt-2 text-sm font-medium text-royalblue-700 md:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Fulfillment Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Streamlined B2B Fulfillment for Growing Businesses
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our B2B fulfillment service includes bulk storage, inventory management, order processing, and
                distribution to your business customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B2B Services */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                WHOLESALE SOLUTIONS
                <span className="ml-2 rounded-full bg-royalblue-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  B2B
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Comprehensive B2B Fulfillment Services
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                We handle the complexities of B2B order fulfillment, allowing you to focus on growing your business and
                building relationships with your retail and wholesale partners.
              </p>
              <ul className="space-y-2">
                {[
                  "Bulk storage and inventory management",
                  "Pallet and container handling",
                  "Custom packaging and labeling for retailers",
                  "EDI compliance and integration",
                  "Retailer-specific routing guides and compliance",
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
                alt="B2B Fulfillment Services"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* B2B vs DTC Section */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                B2B vs. DTC: Understanding the Difference
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Different fulfillment approaches for different business models
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-royalblue-100 p-3">
                  <Building2 className="h-6 w-6 text-royalblue-700" />
                </div>
                <h3 className="text-2xl font-bold">B2B Fulfillment</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Large, bulk orders to fewer destinations",
                  "Palletized shipments and LTL/FTL freight",
                  "Specialized packaging for retail display",
                  "Retailer compliance requirements",
                  "Longer lead times but larger order values",
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
                  We manage your bulk inventory, prepare orders according to retailer specifications, and coordinate
                  freight shipments to distribution centers or store locations.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-burgundy-100 p-3">
                  <Package className="h-6 w-6 text-burgundy-700" />
                </div>
                <h3 className="text-2xl font-bold">DTC Fulfillment</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Small, individual orders to many destinations",
                  "Parcel shipping and last-mile delivery",
                  "Consumer-focused packaging and unboxing experience",
                  "Direct customer communication",
                  "Faster shipping expectations",
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
                  We also offer DTC fulfillment services, allowing you to serve both business customers and end
                  consumers from a single inventory source.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our B2B Fulfillment Process */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our B2B Fulfillment Process</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Efficient, reliable process to get your products to retailers and wholesalers
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Inventory Receipt",
                description: "We receive and store your inventory in our warehouse facilities in China.",
                icon: Warehouse,
              },
              {
                step: "2",
                title: "Order Processing",
                description:
                  "When you receive orders from retailers, we prepare them according to specific requirements.",
                icon: ClipboardList,
              },
              {
                step: "3",
                title: "Compliance Check",
                description: "We ensure all orders meet retailer routing guides and compliance standards.",
                icon: CheckCircle2,
              },
              {
                step: "4",
                title: "Distribution",
                description: "We ship your products to distribution centers, warehouses, or store locations.",
                icon: TruckIcon,
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
                alt="B2B Fulfillment Benefits"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Benefits of B2B Fulfillment with ChinaTo.ca</h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Partner with ChinaTo.ca for your B2B fulfillment needs and experience these advantages:
              </p>
              <ul className="space-y-2">
                {[
                  "Reduce shipping costs with consolidated freight from China to Canada",
                  "Meet retailer compliance requirements and avoid chargebacks",
                  "Scale your wholesale business without infrastructure investment",
                  "Maintain inventory accuracy with our advanced management system",
                  "Improve cash flow with faster order processing and delivery",
                  "Expand your retail distribution network with reliable fulfillment",
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

      {/* Retailer Compliance */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Retailer Compliance Expertise</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We understand the unique requirements of major Canadian retailers
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                retailer: "Walmart Canada",
                requirements: [
                  "Specific pallet configurations",
                  "Advanced shipping notifications (ASN)",
                  "GS1-128 labels on all cartons",
                  "Strict delivery appointments",
                ],
              },
              {
                retailer: "Canadian Tire",
                requirements: [
                  "Vendor compliance program",
                  "EDI integration requirements",
                  "Specific packaging guidelines",
                  "Detailed documentation standards",
                ],
              },
              {
                retailer: "Loblaws",
                requirements: [
                  "Vendor routing guide compliance",
                  "Product labeling specifications",
                  "Quality control standards",
                  "Delivery scheduling requirements",
                ],
              },
              {
                retailer: "Home Depot Canada",
                requirements: [
                  "Specific carton marking requirements",
                  "Pallet specifications and standards",
                  "Appointment scheduling process",
                  "Compliance documentation",
                ],
              },
              {
                retailer: "Hudson's Bay",
                requirements: [
                  "Detailed ticketing guidelines",
                  "Packaging and presentation standards",
                  "Floor-ready merchandise requirements",
                  "Delivery window compliance",
                ],
              },
              {
                retailer: "Costco Canada",
                requirements: [
                  "Strict packaging requirements",
                  "Pallet height and weight restrictions",
                  "Specific labeling protocols",
                  "Quality assurance standards",
                ],
              },
            ].map((retailer, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <h3 className="mb-4 text-xl font-bold">{retailer.retailer}</h3>
                <ul className="space-y-2">
                  {retailer.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-burgundy-700" />
                      <span className="text-sm text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
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
              <h2 className="text-3xl font-bold tracking-tighter">Success Story: HomeGoods Direct</h2>
              <p className="max-w-[600px] text-gray-500 md:text-lg">
                Learn how we helped HomeGoods Direct expand their retail distribution from 10 to 150 stores across
                Canada while reducing logistics costs by 45%.
              </p>
              <ul className="space-y-2">
                {[
                  "Scaled from 10 to 150 retail locations in 18 months",
                  "Reduced chargebacks by 95% through compliance management",
                  "Cut logistics costs by 45% with optimized shipping",
                  "Improved inventory turnover by 35%",
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
                alt="HomeGoods Direct Case Study"
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
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
                Common questions about our B2B fulfillment services
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6">
            {[
              {
                question: "How do you handle retailer-specific requirements?",
                answer:
                  "We maintain comprehensive databases of retailer requirements and routing guides. Our team is trained on the specific compliance standards for major Canadian retailers, and we regularly update our processes to reflect any changes in their requirements.",
              },
              {
                question: "Can you handle both B2B and DTC fulfillment from the same inventory?",
                answer:
                  "Yes! We offer integrated B2B and DTC fulfillment services, allowing you to serve both business customers and end consumers from a single inventory source. This provides flexibility and efficiency in your distribution strategy.",
              },
              {
                question: "How do you manage seasonal inventory fluctuations?",
                answer:
                  "Our flexible warehousing solutions can scale with your business needs. We offer short-term storage options for seasonal peaks and can adjust your storage allocation as needed. We also provide inventory forecasting tools to help you plan for seasonal demands.",
              },
              {
                question: "Do you offer EDI integration for B2B orders?",
                answer:
                  "Yes, we support EDI (Electronic Data Interchange) integration with major retailers and wholesalers. This allows for automated order processing, shipping notifications, and invoicing, streamlining your B2B operations.",
              },
              {
                question: "How do you handle returns for B2B orders?",
                answer:
                  "We offer comprehensive B2B returns management, including receiving, inspection, and processing of returned merchandise. We can coordinate with retailers for scheduled returns and provide detailed reporting on return reasons and product condition.",
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
                Ready to Scale Your Wholesale Business?
              </h2>
              <p className="max-w-[700px] text-royalblue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with ChinaTo.ca today and experience seamless B2B fulfillment
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
