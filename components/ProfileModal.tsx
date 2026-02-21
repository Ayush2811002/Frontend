"use client";

import { X, User, Mail } from "lucide-react";
import { auth } from "@/lib/firebase";

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const user = auth.currentUser;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <div className="glass-effect-dark w-full max-w-md rounded-2xl p-6 relative animate-slide-in-up">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold text-white mb-6">
          Profile Settings
        </h2>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <User className="text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-sm text-white">
                {user?.displayName || "Not set"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <Mail className="text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm text-white">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
