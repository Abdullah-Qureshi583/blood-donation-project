export interface Donor {
    id: string;
    name: string;
    bloodGroup: string;
    province: string;
    district?: string;
    tehsil?: string;  
    unionCouncil?: string;
    village?: string;
    lastDonation: string;
    isActive: boolean;
    isPublic: boolean;
    contact?: string;
  }