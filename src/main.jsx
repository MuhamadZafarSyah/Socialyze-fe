import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/auth/LoginPage.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import PostPage from "./pages/posts/PostPage.jsx";
import CreateProfilePage from "./pages/profile/CreateProfilePage.jsx";
import CreatePostPage from "./pages/posts/CreatePostPage.jsx";
import DetailProfilePage from "./pages/profile/DetailProfilePage.jsx";
import DetailPostPage from "./pages/posts/DetailPostPage.jsx";
import SavedPage from "./pages/saved/SavedPage.jsx";
import SearchPage from "./pages/profile/SearchPage.jsx";
import FollowersPage from "./pages/follow/FollowersPage.jsx";
import FollowingPage from "./pages/follow/FollowingPage.jsx";
import { ProtectedRoute, PublicRoute } from "./middleware/AuthMiddleware.jsx";
import CreateStoriesPage from "./pages/stories/CreateStoriesPage";
import ErrorPage from "./pages/ErrorPage";

const queryClient = new QueryClient({});

const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/search",
    element: (
      <ProtectedRoute>
        <SearchPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:username",
    element: (
      <ProtectedRoute>
        <DetailProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/detail-post/:username",
    element: (
      <ProtectedRoute>
        <DetailPostPage />
      </ProtectedRoute>
    ),
  },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },

  {
    path: "/create-profile",
    element: (
      <ProtectedRoute>
        <CreateProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/posts/create",
    element: (
      <ProtectedRoute>
        <CreatePostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stories/create",
    element: (
      <ProtectedRoute>
        <CreateStoriesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:username/followers",
    element: (
      <ProtectedRoute>
        <FollowersPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:username/following",
    element: (
      <ProtectedRoute>
        <FollowingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/saved",
    element: (
      <ProtectedRoute>
        <SavedPage />
      </ProtectedRoute>
    ),
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  </Provider>,
);
