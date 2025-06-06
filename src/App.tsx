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
import ProfileAndSettings from "./components/ProfileAndSettings";
import UserUpdateProvider from "./contexts/UserUpdateProvider";
import UserUpdateNotificationProvider from "./contexts/UserUpdateNotificationProvider";
import UserFollowRequestNotificationProvider from "./contexts/UserFollowRequestNotificationProvider";

function App() {
  useEffect(() => {
    getInitialThemeAndSet();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <UserUpdateProvider>
          <UserUpdateNotificationProvider>
            <UserFollowRequestNotificationProvider>
              <Router>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/user/:username" element={<UserProfile />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/social" element={<Social />} />
                    <Route path="/profile" element={<ProfileAndSettings />} />
                  </Route>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </Router>
            </UserFollowRequestNotificationProvider>
          </UserUpdateNotificationProvider>
        </UserUpdateProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
