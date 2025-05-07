import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Mail, Phone, CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About ChinaTo.ca</h1>
                <p className="text-gray-500 md:text-xl">
                  Your trusted partner for logistics solutions from China to Canada
                </p>
              </div>
              <p className="text-gray-500">
                Founded in 2015, ChinaTo.ca has grown to become a leading logistics provider specializing in shipping
                from China to Canada. With offices in both countries, we bridge the gap between manufacturers and
                businesses, providing seamless logistics solutions.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-royalblue-700 hover:bg-royalblue-800">Our Services</Button>
                <Button variant="outline">Contact Us</Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="ChinaTo.ca Team"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
              <p className="text-gray-500">
                Our mission is to simplify cross-border logistics between China and Canada, providing businesses of all
                sizes with reliable, efficient, and cost-effective shipping solutions. We aim to be the bridge that
                connects Chinese manufacturers with Canadian markets, enabling seamless trade and growth opportunities.
              </p>
              <p className="text-gray-500">
                We believe in building long-term relationships with our clients, becoming an extension of their team and
                a trusted partner in their supply chain. Our success is measured by the success of the businesses we
                serve.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
              <ul className="grid gap-3">
                {[
                  {
                    title: "Reliability",
                    description: "We deliver on our promises, ensuring your shipments arrive on time, every time.",
                  },
                  {
                    title: "Transparency",
                    description: "We believe in clear communication and no hidden fees or surprises.",
                  },
                  {
                    title: "Expertise",
                    description:
                      "Our team brings years of experience in international logistics and customs procedures.",
                  },
                  {
                    title: "Innovation",
                    description:
                      "We continuously improve our processes and adopt new technologies to serve you better.",
                  },
                ].map((value, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
                    <div>
                      <h3 className="font-bold">{value.title}</h3>
                      <p className="text-gray-500">{value.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Leadership Team</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Meet the experts behind our logistics solutions
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "David Chen",
                title: "Founder & CEO",
                bio: "With over 15 years of experience in international logistics, David founded ChinaTo.ca to bridge the gap between Chinese manufacturers and Canadian businesses.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Sarah Johnson",
                title: "Operations Director",
                bio: "Sarah oversees all logistics operations, ensuring smooth processes from pickup in China to final delivery in Canada.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Michael Zhang",
                title: "China Operations Manager",
                bio: "Based in our Shenzhen office, Michael manages our team in China and coordinates with manufacturers and freight forwarders.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Emily Wilson",
                title: "Customer Success Manager",
                bio: "Emily ensures our clients receive exceptional service and support throughout their shipping journey.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Robert Li",
                title: "Customs Compliance Specialist",
                bio: "Robert's expertise in international trade regulations ensures smooth customs clearance for all shipments.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Jennifer Wong",
                title: "Business Development Manager",
                bio: "Jennifer works with new clients to understand their needs and develop tailored logistics solutions.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    width={150}
                    height={150}
                    alt={member.name}
                    className="h-[150px] w-[150px] object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-royalblue-600">{member.title}</p>
                <p className="mt-2 text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Locations */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Locations</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Strategically located offices to serve you better
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            {[
              {
                location: "Vancouver, Canada",
                address: "123 Logistics Way, Vancouver, BC, V6B 1A9",
                phone: "+1 (604) 123-4567",
                email: "vancouver@chinato.ca",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                location: "Shenzhen, China",
                address: "Building 3, Technology Park, Nanshan District, Shenzhen, Guangdong",
                phone: "+86 755 1234 5678",
                email: "shenzhen@chinato.ca",
                image: "/placeholder.svg?height=300&width=500",
              },
            ].map((office, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                  <Image
                    src={office.image || "/placeholder.svg"}
                    width={500}
                    height={300}
                    alt={office.location}
                    className="rounded-lg object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{office.location}</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-burgundy-700" />
                    <span className="text-gray-600">{office.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-burgundy-700" />
                    <span className="text-gray-600">{office.phone}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-burgundy-700" />
                    <span className="text-gray-600">{office.email}</span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Clients Say</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from businesses who trust us with their logistics
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "ChinaTo.ca has been instrumental in our growth. Their reliable shipping solutions have allowed us to scale our ecommerce business with confidence.",
                author: "Mark Thompson",
                company: "Canadian Imports Ltd.",
              },
              {
                quote:
                  "The team's knowledge of customs procedures saved us countless headaches. They've become an essential part of our supply chain.",
                author: "Lisa Chen",
                company: "Tech Innovations",
              },
              {
                quote:
                  "As a crowdfunding creator, their specialized fulfillment services ensured our backers received their products on time and in perfect condition.",
                author: "James Wilson",
                company: "NextGen Products",
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-gray-600">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-royalblue-600">{testimonial.company}</p>
                </div>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Work With Us?</h2>
              <p className="max-w-[700px] text-royalblue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Contact our team today to discuss your logistics needs
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-white text-royalblue-800 hover:bg-gray-100">Get a Quote</Button>
              <Button variant="outline" className="border-white text-white hover:bg-royalblue-700">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
