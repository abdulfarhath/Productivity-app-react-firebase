import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebaseconfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [isSignup, setIsSignup] = useState(true); // Toggle between Signup and Login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User registered:", userCredential.user);
            // alert("Signup successful!");
            navigate('/'); // Redirect to homepage
        } catch (err) {
            console.error("Error during signup:", err.message);
            setError(err.message);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
            // alert("Login successful!");
            navigate('/'); // Redirect to homepage
        } catch (err) {
            console.error("Error during login:", err.message);
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google login successful:", result.user);
            // alert("Google login successful!");
            navigate('/'); // Redirect to homepage
        } catch (err) {
            console.error("Google login error:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className="loginpage flex justify-center items-center h-screen bg-gray-100">
            <form 
                className="p-6 bg-white shadow-lg rounded-lg w-80"
                onSubmit={isSignup ? handleSignup : handleLogin}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isSignup ? "Signup" : "Login"}
                </h2>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="Email" 
                    className="w-full mb-4 p-2 border rounded" 
                />
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="Password" 
                    className="w-full mb-4 p-2 border rounded" 
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {isSignup ? "Signup" : "Login"}
                </button>
                <button 
                    onClick={handleGoogleLogin} 
                    type="button"
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-4"
                >
                    Sign in with Google
                </button>
                <p 
                    className="text-center text-sm mt-4 cursor-pointer text-blue-500"
                    onClick={() => setIsSignup(!isSignup)}
                >
                    {isSignup 
                        ? "Already have an account? Login" 
                        : "Don't have an account? Signup"}
                </p>
            </form>
        </div>
    );
}
