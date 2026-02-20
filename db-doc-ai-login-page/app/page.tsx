// "use client";

// import { useState, useEffect } from "react";

// import { useRouter } from "next/navigation";
// import { Lock, Mail, ArrowRight } from "lucide-react";

// export default function LoginPage() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [particles, setParticles] = useState<any[]>([]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       router.push("/dashboard");
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#001a33] via-[#000a15] to-[#0a0015] relative">
//       {/* Animated background particles */}
//       {/* <div className="absolute inset-0 overflow-hidden">
//         {[...Array(50)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               width: `${Math.random() * 3 + 1}px`,
//               height: `${Math.random() * 3 + 1}px`,
//               backgroundColor: ["#00d4ff", "#7c3aed", "#00ff88"].at(
//                 Math.floor(Math.random() * 3),
//               ),
//               opacity: Math.random() * 0.5 + 0.2,
//               animation: `float ${Math.random() * 4 + 4}s infinite`,
//             }}
//           />
//         ))}
//       </div> */}

//       {/* Gradient orbs - Responsive sizes */}
//       <div className="absolute -top-40 -right-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
//       <div className="absolute -bottom-40 -left-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-violet-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000" />

//       {/* Main content */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <div className="w-full max-w-sm sm:max-w-md">
//           {/* Glass morphism card - Enhanced */}
//           <div className="glass-effect-dark rounded-3xl p-6 sm:p-8 shadow-2xl animate-slide-in-up transform hover:scale-105 transition-all duration-300">
//             {/* Header */}
//             <div className="mb-6 sm:mb-8 animate-slide-in-left">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center animate-glow-pulse transform hover:scale-110 transition-transform">
//                   <span className="text-white font-bold text-lg">▧</span>
//                 </div>
//                 <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
//                   DB-DOC-AI
//                 </h1>
//               </div>
//               <p className="text-xs sm:text-sm text-gray-400">
//                 AI-Powered Data Intelligence Platform
//               </p>
//             </div>

//             {/* Subtitle */}
//             <div
//               className="mb-6 sm:mb-8 animate-slide-in-left"
//               style={{ animationDelay: "100ms" }}
//             >
//               <h2 className="text-base sm:text-lg text-gray-200 font-semibold mb-2">
//                 Welcome Back
//               </h2>
//               <p className="text-xs sm:text-sm text-gray-500">
//                 Sign in to access your intelligent data insights
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4">
//               {/* Email input */}
//               <div
//                 className="animate-slide-in-up"
//                 style={{ animationDelay: "150ms" }}
//               >
//                 <label
//                   htmlFor="email"
//                   className="block text-xs sm:text-sm font-medium text-gray-300 mb-2"
//                 >
//                   Email Address
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300" />
//                   <div className="relative flex items-center">
//                     <Mail className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-cyan-400 transition" />
//                     <input
//                       id="email"
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/15 focus:ring-2 focus:ring-cyan-500/30 transition hover:bg-white/15"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Password input */}
//               <div
//                 className="animate-slide-in-up"
//                 style={{ animationDelay: "200ms" }}
//               >
//                 <label
//                   htmlFor="password"
//                   className="block text-xs sm:text-sm font-medium text-gray-300 mb-2"
//                 >
//                   Password
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300" />
//                   <div className="relative flex items-center">
//                     <Lock className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-violet-400 transition" />
//                     <input
//                       id="password"
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/15 focus:ring-2 focus:ring-violet-500/30 transition hover:bg-white/15"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Remember & Forgot */}
//               <div
//                 className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs sm:text-sm animate-slide-in-up"
//                 style={{ animationDelay: "250ms" }}
//               >
//                 <label className="flex items-center gap-2 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 rounded border border-white/20 bg-white/10 accent-cyan-500 cursor-pointer"
//                   />
//                   <span className="text-gray-400 group-hover:text-gray-300 transition">
//                     Remember me
//                   </span>
//                 </label>
//                 <a
//                   href="#"
//                   className="text-cyan-400 hover:text-cyan-300 transition font-medium"
//                 >
//                   Forgot password?
//                 </a>
//               </div>

//               {/* Submit button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full mt-6 sm:mt-8 relative group animate-slide-in-up"
//                 style={{ animationDelay: "300ms" }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-xl blur group-hover:blur-md opacity-75 group-hover:opacity-100 transition duration-300 group-disabled:opacity-50" />
//                 <div className="relative flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-semibold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/50 transition group-disabled:opacity-70">
//                   {isLoading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       <span>Signing in...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Sign In</span>
//                       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
//                     </>
//                   )}
//                 </div>
//               </button>
//             </form>

//             {/* Divider */}
//             <div
//               className="my-6 sm:my-8 flex items-center gap-3 animate-slide-in-up"
//               style={{ animationDelay: "350ms" }}
//             >
//               <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//               <span className="text-xs text-gray-500">OR</span>
//               <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//             </div>

//             {/* OAuth buttons */}
//             <div
//               className="grid grid-cols-2 gap-3 animate-slide-in-up"
//               style={{ animationDelay: "400ms" }}
//             >
//               {["Google", "GitHub"].map((provider) => (
//                 <button
//                   key={provider}
//                   type="button"
//                   className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:bg-white/15 hover:border-cyan-500/30 hover:text-white transition text-xs sm:text-sm font-medium group"
//                 >
//                   <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 group-hover:scale-110 transition-transform" />
//                   <span className="hidden sm:inline">{provider}</span>
//                   <span className="sm:hidden">{provider.split("")[0]}</span>
//                 </button>
//               ))}
//             </div>

//             {/* Footer */}
//             <div
//               className="mt-6 sm:mt-8 text-center animate-slide-in-up"
//               style={{ animationDelay: "450ms" }}
//             >
//               <p className="text-xs sm:text-sm text-gray-500">
//                 New to DB-DOC-AI?{" "}
//                 <a
//                   href="#"
//                   className="text-cyan-400 hover:text-cyan-300 font-medium transition"
//                 >
//                   Create an account
//                 </a>
//               </p>
//             </div>
//           </div>

//           {/* Bottom info */}
//           <div
//             className="mt-8 text-center text-xs sm:text-xs text-gray-600 animate-slide-in-up"
//             style={{ animationDelay: "500ms" }}
//           >
//             <p className="px-2">Enterprise-grade security · Privacy focused</p>
//           </div>
//         </div>
//       </div>

//       {/* CSS animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) translateX(0px);
//             opacity: 0.2;
//           }
//           25% {
//             transform: translateY(-20px) translateX(10px);
//             opacity: 0.4;
//           }
//           50% {
//             transform: translateY(-40px) translateX(-10px);
//             opacity: 0.3;
//           }
//           75% {
//             transform: translateY(-20px) translateX(15px);
//             opacity: 0.5;
//           }
//         }

//         @keyframes blob {
//           0%,
//           100% {
//             transform: translate(0, 0) scale(1);
//           }
//           25% {
//             transform: translate(20px, -50px) scale(1.1);
//           }
//           50% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           75% {
//             transform: translate(50px, 50px) scale(1.05);
//           }
//         }

//         .animate-blob {
//           animation: blob 7s infinite;
//         }

//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }

//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [particles, setParticles] = useState<any[]>([]);

  // ✅ Hydration Safe Particles
  useEffect(() => {
    const generatedParticles = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      color: ["#00d4ff", "#7c3aed", "#00ff88"][Math.floor(Math.random() * 3)],
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 4 + 4,
    }));

    setParticles(generatedParticles);
  }, []);

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
      {/* ✅ Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* ✅ Neon Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 10px ${particle.color}`,
              animation: `float ${particle.duration}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ✅ Gradient Orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-10 animate-blob animation-delay-2000" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="glass-effect-dark rounded-3xl p-8 shadow-2xl animate-slide-in-up">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center animate-glow-pulse">
                  <span className="text-white font-bold text-lg">▧</span>
                </div>

                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                  DB-DOC-AI
                </h1>
              </div>

              <p className="text-sm text-gray-400">
                AI-Powered Data Intelligence Platform
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/30 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/30 transition"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition" />

                <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .cyber-grid {
          background-image:
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}
