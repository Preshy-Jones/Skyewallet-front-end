import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import Home from "../src/components/home/Home";
import NavBar from "./components/Navbar/NavBar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Transaction from "./components/transactions/Transaction";
import { UserContext } from "./components/UserContext";

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={value}>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
