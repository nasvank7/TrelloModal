// types.ts
export interface User {
    id: number;
    username: string;
    email: string;
    // Add other user properties as needed
  }
  
  export interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
  }
  