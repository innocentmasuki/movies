import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import { getMovieByIMDBID } from "@/api/movieSdk.ts";
import Movie from "@/pages/Movie.tsx";
import { MovieData } from "@/types";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <div>error</div>,
    },
    {
      path: ":movie",
      element: <Movie />,
      errorElement: <div>error</div>,
      loader: async ({ params }): Promise<MovieData> =>
        getMovieByIMDBID(params.movie as `${"tt"}${number}`),
    },
  ]);

  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
};
export default App;
