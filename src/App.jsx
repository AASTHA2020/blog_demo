import Blogs from "./components/Blogs";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Search } from "./components/Search";
import Products from "./components/Products";
import About from "./components/About";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Contact from "./components/Contact";
import NoPage from "./components/Nopage";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import Cart from "./components/Cart";
import Profile from "./components/Profile";

function App() {
  const [user, setUser] = useState(null);

  const MainLayout = ({ children }) => (
    <div className="bg-gray-100">
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
        <Search />
        <Navbar />
      </div>
      <main className="pt-2 pb-20 min-h-screen ">{children}</main>
      <div
        style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1000 }}
      >
        <Footer />
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      {!user && (
        <div className="bg-gray-100">
           <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/home" element={ <MainLayout><Home /></MainLayout> } />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
        <Route path="/*" element={<MainLayout><NoPage /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        // in App.jsx or wherever your Routes are set
<Route path="/cart" element={<Cart />} />


        </Routes>       
        </div>
   
      )}
      {user && (
        <>
        <Routes>
        <Route path="/home" element={ <MainLayout><Home /></MainLayout> } />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
        <Route path="/*" element={<MainLayout><NoPage /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path = "/login" element= {<Login/>} />
        // in App.jsx or wherever your Routes are set
<Route path="/cart" element={<Cart />} />

      </Routes>
      </>
      )}
    </BrowserRouter>
  );
}

export default App;
