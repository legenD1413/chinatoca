import { Button } from "@/components/ui/button"
import { Package, Boxes, ClipboardCheck, Camera, Tag, ShieldAlert } from "lucide-react"

export default function AdditionalServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Additional Services</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Customize your fulfillment experience with these value-added services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Custom Packaging */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Package className="h-6 w-6 text-royalblue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Custom Packaging</h3>
              <p className="mb-4 text-lg font-medium text-royalblue-600">Custom Quote</p>
              <p className="text-gray-500">
                Branded packaging solutions to enhance your customer's unboxing experience.
              </p>
            </div>

            {/* Kitting & Assembly */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Boxes className="h-6 w-6 text-royalblue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Kitting & Assembly</h3>
              <p className="mb-4 text-lg font-medium text-royalblue-600">From $0.50 per unit</p>
              <p className="text-gray-500">Combine multiple products into ready-to-ship kits or gift sets.</p>
            </div>

            {/* Quality Inspection */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <ClipboardCheck className="h-6 w-6 text-royalblue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Quality Inspection</h3>
              <p className="mb-4 text-lg font-medium text-royalblue-600">From $100</p>
              <p className="text-gray-500">Comprehensive quality check before shipping to ensure product standards.</p>
            </div>

            {/* Product Photography */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Camera className="h-6 w-6 text-royalblue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Product Photography</h3>
              <p className="mb-4 text-lg font-medium text-royalblue-600">From $15 per product</p>
              <p className="text-gray-500">Professional product photography for your ecommerce listings.</p>
            </div>

            {/* Labeling */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Tag className="h-6 w-6 text-royalblue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Labeling</h3>
              <p className="mb-4 text-lg font-medium text-royalblue-600">From $0.25 per unit</p>
              <p className="text-gray-500">Custom labeling, barcoding, and FNSKU application for your products.</p>
            </div>

            {/* Special Handling */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <ShieldAlert className="h-6 w-6 text-royalblue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Special Handling</h3>
              <p className="mb-4 text-lg font-medium text-royalblue-600">From $2.00 per unit</p>
              <p className="text-gray-500">Special handling for fragile, oversized, or high-value items.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Details */}
      <section className="bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-12">
            {/* Custom Packaging Details */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Custom Packaging</h2>
              <p className="mb-4 text-gray-500">
                Make your brand stand out with custom packaging solutions. We offer a range of options to enhance your
                customer's unboxing experience and strengthen your brand identity.
              </p>
              <ul className="ml-6 list-disc space-y-2 text-gray-500">
                <li>Custom branded boxes with your logo and design</li>
                <li>Custom tissue paper, stickers, and tape</li>
                <li>Personalized thank you cards and inserts</li>
                <li>Gift wrapping options for special occasions</li>
                <li>Eco-friendly packaging alternatives</li>
              </ul>
            </div>

            {/* Kitting & Assembly Details */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Kitting & Assembly</h2>
              <p className="mb-4 text-gray-500">
                Our kitting and assembly services allow you to create product bundles, gift sets, or subscription boxes
                by combining multiple items into a single package.
              </p>
              <ul className="ml-6 list-disc space-y-2 text-gray-500">
                <li>Product bundling for promotions and special offers</li>
                <li>Subscription box assembly</li>
                <li>Gift set creation with custom presentation</li>
                <li>Multi-part product assembly</li>
                <li>Seasonal kit preparation</li>
              </ul>
            </div>

            {/* Quality Inspection Details */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Quality Inspection</h2>
              <p className="mb-4 text-gray-500">
                Ensure your products meet your quality standards before they reach your customers. Our comprehensive
                inspection services help identify and resolve issues before shipping.
              </p>
              <ul className="ml-6 list-disc space-y-2 text-gray-500">
                <li>Visual inspection for defects and damage</li>
                <li>Functional testing for electronic products</li>
                <li>Dimensional verification and measurement</li>
                <li>Packaging integrity checks</li>
                <li>Detailed inspection reports with photos</li>
              </ul>
            </div>

            {/* More Services */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Additional Customized Services</h2>
              <p className="mb-4 text-gray-500">
                Don't see exactly what you need? We offer a range of customized services tailored to your specific
                requirements. Contact our team to discuss your unique needs and get a personalized quote.
              </p>
              <div className="mt-6">
                <Button className="bg-royalblue-700 hover:bg-royalblue-800">Contact Us for Custom Services</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-royalblue-700 to-royalblue-500 py-16 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
            <p className="mx-auto max-w-[700px] text-xl text-white/90">
              Contact us today to learn more about our additional services and how they can enhance your fulfillment
              experience.
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
