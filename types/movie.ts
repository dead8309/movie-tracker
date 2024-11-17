export type Movie = {
  id: number;
  title: string;
  Description: string;
  poster_url: string;
  type: "movie" | "show";
};

export type MovieDetails = {
  id: number;
  title: string;
  type: Movie["type"];
  description: string;
  poster_url: string;
  rating: number;
  release_date: string;
  genre: string[];
};

export type MyListMovieDetails = {
  movieId: number;
  title: string;
  poster_url: string;
  updatedAt: string;
};

export type TMyList = {
  "To Watch": MyListMovieDetails[];
  Watched: MyListMovieDetails[];
};
