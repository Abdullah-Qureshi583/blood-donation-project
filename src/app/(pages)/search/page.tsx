"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
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

import PageContainer from "@/components/PageContainer";
import bloodGroupsData from "@/data/bloodGroups.json";
import locationData from "@/data/locationData.json";
import FieldSelect from "./components/FiledSelect";
import SearchResult from "./components/SearchResult";

import { SearchDataType } from "./types/type";
import { Donor } from "@/types/donor";

const bloodGroups: string[] = bloodGroupsData;

export default function DonorSearch() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [donorLoading, setDonorLoading] = useState(false);

  const [searchData, setSearchData] = useState<SearchDataType>({
    selectedBloodGroup: "",
    selectedProvince: "",
    selectedDistrict: "",
    selectedTehsil: "",
    selectedUC: "",
    activeOnly: true,
  });

  const [submittedFilter, setSubmittedFilter] = useState<SearchDataType | null>(
    null
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const isSearchActive =
    searchData.selectedBloodGroup !== "" &&
    searchData.selectedProvince !== "" &&
    searchData.selectedDistrict !== "";

  const handleChange = (key: string, value: string | boolean) => {
    setSearchData((prev) => {
      const updatedData = { ...prev, [key]: value };

      if (key === "selectedProvince") {
        updatedData.selectedDistrict = "";
        updatedData.selectedTehsil = "";
        updatedData.selectedUC = "";
      } else if (key === "selectedDistrict") {
        updatedData.selectedTehsil = "";
        updatedData.selectedUC = "";
      } else if (key === "selectedTehsil") {
        updatedData.selectedUC = "";
      }

      return updatedData;
    });
  };

  const handleSearch = () => setSubmittedFilter(searchData);

  useEffect(() => {
    if (!submittedFilter) return;

    const searchData = {
      bloodGroup: submittedFilter.selectedBloodGroup,
      district: submittedFilter.selectedDistrict,
      tehsil: submittedFilter.selectedTehsil,
      unionCouncil: submittedFilter.selectedUC,
      activeOnly: submittedFilter.activeOnly,
    };

    setDonorLoading(true);
    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${res.status}`
          );
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setDonors(data.donors);
        } else {
          console.error("Search failed:", data.error);
          setDonors([]);
        }
        setDonorLoading(false);
      })
      .catch((error) => {
        console.error("Search error:", error);
        setDonors([]);
        setDonorLoading(false);
        // You can add a toast notification here if you have a notification system
      });
  }, [submittedFilter]);
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
            <FieldSelect
              label="Blood Group"
              options={bloodGroups}
              value={searchData.selectedBloodGroup}
              onChange={(value) => handleChange("selectedBloodGroup", value)}
            />
            <FieldSelect
              label="Province"
              options={Object.keys(locationData.districts)}
              value={searchData.selectedProvince}
              onChange={(value) => handleChange("selectedProvince", value)}
            />
            <FieldSelect
              label="District"
              options={
                searchData.selectedProvince
                  ? (locationData.districts as Record<string, string[]>)[
                      searchData.selectedProvince
                    ] || []
                  : []
              }
              value={searchData.selectedDistrict}
              onChange={(value) => handleChange("selectedDistrict", value)}
              disabled={!searchData.selectedProvince}
              placeholder={
                !searchData.selectedProvince
                  ? "Select Province first"
                  : "Select District"
              }
            />
            {showAdvanced && (
              <FieldSelect
                label="Tehsil"
                options={
                  searchData.selectedDistrict
                    ? (locationData.tehsils as Record<string, string[]>)[
                        searchData.selectedDistrict
                      ] || []
                    : []
                }
                value={searchData.selectedTehsil}
                onChange={(value) => handleChange("selectedTehsil", value)}
                disabled={!searchData.selectedDistrict}
                placeholder={
                  !searchData.selectedDistrict
                    ? "Select District first"
                    : "Select Tehsil"
                }
              />
            )}
            {showAdvanced && (
              <FieldSelect
                label="Union Council"
                options={
                  searchData.selectedTehsil
                    ? (locationData.unionCouncils as Record<string, string[]>)[
                        searchData.selectedTehsil
                      ] || []
                    : []
                }
                value={searchData.selectedUC}
                onChange={(value) => handleChange("selectedUC", value)}
                disabled={!searchData.selectedTehsil}
                placeholder={
                  !searchData.selectedTehsil
                    ? "Select Tehsil first"
                    : "Select Union Council"
                }
              />
            )}
          </div>

          <Button
            className="mt-4"
            variant="outline"
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
          >
            {showAdvanced ? "Hide Advanced Filters" : "Show Advanced Filters"}
          </Button>

          {/* search button */}
          <div className="flex items-center space-x-4 mt-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="active-only"
                checked={searchData.activeOnly}
                onCheckedChange={(value) => handleChange("activeOnly", value)}
              />
              <Label htmlFor="active-only">Active Donors Only</Label>
            </div>
            <Button
              disabled={!isSearchActive}
              onClick={handleSearch}
              className="ml-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Donors
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {submittedFilter && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Search Results
          </h2>
          <SearchResult loading={donorLoading} donors={donors} />
        </div>
      )}
    </PageContainer>
  );
}
