import { Movie, MovieDetails, TMyList } from "@/types/movie";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function getMoviesAndShows() {
  const res = await fetch(`${API_URL}/movies/all`);
  const data = await res.json();
  return data as Movie[];
}

export async function getMovieOrShowById(id: number) {
  const res = await fetch(`${API_URL}/movies/?id=${id}`);
  const data = await res.json();
  return data as MovieDetails;
}

export async function getMyList() {
  const res = await fetch(`${API_URL}/mylist`);
  const data = await res.json();
  return data as TMyList;
}

export async function addToWatchList(movieId: number) {
  const res = await fetch(`${API_URL}/mylist/add`, {
    method: "POST",
    body: JSON.stringify({
      movieId,
      status: "To Watch",
    }),
  });
  return res.json();
}
