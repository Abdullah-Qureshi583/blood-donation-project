export interface Donor {
    id: string;
    name: string;
    lastName: string;
    bloodGroup: string;
    contact: string;
    country: string;
    province: string;
    district: string;
    // tehsil: string;
    // unionCouncil: string;
    // village: string;
    lastDonation: Date | null;
    isActive: boolean;
}

