import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routers } from "./router";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={routers} />
    <ToastContainer />
  </AuthProvider>
);
