// app/search/page.tsx
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, Phone, Search as SearchIcon, Calendar as CalendarIcon, 
  Map, Filter, RefreshCcw, User, MapPin 
} from 'lucide-react';
import { format } from 'date-fns';

export default function DonorSearch() {
  const [loading, setLoading] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('search');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Find Blood Donors
          </h1>
          <p className="text-xl text-center text-red-100 max-w-2xl mx-auto">
            Quickly connect with blood donors in your area and save lives.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-8">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <Tabs defaultValue="search" className="space-y-6">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                <TabsTrigger value="search" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Search
                </TabsTrigger>
                <TabsTrigger value="request" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Request
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-6">
                {/* Search Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center text-gray-700">
                      <Filter className="w-4 h-4 mr-2" />
                      Blood Group
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center text-gray-700">
                      <Map className="w-4 h-4 mr-2" />
                      Location
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lahore">Lahore</SelectItem>
                          <SelectItem value="karachi">Karachi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      Area
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Tehsil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gulberg">Gulberg</SelectItem>
                        <SelectItem value="johar">Johar Town</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <SearchIcon className="w-4 h-4 mr-2" />
                      Find Donors
                    </Button>
                  </div>
                </div>

                {/* Search Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Donor Card */}
                  <Card className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-red-600">O+</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">Ahmed Khan</h3>
                              <p className="text-gray-600 text-sm flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                Gulberg, Lahore
                              </p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Last Donation: 15 Jan 2024
                            </span>
                            <Button className="bg-red-600 hover:bg-red-700">
                              <Phone className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="request" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Patient Name</label>
                        <Input className="mt-1" placeholder="Enter patient name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Hospital</label>
                        <Input className="mt-1" placeholder="Enter hospital name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Required Date</label>
                        <div className="mt-1">
                          <Calendar mode="single" className="rounded-md border" />
                        </div>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        Submit Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}