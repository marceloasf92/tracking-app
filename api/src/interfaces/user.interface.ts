export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  admin?: boolean;
  // orders?: Order[];
}
