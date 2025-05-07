"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Quote } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export default function GetAQuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    productCategory: "",
    ecommercePlatform: "",
    shipmentsPerMonth: "",
    concerns: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quotes', {
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
      toast.success('报价请求已成功提交！');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('提交失败，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Get your order fulfillment quote
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl">
              Answer a few questions and a fulfillment expert will get back to you within 1-2 business days to determine
              the best plan for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            {/* Quote Form */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Thank You!</h2>
                  <p className="text-gray-500">
                    Your quote request has been submitted successfully. One of our fulfillment experts will contact you
                    within 1-2 business days.
                  </p>
                </div>
              ) :
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

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="productCategory" className="text-sm font-medium">
                        Product Category
                      </label>
                      <Select onValueChange={(value) => handleSelectChange("productCategory", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="clothing">Clothing & Apparel</SelectItem>
                          <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                          <SelectItem value="home">Home & Kitchen</SelectItem>
                          <SelectItem value="toys">Toys & Games</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="ecommercePlatform" className="text-sm font-medium">
                        Your eCommerce platforms <span className="text-red-500">*</span>
                      </label>
                      <Select 
                        required 
                        onValueChange={(value) => handleSelectChange("ecommercePlatform", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shopify">Shopify</SelectItem>
                          <SelectItem value="woocommerce">WooCommerce</SelectItem>
                          <SelectItem value="amazon">Amazon</SelectItem>
                          <SelectItem value="ebay">eBay</SelectItem>
                          <SelectItem value="etsy">Etsy</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="shipmentsPerMonth" className="text-sm font-medium">
                      Shipments/Month <span className="text-red-500">*</span>
                    </label>
                    <Select 
                      required 
                      onValueChange={(value) => handleSelectChange("shipmentsPerMonth", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Please Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-100">0-100</SelectItem>
                        <SelectItem value="101-500">101-500</SelectItem>
                        <SelectItem value="501-1000">501-1,000</SelectItem>
                        <SelectItem value="1001-5000">1,001-5,000</SelectItem>
                        <SelectItem value="5000+">5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="concerns" className="text-sm font-medium">
                      Your concerns <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="concerns"
                      placeholder="Help us to offer you a customized shipping solution sooner"
                      className="min-h-[120px]"
                      required
                      value={formData.concerns}
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-royalblue-700 hover:bg-royalblue-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Connect with Sales"}
                  </Button>
                </form>
              }
            </div>

            {/* Benefits and Testimonial */}
            <div className="flex flex-col gap-8">
              {/* We Promise Section */}
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h2 className="mb-6 text-2xl font-bold">We promise</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { text: "$0 Setup" },
                    { text: "$0 Software" },
                    { text: "$0 Onboarding" },
                    { text: "$0 Receiving" },
                    { text: "No hidden fee" },
                    { text: "No MOQ" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-royalblue-600"></div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="mb-4 text-royalblue-600">
                  <Quote className="h-10 w-10" />
                </div>
                <p className="mb-6 text-gray-700">
                  ChinaTo.ca has been the best solution for my business to ship internationally. They are extremely
                  organized, have amazing customer service, and are extremely quick to get your orders shipped out.
                  Highly recommend to try them for your business.
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Customer"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Founder @ TechGadgets Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">Why Choose ChinaTo.ca?</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">
              We provide comprehensive logistics solutions tailored to your specific needs
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              {
                title: "Expertise",
                description:
                  "Our team has years of experience in China-Canada logistics and understands the unique challenges of cross-border shipping.",
              },
              {
                title: "Transparency",
                description:
                  "No hidden fees or surprise charges. We provide clear, upfront pricing and regular updates on your shipments.",
              },
              {
                title: "Customization",
                description:
                  "Every business is unique. We tailor our fulfillment solutions to meet your specific requirements and goals.",
              },
            ].map((feature, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
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
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg">Common questions about our quote process</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl gap-6">
            {[
              {
                question: "How long does it take to get a quote?",
                answer:
                  "Our team will review your information and provide a customized quote within 1-2 business days.",
              },
              {
                question: "What information do I need to provide?",
                answer:
                  "Basic information about your business, product type, shipping volume, and specific requirements will help us create an accurate quote.",
              },
              {
                question: "Is there a commitment after receiving a quote?",
                answer:
                  "No, there's no obligation. We provide the quote to help you make an informed decision about your logistics needs.",
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
    </div>
  )
}
