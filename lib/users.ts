export interface User {
  id: number;
  name: string;
  password: string;
  role: string;
}

export const users: User[] = [
  { id: 1, name: "Channel Manager", password: "password", role: "channel_manager" },
  { id: 2, name: "Brand Manager", password: "password", role: "brand_manager" },
  { id: 3, name: "Territory Manager", password: "password", role: "territory_manager" },
];
