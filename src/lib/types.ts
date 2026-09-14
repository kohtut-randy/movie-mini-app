export type Role = "admin" | "user";
export type Mode = "create" | "edit";

export interface User {
  id?: string;
  email: string;
  password: string;
  role?: Role;
}

export interface Movie {
  id?: string;
  title: string;
  description: string;
  price: number;
  genre: string;
  releaseYear: number;
  createdAt?: string;
}

export interface MovieFormPayload {
  title: string;
  description: string;
  price: number;
  genre: string;
  releaseYear: number;
}

export interface Bookmark {
  id: string;
  userId: string;
  movieId: string;
  createdAt: string;
}
