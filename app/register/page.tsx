"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ===============================
  // 🔐 Email + Password Register
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields",
        background: "#0b0f1a",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters",
        background: "#0b0f1a",
        color: "#fff",
        confirmButtonColor: "#06b6d4",
      });
      return;
    }

    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await Swal.fire({
        icon: "success",
        title: "Account Created 🎉",
        text: "Welcome aboard!",
        background: "#0b0f1a",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
        background: "#0b0f1a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================
  // 🔵 Google Sign-In
  // ===============================
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);

      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);

      await Swal.fire({
        icon: "success",
        title: "Welcome 🎉",
        text: `Signed in as ${result.user.displayName}`,
        background: "#0b0f1a",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/dashboard");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: error.message,
        background: "#0b0f1a",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#001a33] via-[#000a15] to-[#0a0015] relative">
            {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: ["#00d4ff", "#7c3aed", "#00ff88"][
                Math.floor(Math.random() * 3)
              ],
              opacity: Math.random() * 0.5 + 0.2,
              animation: `float ${Math.random() * 6 + 6}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
            {/* Gradient orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-bl from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-violet-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="glass-effect-dark rounded-3xl p-8 shadow-2xl">
            
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>

            {/* Heading */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-semibold text-white">
                Create Account
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Start your intelligent data journey 🚀
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-300">Full Name</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-300">Email</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/40"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-300">Password</label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/40"
                  />
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 relative group"
              >
                <div className="relative flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-medium">
                  {isLoading ? "Processing..." : "Register"}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500">OR SIGN UP WITH</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:bg-white/15 hover:border-cyan-500/40 hover:text-white transition text-sm font-medium"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <span
                  onClick={() => router.push("/")}
                  className="text-cyan-400 cursor-pointer hover:text-cyan-300"
                >
                  Sign In
                </span>
              </p>
            </div>

          </div>
          
        </div>

      </div>
      <style jsx>{`
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-40px);
      opacity: 0.7;
    }
  }

  @keyframes blob {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    50% {
      transform: translate(40px, -40px) scale(1.1);
    }
  }

  .animate-blob {
    animation: blob 10s infinite ease-in-out;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }
`}</style>
    </div>
  );
}