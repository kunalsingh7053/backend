import React, {  lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// ✅ Lazy loaded pages
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const Profile = lazy(() => import("../pages/Profile"));
const UpdateProfile = lazy(() => import("../pages/UpdateProfile"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
  
        <Routes> 
          {/* ✅ Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          >
            <Route
              path="update"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
