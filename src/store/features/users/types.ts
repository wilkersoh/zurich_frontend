export type Status = "loading" | "idle" | "error" | "success";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserPage {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface MaskedEmails {
  [key: number]: boolean;
}
