export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  provider?: string;
  image?: string;
} 