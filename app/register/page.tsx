"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#001a33] via-[#000a15] to-[#0a0015] relative">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: ["#00d4ff", "#7c3aed", "#00ff88"].at(
                Math.floor(Math.random() * 3),
              ),
              opacity: Math.random() * 0.4 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-10" />

      {/* Content */}
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
                    placeholder="Ayush Srivastava"
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

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-xl blur opacity-70 group-hover:opacity-100 transition" />

                <div className="relative flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-medium">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Register
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500">OR SIGN UP WITH</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3">
              {/* Google */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:bg-white/15 hover:border-cyan-500/40 hover:text-white transition text-sm font-medium"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                Google
              </button>

              {/* GitHub */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:bg-white/15 hover:border-cyan-500/40 hover:text-white transition text-sm font-medium"
              >
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  alt="GitHub"
                  className="w-4 h-4 invert"
                />
                GitHub
              </button>
            </div>

            {/* Footer */}
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
    </div>
  );
}
