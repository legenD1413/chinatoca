"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('提交失败');
      }

      setIsSubmitted(true);
      toast.success('您的消息已成功提交！');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('提交失败，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Map Background Section */}
      <section className="relative h-[300px] w-full">
        <div className="absolute inset-0 z-0">
          <Image src="/api/placeholder?width=1600&height=300" alt="Map" fill className="object-cover" priority />
        </div>
      </section>

      {/* Contact Us Header */}
      <section className="bg-white py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Contact Us</h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Feel free to contact us about any questions you might have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-3">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold">Thank You!</h2>
                  <p className="text-gray-500">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 bg-royalblue-700 hover:bg-royalblue-800"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="fullName" 
                        placeholder="Your full name" 
                        required 
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email address" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Please enter the phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium">
                      Website URL <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      id="website" 
                      type="url" 
                      placeholder="Please enter the website" 
                      required 
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Type your message here" 
                      className="min-h-[120px]" 
                      required 
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-royalblue-700 hover:bg-royalblue-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="rounded-xl bg-royalblue-700 p-6 text-white lg:col-span-2">
              <div className="space-y-8">
                {/* Email Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Email</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Sales:</p>
                    <p>sales@chinato.ca</p>
                    <p className="font-medium">Customer Service:</p>
                    <p>support@chinato.ca</p>
                    <p className="font-medium">Other Inquiries:</p>
                    <p>info@chinato.ca</p>
                  </div>
                </div>

                {/* Telephone Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Telephone</h3>
                  </div>
                  <p>+1-604-123-4567 (24 hours customer support)</p>
                </div>

                {/* Address Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-6 w-6" />
                    <h3 className="text-xl font-bold">Address</h3>
                  </div>
                  <p>
                    ChinaTo.ca, 123 Logistics Way, <br />
                    Vancouver, BC, V6B 1A9, <br />
                    Canada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations Section */}
      <section className="bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Our Offices</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
              Visit us at our locations in Canada and China
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            {[
              {
                location: "Vancouver, Canada",
                address: "123 Logistics Way, Vancouver, BC, V6B 1A9",
                phone: "+1 (604) 123-4567",
                email: "vancouver@chinato.ca",
                image: "/vancouver-skyline.png",
              },
              {
                location: "Shenzhen, China",
                address: "Building 3, Technology Park, Nanshan District, Shenzhen, Guangdong",
                phone: "+86 755 1234 5678",
                email: "shenzhen@chinato.ca",
                image: "/placeholder.svg?key=0bami",
              },
            ].map((office, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={office.image || "/placeholder.svg"}
                    width={500}
                    height={300}
                    alt={office.location}
                    className="h-[200px] w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{office.location}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-burgundy-700" />
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

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
              Find answers to common questions about contacting us
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6">
            {[
              {
                question: "What is your typical response time?",
                answer:
                  "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our customer support line for immediate assistance.",
              },
              {
                question: "Do you offer in-person consultations?",
                answer:
                  "Yes, we offer in-person consultations at our Vancouver and Shenzhen offices. Please contact us to schedule an appointment with one of our logistics experts.",
              },
              {
                question: "How can I track my existing shipment?",
                answer:
                  "Existing customers can track their shipments through our online portal. If you're having trouble accessing your tracking information, please contact our customer service team.",
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
      <section className="bg-royalblue-800 py-16 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Ready to Get Started?</h2>
            <p className="mx-auto max-w-[700px] text-xl text-white/90">
              Contact us today to learn more about our logistics solutions
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-white text-royalblue-700 hover:bg-gray-100">
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
