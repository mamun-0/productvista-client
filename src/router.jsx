import { createBrowserRouter, Outlet, useNavigation } from "react-router-dom";
import { Home } from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/NavBar/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import axiosCommon from "./axios/axiosCommon";
import { Footer } from "./components/Footer/Footer";

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
  const { state } = useNavigation();
  return (
    <>
      <Navbar />
      {state === "loading" ? (
        <div style={{ minHeight: "80vh" }}>Loading...</div>
      ) : (
        <div style={{ minHeight: "80vh" }}>{<Outlet />}</div>
      )}
      <Footer />
    </>
  );
}
