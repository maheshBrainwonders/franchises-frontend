export interface IFranchise {
  _id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  investment_min: number;
  investment_max: number;
  franchise_fee: number;
  royalty_fee: number;
  locations: string[];
  support_details: string;
  contact_email: string;
  contact_phone: string;
}