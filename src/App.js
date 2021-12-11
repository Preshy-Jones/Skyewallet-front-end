import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../src/components/home/Home";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-background">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
