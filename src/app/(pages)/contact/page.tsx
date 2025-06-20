// app/contact/page.tsx
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, AlertCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHero
        title="Contact Us"
        description="Have questions or need assistance? Reach out to us—we're here to help!"
      />

      {/* Emergency Contact Banner */}
      <div className="bg-yellow-50 border-b border-yellow-100">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-2">
            <AlertCircle className="text-yellow-600 w-5 h-5" />
            <p className="text-yellow-800">
              For emergencies, call our 24/7 hotline:{" "}
              <span className="font-bold">1-800-BLOOD-HELP</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="Enter message subject"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message"
                      className="min-h-[120px] w-full"
                    />
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-red-600 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Our Location</h3>
                        <p className="text-gray-600">
                          123 Medical Center Drive
                          <br />
                          Healthcare City, HC 12345
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-red-600 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone Numbers</h3>
                        <p className="text-gray-600">
                          General Inquiries: (555) 123-4567
                          <br />
                          Emergency Hotline: 1-800-BLOOD-HELP
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-red-600 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email Addresses</h3>
                        <p className="text-gray-600">
                          General: info@bloodbank.com
                          <br />
                          Support: support@bloodbank.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-red-600 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Working Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 8:00 AM - 8:00 PM
                          <br />
                          Saturday - Sunday: 9:00 AM - 5:00 PM
                          <br />
                          Emergency Services: 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-video w-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509123!2d144.9537353153154!3d-37.81627997975157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11f5b3%3A0x5045675218ceed30!2sMelbourne%20CBD%2C%20Victoria%2C%20Australia!5e0!3m2!1sen!2sus!4v1633031234567!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
