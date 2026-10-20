import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "../pages/HomePage";
import { CasesPage } from "../pages/CasesPage";
import { CaseDetailPage } from "../pages/CaseDetailPage";
import { ServicesPage } from "../pages/ServicesPage";
import { SolutionsPage } from "../pages/SolutionsPage";
import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { NotFoundPage } from "../pages/NotFoundPage";
const createRouter =
  import.meta.env.MODE === "github-pages"
    ? createHashRouter
    : createBrowserRouter;
export const router = createRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/solutions", element: <SolutionsPage /> },
      { path: "/cases", element: <CasesPage /> },
      { path: "/cases/:slug", element: <CaseDetailPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
