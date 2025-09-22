import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
const AppRoutes = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
         {/* Nested Routes for Profile */}
        <Route path="/profile" element={<Profile />}>
          <Route path="update" element={<UpdateProfile />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
