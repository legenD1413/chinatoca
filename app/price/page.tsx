import { Button } from "@/components/ui/button"
import { Settings, Package, Warehouse, ClipboardList, TruckIcon, Clock } from "lucide-react"
import Image from "next/image"

export default function PricePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Image Background */}
      <section className="relative py-20 text-white">
        <div className="absolute inset-0 z-0">
          <Image src="/pricing-hero-bg.png" alt="Pricing Background" fill className="object-cover" priority />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Save More on Fulfillment with ChinaTo.ca
            </h1>
            <p className="mx-auto max-w-[800px] text-xl text-white/90">
              No hidden fees or order minimums. Our pricing structure is clear and easy to understand, so you know
              exactly what you are paying for.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg">
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-6 text-xl font-bold">
              <div>Service</div>
              <div>Cost</div>
            </div>

            {/* Setup */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Settings className="h-6 w-6 text-royalblue-600" />
                </div>
                <span className="font-medium">Setup</span>
              </div>
              <div className="flex items-center font-medium">Free</div>
            </div>

            {/* Receiving */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Package className="h-6 w-6 text-royalblue-600" />
                </div>
                <span className="font-medium">Receiving</span>
              </div>
              <div className="flex items-center font-medium">Free</div>
            </div>

            {/* Storage */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Warehouse className="h-6 w-6 text-royalblue-600" />
                </div>
                <span className="font-medium">Storage</span>
              </div>
              <div className="flex items-center font-medium">Two months of free storage</div>
            </div>

            {/* Handling */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <ClipboardList className="h-6 w-6 text-royalblue-600" />
                </div>
                <span className="font-medium">Handling</span>
              </div>
              <div className="flex items-center font-medium">
                <span>
                  <span className="font-bold">$0.5</span> first pick, <span className="font-bold">$0.1</span> additional
                  pick per order * Including pick and pack, standard packing material.
                </span>
              </div>
            </div>

            {/* Shipping */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <TruckIcon className="h-6 w-6 text-royalblue-600" />
                </div>
                <span className="font-medium">Shipping</span>
              </div>
              <div className="flex items-center font-medium">
                <span>
                  Varies based on destination, weight, dimensions, shipping service, and more You can get shipping
                  recommendations from our fulfillment advisors.
                </span>
              </div>
            </div>

            {/* Returns */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Clock className="h-6 w-6 text-royalblue-600" />
                </div>
                <span className="font-medium">Returns Processing</span>
              </div>
              <div className="flex items-center font-medium">
                <span>
                  <span className="font-bold">$3.50</span> per return + shipping cost
                </span>
              </div>
            </div>

            {/* Software & API Integrations */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-royalblue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <span className="font-medium">Software & API Integrations</span>
              </div>
              <div className="flex items-center font-medium">
                <span>Free + unlimited integrations</span>
              </div>
            </div>

            {/* Minimum Order Quantity */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-royalblue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span className="font-medium">Minimum Order Quantity</span>
              </div>
              <div className="flex items-center font-medium">
                <span>No required</span>
              </div>
            </div>

            {/* Packing Materials */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-royalblue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <span className="font-medium">Packing Materials</span>
              </div>
              <div className="flex items-center font-medium">
                <span>Standard packing materials included. Premium packaging available at additional cost.</span>
              </div>
            </div>

            {/* Additional Customized Services */}
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-royalblue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </div>
                <span className="font-medium">Additional Customized Services</span>
              </div>
              <div className="flex items-center font-medium">
                <span>
                  Charge according to your needs.{" "}
                  <a href="/services/additional-services" className="text-royalblue-600 hover:underline">
                    Learn more &gt;&gt;
                  </a>
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6 text-sm text-gray-500">
              * Fulfillment centers outside mainland China may have different pricing structures. Please{" "}
              <a href="#" className="text-royalblue-600 hover:underline">
                Talk to Expert
              </a>{" "}
              for a custom quote.
            </div>
          </div>
        </div>
      </section>

      {/* Volume Discounts */}
      <section className="bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Volume Discounts</h2>
              <p className="max-w-[700px] text-gray-500 md:text-lg">
                The more you ship, the more you save. Our volume-based pricing ensures you get the best rates as your
                business grows.
              </p>
            </div>

            <div className="mt-12 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-gray-50 p-4 font-medium">
                <div>Monthly Orders</div>
                <div>Handling Discount</div>
                <div>Storage Discount</div>
                <div>Shipping Discount</div>
              </div>

              {[
                { orders: "1-100", handling: "0%", storage: "0%", shipping: "0%" },
                { orders: "101-500", handling: "5%", storage: "10%", shipping: "3%" },
                { orders: "501-1,000", handling: "10%", storage: "15%", shipping: "5%" },
                { orders: "1,001-5,000", handling: "15%", storage: "20%", shipping: "8%" },
                { orders: "5,001+", handling: "20%", storage: "25%", shipping: "12%" },
              ].map((tier, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-4 gap-4 p-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} items-center`}
                >
                  <div className="font-medium">{tier.orders}</div>
                  <div>{tier.handling}</div>
                  <div>{tier.storage}</div>
                  <div>{tier.shipping}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
            <p className="max-w-[700px] text-gray-500 md:text-lg">Common questions about our pricing and services</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6">
            {[
              {
                question: "Are there any hidden fees?",
                answer:
                  "No. We pride ourselves on transparent pricing. Your quote includes all costs from pickup to delivery, including customs duties and taxes. There are no surprise charges.",
              },
              {
                question: "How is shipping cost calculated?",
                answer:
                  "Shipping costs are calculated based on both the weight and volume (dimensional weight) of your shipment. We use the greater of the actual weight or the dimensional weight to determine the final cost.",
              },
              {
                question: "Do you offer volume discounts?",
                answer:
                  "Yes, we offer tiered pricing based on volume. The more you ship, the lower your per-unit cost will be. Our volume discount structure is transparent and automatically applied.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept credit cards, wire transfers, and PayPal. For regular clients, we also offer net-30 payment terms after an initial probation period.",
              },
              {
                question: "Is insurance included in the price?",
                answer:
                  "Basic insurance is included in all shipping quotes. Additional insurance for high-value shipments is available at an extra cost, typically 3-5% of the declared value.",
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
      <section className="relative py-16 text-white">
        <div className="absolute inset-0 z-0">
          <Image src="/pricing-hero-bg.png" alt="Pricing Background" fill className="object-cover" priority />
        </div>
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
            <p className="mx-auto max-w-[700px] text-xl text-white/90">
              Contact us today for a personalized quote tailored to your specific fulfillment needs
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-royalblue-700 hover:bg-gray-100">
                Get a Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-royalblue-600">
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
