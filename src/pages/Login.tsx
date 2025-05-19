import React, { useState } from "react";
import { auth, googleProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  // Email/Password Sign-Up
  const handleEmailSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null);
      navigate("/");
    } catch (err) {
      setError((err as AuthError).message);
    }
  };

  // Email/Password Sign-In
  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      navigate("/");
    } catch (err) {
      setError((err as AuthError).message);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError(null);
      navigate("/");
    } catch (err) {
      setError((err as AuthError).message);
    }
  };

  // Phone Sign-In - Step 1: Send Code
  const handlePhoneSignIn = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      const result = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      setConfirmationResult(result);
      setError(null);
    } catch (err) {
      setError((err as AuthError).message);
    }
  };

  // Phone Sign-In - Step 2: Verify Code
  const handleVerifyCode = async () => {
    try {
      await confirmationResult.confirm(code);
      setError(null);
      navigate("/");
    } catch (err) {
      setError((err as AuthError).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Email/Password */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleEmailSignIn}
            className="bg-blue-500 text-white p-2 rounded w-full mb-2"
          >
            Sign In with Email
          </button>
          <button
            onClick={handleEmailSignUp}
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            Sign Up with Email
          </button>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white p-2 rounded w-full mb-4"
        >
          Sign In with Google
        </button>

        {/* Phone */}
        <div className="mb-4">
          <input
            type="tel"
            placeholder="Phone Number (+1234567890)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <button
            onClick={handlePhoneSignIn}
            className="bg-yellow-500 text-white p-2 rounded w-full"
          >
            Send Code
          </button>
          <div id="recaptcha-container"></div>
          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Enter Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border p-2 rounded w-full mb-2 mt-2"
              />
              <button
                onClick={handleVerifyCode}
                className="bg-purple-500 text-white p-2 rounded w-full"
              >
                Verify Code
              </button>
            </>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;