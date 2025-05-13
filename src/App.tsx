import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { useEffect } from "react";
import { getInitialThemeAndSet } from "./lib/toggleDarkMode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BASE_API } from "./constants/baseAPI";
import Layout from "./components/Layout";
import UserProfile from "./components/UserProfile/UserProfile";

const pingAPI = `${BASE_API}/auth/ping`;

function App() {
  useEffect(() => {
    getInitialThemeAndSet();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/user/:username" element={<UserProfile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
