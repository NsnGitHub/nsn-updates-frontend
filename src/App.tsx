import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { useEffect } from "react";
import { getInitialThemeAndSet } from "./lib/toggleDarkMode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import UserProfile from "./components/UserProfile/UserProfile";
import { UserProvider } from "./contexts/UserProvider";
import Notifications from "./components/Notifications";
import Social from "./components/Social";

function App() {
  useEffect(() => {
    getInitialThemeAndSet();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/user/:username" element={<UserProfile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/social" element={<Social />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
