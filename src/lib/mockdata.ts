import { Movie, User, Bookmark } from "./types";

// Seed users
export const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
];

// Seed movies
let movies: Movie[] = [
  {
    id: "1",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years.",
    price: 9.99,
    genre: "Drama",
    releaseYear: 1994,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty.",
    price: 12.99,
    genre: "Crime",
    releaseYear: 1972,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen intertwine.",
    price: 8.99,
    genre: "Crime",
    releaseYear: 1994,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology.",
    price: 10.99,
    genre: "Sci-Fi",
    releaseYear: 2010,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
    price: 11.99,
    genre: "Action",
    releaseYear: 2008,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Forrest Gump",
    description:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man.",
    price: 9.49,
    genre: "Drama",
    releaseYear: 1994,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "The Matrix",
    description:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    price: 10.49,
    genre: "Sci-Fi",
    releaseYear: 1999,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    price: 12.49,
    genre: "Sci-Fi",
    releaseYear: 2014,
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    title: "Gladiator",
    description:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    price: 11.49,
    genre: "Action",
    releaseYear: 2000,
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    price: 10.99,
    genre: "Drama",
    releaseYear: 1994,
    createdAt: new Date().toISOString(),
  },
  {
    id: "11",
    title: "Fight Club",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club.",
    price: 9.99,
    genre: "Drama",
    releaseYear: 1999,
    createdAt: new Date().toISOString(),
  },
  {
    id: "12",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the One Ring and save Middle-earth from the Dark Lord Sauron.",
    price: 12.99,
    genre: "Fantasy",
    releaseYear: 2001,
    createdAt: new Date().toISOString(),
  },
];

let bookmarks: Bookmark[] = [];

// CRUD helpers
export const db = {
  // Users
  findUserByEmail: (email: string) => users.find((u) => u.email === email),
  findUserByEmailAndPassword: (email: string, password: string) =>
    users.find((u) => u.email === email && u.password === password),
  findUserById: (id: string) => users.find((u) => u.id === id),

  // Movies
  getMovies: (filters?: {
    genre?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) => {
    let filtered = [...movies];

    if (filters?.genre) {
      filtered = filtered.filter((m) => m.genre === filters.genre);
    }
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(s) ||
          m.description.toLowerCase().includes(s),
      );
    }
    // if (filters?.minPrice !== undefined) {
    //   filtered = filtered.filter((m) => m.price >= filters.minPrice!);
    // }
    // if (filters?.maxPrice !== undefined) {
    //   filtered = filtered.filter((m) => m.price <= filters.maxPrice!);
    // }

    const page = filters?.page || 1;
    const limit = filters?.limit || 6;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return {
      data: paginated,
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  getMovieById: (id: string) => movies.find((m) => m.id === id),

  addMovie: (movie: Omit<Movie, "id" | "createdAt">) => {
    const newMovie: Movie = {
      ...movie,
      id:
        movies.length > 0
          ? String(Number(movies[movies.length - 1].id) + 1)
          : "1",
      createdAt: new Date().toISOString(),
    };
    movies.push(newMovie);
    return newMovie;
  },

  updateMovie: (id: string, updates: Partial<Movie>) => {
    const idx = movies.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    movies[idx] = { ...movies[idx], ...updates };
    return movies[idx];
  },

  deleteMovie: (id: string) => {
    const idx = movies.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    movies.splice(idx, 1);
    return true;
  },

  // Bookmarks
  getBookmarks: (userId: string) =>
    bookmarks.filter((b) => b.userId === userId),
  getBookmark: (userId: string, movieId: string) =>
    bookmarks.find((b) => b.userId === userId && b.movieId === movieId),
  addBookmark: (userId: string, movieId: string) => {
    if (db.getBookmark(userId, movieId)) return null;
    const bookmark: Bookmark = {
      id: String(Date.now()),
      userId,
      movieId,
      createdAt: new Date().toISOString(),
    };
    bookmarks.push(bookmark);
    return bookmark;
  },
  removeBookmark: (userId: string, movieId: string) => {
    const idx = bookmarks.findIndex(
      (b) => b.userId === userId && b.movieId === movieId,
    );
    if (idx === -1) return false;
    bookmarks.splice(idx, 1);
    return true;
  },
};
