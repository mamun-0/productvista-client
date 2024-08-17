import { createBrowserRouter, Outlet, useNavigation } from "react-router-dom";
import { Home } from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/NavBar/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import axiosCommon from "./axios/axiosCommon";

export const routers = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <>Custom Error Component</>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
        loader: async ({ params }) =>
          axiosCommon().get(`/products/${params.id}`),
      },
    ],
  },
]);

function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
