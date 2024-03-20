import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import { getMovieByIMDBID, getMovies } from "@/api/movieSdk.ts";
import Movie from "@/pages/Movie.tsx";
import { MovieData } from "@/types";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <div>error</div>,
      loader: () => getMovies(),
    },
    {
      path: ":movie",
      element: <Movie />,
      loader: async ({ params }): Promise<MovieData> =>
        getMovieByIMDBID(params.movie as `${"tt"}${number}`),
    },
  ]);

  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
};
export default App;
