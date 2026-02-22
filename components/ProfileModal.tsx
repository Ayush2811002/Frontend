"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Phone, ShieldCheck, CheckCircle2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { updateProfile, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(auth.currentUser?.displayName || "");
  const [phone, setPhone] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // We use the UID to create a unique key: e.g., "phone_user_123"
  const storageKey = auth.currentUser ? `phone_${auth.currentUser.uid}` : null;

  useEffect(() => {
    // 1. If user logs out while modal is open, clear state and storage
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Clear all local storage phone numbers if you want total cleanup on logout
        // Or just clear the specific one:
        if (storageKey) localStorage.removeItem(storageKey);
        setPhone("");
        onClose(); // Close modal on logout for security
      }
    });

    // 2. Load the number specifically for THIS logged-in user
    if (storageKey) {
      const savedPhone = localStorage.getItem(storageKey);
      setPhone(savedPhone || "");
    }

    return () => unsubscribe();
  }, [storageKey, onClose]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (storageKey) {
      localStorage.setItem(storageKey, val);
    }
  };

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name });
      setIsEditing(false);
      setMessage("Profile updated!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (auth.currentUser?.email) {
      try {
        await sendPasswordResetEmail(auth, auth.currentUser.email);
        setMessage("Reset email sent!");
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 text-left font-sans">
      <div className="glass-effect-dark w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 relative animate-slide-in-up shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Account Settings</h2>
            {message && (
              <p className="text-cyan-400 text-[11px] mt-1 flex items-center gap-1">
                <CheckCircle2 size={12}/> {message}
              </p>
            )}
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Section: Profile */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Profile Details</p>
            <div className="space-y-2">
              
              {/* Name Box */}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-cyan-500/10 rounded-lg"><User size={18} className="text-cyan-400" /></div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400">Display Name</p>
                    {isEditing ? (
                      <input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="bg-transparent text-sm font-medium text-white border-b border-cyan-500 outline-none w-full"
                        autoFocus
                      />
                    ) : (
                      <p className="text-sm font-medium text-white">{name || "Not set"}</p>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
                  className="text-xs text-cyan-400 hover:underline ml-2"
                >
                  {loading ? "..." : isEditing ? "Save" : "Edit"}
                </button>
              </div>

              {/* Email Box */}
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 opacity-60">
                <div className="p-2 bg-purple-500/10 rounded-lg"><Mail size={18} className="text-purple-400" /></div>
                <div>
                  <p className="text-[10px] text-gray-400">Email Address</p>
                  <p className="text-sm font-medium text-white">{auth.currentUser?.email}</p>
                </div>
              </div>

              {/* Phone Box */}
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group focus-within:border-emerald-500/50 transition">
                <div className="p-2 bg-emerald-500/10 rounded-lg"><Phone size={18} className="text-emerald-400" /></div>
                <div className="flex-1">
                  <p className="text-[10px] text-gray-400">Phone Number</p>
                  <input 
                    type="tel"
                    placeholder="e.g. +1 234 567 890"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="bg-transparent text-sm font-medium text-white outline-none w-full placeholder:text-gray-700"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section: Security */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Security</p>
            <button 
              onClick={handlePasswordReset}
              className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-cyan-500/10 rounded-xl transition group border border-white/5 hover:border-cyan-500/20 text-left"
            >
              <ShieldCheck size={18} className="text-gray-400 group-hover:text-cyan-400" />
              <div>
                <p className="text-sm text-gray-200 group-hover:text-white font-medium">Update Password</p>
                <p className="text-[10px] text-gray-500">A reset link will be sent to your inbox</p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-white text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}