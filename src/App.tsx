import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/components/organisms/Home.tsx";
import Movie from "@/components/organisms/Movie.tsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <div>error</div>,
    },
    {
      path: ":imdbID",
      element: <Movie />,
      errorElement: <div>error</div>,
    },
  ]);

  return (
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  );
};
export default App;
