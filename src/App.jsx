import { RouterProvider } from "react-router-dom";
import useAppRoutes from "./configs/routes";
import { ToastContainer } from "react-toastify";

function App() {
  const routes = useAppRoutes();
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
