import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebase/firebaseconfig.js"; // Import your Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";
import Input from "./routes/Input";
import Homepage from "./routes/Homepage";
import Auth from "./components/Auth";

function App() {
  const [currentUser, setCurrentUser] = useState(null); // Track logged-in user
  const [loading, setLoading] = useState(true); // Show loading state while checking auth

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Stop loading once the state is determined
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  function PrivateRoute({ children }) {
    return currentUser ? children : <Navigate to="/auth" />;
  }

  if (loading) {
    // Render a loader or null while checking authentication state
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute><Homepage /></PrivateRoute>} />
        <Route path="/input" element={<PrivateRoute><Input /></PrivateRoute>} />
        <Route path="/auth" element={currentUser ? <Navigate to="/" /> : <Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
