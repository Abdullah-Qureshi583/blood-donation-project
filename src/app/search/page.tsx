"use client";

// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Calendar } from "@/components/ui/calendar";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Loader2,
//   Phone,
//   Search as SearchIcon,
//   Calendar as CalendarIcon,
//   Map,
//   Filter,
//   RefreshCcw,
//   User,
//   MapPin,
// } from "lucide-react";
// import { format } from "date-fns";
// import PageContainer from "@/components/PageContainer";

// export default function DonorSearch() {
//   const [loading, setLoading] = useState(false);
//   const [showRequestForm, setShowRequestForm] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [activeTab, setActiveTab] = useState("search");

//   return (
//     <PageContainer>
//       {/* Main Content */}

//         <Card className="shadow-xl">
//           <CardContent className="p-6">
//             <Tabs defaultValue="search" className="space-y-6">
//               <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
//                 <TabsTrigger
//                   value="search"
//                   className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
//                 >
//                   <SearchIcon className="w-4 h-4 mr-2" />
//                   Search
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="request"
//                   className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
//                 >
//                   <RefreshCcw className="w-4 h-4 mr-2" />
//                   Request
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="search" className="space-y-6">
//                 {/* Search Filters */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium flex items-center text-gray-700">
//                       <Filter className="w-4 h-4 mr-2" />
//                       Blood Group
//                     </label>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select Blood Group" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
//                           (group) => (
//                             <SelectItem key={group} value={group}>
//                               {group}
//                             </SelectItem>
//                           )
//                         )}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium flex items-center text-gray-700">
//                       <Map className="w-4 h-4 mr-2" />
//                       Location
//                     </label>
//                     <div className="grid grid-cols-1 gap-2">
//                       <Select>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select District" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="lahore">Lahore</SelectItem>
//                           <SelectItem value="karachi">Karachi</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium flex items-center text-gray-700">
//                       <MapPin className="w-4 h-4 mr-2" />
//                       Area
//                     </label>
//                     <Select>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select Tehsil" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="gulberg">Gulberg</SelectItem>
//                         <SelectItem value="johar">Johar Town</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="flex items-end">
//                     <Button className="w-full bg-red-600 hover:bg-red-700">
//                       <SearchIcon className="w-4 h-4 mr-2" />
//                       Find Donors
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Search Results */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Donor Card */}
//                   <Card className="hover:shadow-lg transition-all">
//                     <CardContent className="p-6">
//                       <div className="flex items-start gap-4">
//                         <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
//                           <span className="text-2xl font-bold text-red-600">
//                             O+
//                           </span>
//                         </div>
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <h3 className="font-semibold text-lg">
//                                 Ahmed Khan
//                               </h3>
//                               <p className="text-gray-600 text-sm flex items-center">
//                                 <MapPin className="w-4 h-4 mr-1" />
//                                 Gulberg, Lahore
//                               </p>
//                             </div>
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               Active
//                             </span>
//                           </div>
//                           <div className="mt-4 flex items-center justify-between">
//                             <span className="text-sm text-gray-500">
//                               Last Donation: 15 Jan 2024
//                             </span>
//                             <Button className="bg-red-600 hover:bg-red-700">
//                               <Phone className="w-4 h-4 mr-2" />
//                               Contact
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </TabsContent>

//               <TabsContent value="request" className="space-y-4">
//                 <Card>
//                   <CardContent className="p-6">
//                     <div className="space-y-4">
//                       <div>
//                         <label className="text-sm font-medium">
//                           Patient Name
//                         </label>
//                         <Input
//                           className="mt-1"
//                           placeholder="Enter patient name"
//                         />
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium">Hospital</label>
//                         <Input
//                           className="mt-1"
//                           placeholder="Enter hospital name"
//                         />
//                       </div>
//                       <div>
//                         <label className="text-sm font-medium">
//                           Required Date
//                         </label>
//                         <div className="mt-1">
//                           <Calendar
//                             mode="single"
//                             className="rounded-md border"
//                           />
//                         </div>
//                       </div>
//                       <Button className="w-full bg-red-600 hover:bg-red-700">
//                         Submit Request
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>

//     </PageContainer>
//   );
// }
"use client";

import { SetStateAction, useEffect, useState } from "react";
import { getDocs, collection, DocumentData } from "firebase/firestore";
import { db } from "../../utlis/firebase";
import { Search, Calendar, Phone, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import PageContainer from "@/components/PageContainer";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const districts = ["Lahore", "Karachi", "Islamabad", "Peshawar"];
const tehsils = ["Tehsil A", "Model Town", "Cantt"];
const unionCouncils = ["UC-X", "UC-2", "UC-3"];

interface Donor {
  fullName: string;
  id: number;
  name: string;
  bloodGroup: string;
  district: string;
  tehsil: string;
  lastDonationDate: string;
  isActive: boolean;
  isPublic: boolean;
  contact?: string;
}

export default function DonorSearch() {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedTehsil, setSelectedTehsil] = useState<string>("");
  const [selectedUC, setSelectedUC] = useState<string>("");
  const [activeOnly, setActiveOnly] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);

  const getDonors = async () => {
    const querySnapshot = await getDocs(collection(db, "donors"));
    const donorArray = querySnapshot.docs.map((q) => q.data() as Donor); // Ensure type safety
    setDonors(donorArray);
  };

  useEffect(() => {
    getDonors();
  });
  // Mock data for demonstration
  // const donors: Donor[] = [
  //   {
  //     id: 1,
  //     name: "Ahmed Khan",
  //     bloodGroup: "O+",
  //     district: "Lahore",
  //     tehsil: "Gulberg",
  //     lastDonation: "2024-01-15",
  //     isActive: true,
  //     isPublic: true,
  //     contact: "+92 300 1234567",
  //   },
  //   {
  //     id: 2,
  //     name: "Sara Ali",
  //     bloodGroup: "A+",
  //     district: "Lahore",
  //     tehsil: "Model Town",
  //     lastDonation: "2023-12-01",
  //     isActive: false,
  //     isPublic: false,
  //   },
  // ];
  const handleSearch = () => {
    const filtered = donors.filter((donor) => {
      return (
        (!selectedBloodGroup || donor.bloodGroup === selectedBloodGroup) &&
        (!selectedDistrict || donor.district === selectedDistrict) &&
        (!activeOnly || donor.isActive)
      );
    });

    setFilteredDonors(filtered);
    setShowResults(true);
  };

  return (
    <PageContainer
      title="Find Blood Donors Instantly"
      description="Easily connect with blood donors in your area and save lives with just a few clicks."
    >
      {/* Search Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Filters</CardTitle>
          <CardDescription>
            Select your requirements to find matching donors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label>Blood Group</Label>
              <Select onValueChange={setSelectedBloodGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>District</Label>
              <Select onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tehsil</Label>
              <Select onValueChange={setSelectedTehsil}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Tehsil" />
                </SelectTrigger>
                <SelectContent>
                  {tehsils.map((tehsil) => (
                    <SelectItem key={tehsil} value={tehsil}>
                      {tehsil}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Union Council</Label>
              <Select onValueChange={setSelectedUC}>
                <SelectTrigger>
                  <SelectValue placeholder="Select UC" />
                </SelectTrigger>
                <SelectContent>
                  {unionCouncils.map((uc) => (
                    <SelectItem key={uc} value={uc}>
                      {uc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="active-only"
                checked={activeOnly}
                onCheckedChange={setActiveOnly}
              />
              <Label htmlFor="active-only">Active Donors Only</Label>
            </div>
            <Button onClick={handleSearch} className="ml-auto">
              <Search className="w-4 h-4 mr-2" />
              Search Donors
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {showResults && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Search Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {donors.map((donor) => (
              <Card key={donor.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {donor.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {donor.district}, {donor.tehsil}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      {donor.bloodGroup}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      Last Donation: {donor.lastDonationDate}
                    </div>

                    <div className="flex items-center text-sm">
                      <AlertCircle className="w-4 h-4 mr-2 text-gray-500" />
                      Status:{" "}
                      <span
                        className={`ml-1 ${
                          donor.isActive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {donor.isActive ? "✅ Active" : "❌ Inactive"}
                      </span>
                    </div>

                    {donor.isPublic ? (
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {donor.contact}
                      </div>
                    ) : (
                      <Button variant="outline" className="w-full mt-2">
                        Request Contact Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Blood Donation Request Form Dialog */}
          <div className="text-center mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mx-auto">
                  Submit Blood Donation Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Blood Donation Request</DialogTitle>
                  <DialogDescription>
                    Fill out this form to submit a blood donation request
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Patient&apos;s Name</Label>
                    <Input placeholder="Enter patient's name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Hospital Name</Label>
                    <Input placeholder="Enter hospital name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Required Blood Group</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date When Blood is Needed</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Number</Label>
                    <Input placeholder="Enter contact number" />
                  </div>
                  <Button className="w-full">Submit Request</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
