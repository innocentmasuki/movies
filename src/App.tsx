import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import { fetchMovieByIMDBID, fetchMovies } from "@/api/movieSdk.ts";
import Movie from "@/pages/Movie.tsx";
import { MovieData } from "@/types";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <div>error</div>,
      loader: () => fetchMovies(),
    },
    {
      path: ":movie",
      element: <Movie />,
      loader: async ({ params }): Promise<MovieData> =>
        fetchMovieByIMDBID(params.movie as `${"tt"}${number}`),
    },
  ]);

  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
};
export default App;
