import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  Building,
  Users,
  Clock,
  Award,
  CheckCircle,
  Laptop,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <PageHero
        title="About Us"
        description="We provide life-saving blood services through our hospital blood bank and digital platform, connecting donors with those in need to make a meaningful impact."
      />

      {/* Introduction Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-secondaryColor mb-8">
            Blood Life Hospital Blood Bank is a state-of-the-art facility
            combining traditional blood banking services with modern digital
            solutions. We operate both a physical blood bank at our hospital and
            an online platform to connect donors with those in need.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Our Mission",
              icon: <Heart className="w-12 h-12 text-normalRed mb-4" />,
              description: `To provide safe, reliable blood services through our hospital blood bank while leveraging technology to create a broader network of donors and recipients, ensuring blood availability for all patients in need.`,
            },
            {
              title: "Our Vision",
              icon: <Award className="w-12 h-12 text-normalRed mb-4" />,
              description: ` To be the region's leading blood center, combining medical excellence with technological innovation to serve our community's blood needs efficiently and effectively.`,
            },
          ].map((item, idx) => (
            <Card key={idx} className="transition-transform hover:scale-105">
              <CardHeader>
                {item.icon}
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondaryColor">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Our Services Section */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Hospital Services */}
            <Card>
              <CardHeader>
                <Building className="w-12 h-12 text-normalRed mb-4" />
                <CardTitle>Hospital Blood Bank</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>State-of-the-art blood storage facilities</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>Advanced blood testing laboratory</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>Component separation unit</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>On-site donation facility</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>Emergency blood supply services</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Online Platform */}
            <Card>
              <CardHeader>
                <Laptop className="w-12 h-12 text-normalRed mb-4" />
                <CardTitle>Digital Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>Online donor registration</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>Blood availability search</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>Emergency blood requests</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>Donor-recipient matching</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-normalRed mt-1" />
                    <span>Real-time inventory updates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
          <div>
            <p className="text-4xl font-bold text-normalRed">30+</p>
            <p className="text-secondaryColor">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-normalRed">50K+</p>
            <p className="text-secondaryColor">Units Collected</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-normalRed">100+</p>
            <p className="text-secondaryColor">Medical Staff</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-normalRed">24/7</p>
            <p className="text-secondaryColor">Emergency Service</p>
          </div>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Facilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Building className="w-12 h-12 text-normalRed mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Modern Blood Bank</h3>
              <p className="text-secondaryColor">
                State-of-the-art facilities for blood collection, testing, and
                storage
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-normalRed mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Expert Team</h3>
              <p className="text-secondaryColor">
                Qualified medical professionals and technical staff
              </p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-normalRed mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">24/7 Services</h3>
              <p className="text-secondaryColor">
                Round-the-clock emergency blood services
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <PageHero
        title=" Need Blood or Want to Donate?"
        description=" Visit our hospital blood bank or use our online platform to register as a donor or request blood. We're here to help 24/7."
      >
        <div className="flex justify-center gap-4 mt-4">
          <Button
            asChild
            className="bg-white border border-darkRed text-darkRed hover:bg-darkRed hover:border-white hover:text-white"
          >
            <Link href="/register">Register as Donor</Link>
          </Button>
          <Button
            asChild
            className="bg-darkRed border border-white text-white hover:bg-white hover:border-darkRed hover:text-darkRed "
          >
            <Link href="/search">Request Blood</Link>
          </Button>
        </div>
      </PageHero>
    </div>
  );
}
