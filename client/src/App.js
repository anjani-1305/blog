import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import React from 'react';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'
import BlogDetail from './componets/BlogDetail'
import ProtectedRoute from './utils/ProtectedRoute';
import UpdateBlogs from './componets/UpdateBlog';



function App() {
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/" element={<ProtectedRoute><Blogs/></ProtectedRoute>}></Route>
      <Route path="/myBlogs" element={<ProtectedRoute><UserBlogs/></ProtectedRoute>}></Route>
      <Route path="/myBlogs/:id" element={<ProtectedRoute><BlogDetail/></ProtectedRoute>}></Route>
      <Route path="/blogs/add" element={<ProtectedRoute><AddBlogs /></ProtectedRoute>} />
      <Route path="/blogs/Up" element={<UpdateBlogs/>}></Route>
    </Routes>
    </main>

  </React.Fragment>;
}

export default App;
