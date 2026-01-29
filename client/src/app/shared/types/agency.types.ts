export type Agency = {
  id: string;
  name: string;
  description?: string | null;
  logoUrl?: string | null;
  phone?: string | null;
  email?: string | null;
  isApproved: boolean;
  commissionCut: number;
  createdAt: string;
  updatedAt: string;
};
