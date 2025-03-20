import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import SignOutPage from "../pages/SignOutPage";
import ProtectedRoute from "./ProtectedRoute";

// Lazy loading de las rutas
const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const DashboardSettings = lazy(() => import("../pages/DashboardSettings"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const AdminConfig = lazy(() => import("../pages/AdminConfig"));
const PostPage = lazy(() => import("../pages/PostPage"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <PostPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignOutPage />,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute type="protected" />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute type="admin" />,
    children: [
      {
        path: "",
        element: <AdminPage />,
      },
      {
        path: "config",
        element: <AdminConfig />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
