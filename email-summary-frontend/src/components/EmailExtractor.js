"use client"; 

import React, { useState } from "react";
import { Send, Sparkles, Mail, User, FileText, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";

// API call function
const extractEmailAPI = async ({ model, text }) => {
const res = await fetch(
  "https://tasks-4un2.vercel.app/api/extract-email-details",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, text }),
  }
);
  if (!res.ok) throw new Error("Failed to extract email details");
  return res.json();
};

export default function EmailExtractor() {
  const [model, setModel] = useState("openai");
  const [emailText, setEmailText] = useState("");
  const [localError, setLocalError] = useState(""); 

  // TanStack Query mutation
  const mutation = useMutation({
    mutationFn: extractEmailAPI,
   });

const handleExtract = () => {
  console.log("Email Text Before Validation:", emailText); 

  if (!emailText.trim()) {
    setLocalError("Please enter email content to extract");
    console.log("Validation failed: empty email text"); 
    return;
  }

  setLocalError(""); 
  console.log("Calling mutation with:", { model, text: emailText }); 

  mutation.mutate({ model, text: emailText });
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-blue-900/30 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-cyan-400" />
          <span className="text-2xl font-bold">
            Email<span className="text-cyan-400">AI</span>
          </span>
        </div>
        <div className="flex items-center space-x-6 text-sm">
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Simple AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Email Summary
            </span>
          </h1>
        </div>

        {/* Model Selection */}
        <div className="max-w-4xl mx-auto mb-8 flex items-center justify-center space-x-4">
          <button
            onClick={() => setModel("openai")}
            className={`px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
              model === "openai"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50"
                : "bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>OpenAI GPT</span>
            </div>
          </button>
          <button
            onClick={() => setModel("gemini")}
            className={`px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
              model === "gemini"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50"
                : "bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50"
            }`}
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Google Gemini</span>
            </div>
          </button>
        </div>

        {/* Email Input */}
        <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-blue-900/30 rounded-2xl p-8 shadow-2xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Email Content</label>
            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              placeholder="Paste your email content here..."
              className="w-full h-48 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
          </div>

          {/* Local input error */}
          {localError && (
            <Alert className="bg-red-900/20 border-red-500/50 text-red-300">
              <AlertDescription>{localError}</AlertDescription>
            </Alert>
          )}

          {/* Mutation error */}
          {mutation.isError && (
            <Alert className="bg-red-900/20 border-red-500/50 text-red-300">
              <AlertDescription>{mutation.error.message}</AlertDescription>
            </Alert>
          )}

          {/* Extract Button */}
          <button
            onClick={handleExtract}
            disabled={mutation.isLoading}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30"
          >
            <div className="flex items-center justify-center space-x-2">
              {mutation.isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Extract Email Details</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Results */}
        {mutation.data && (
          <div className="mt-8 space-y-4 animate-fade-in max-w-4xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-900/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-cyan-400">Sender Information</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-gray-400 min-w-20">Name:</span>
                  <span className="text-white font-medium">{mutation.data.name || "N/A"}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-gray-400 mt-1" />
                  <span className="text-gray-400 min-w-16">Email:</span>
                  <span className="text-white font-medium">{mutation.data.mailFrom || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-900/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-cyan-400">Summary</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{mutation.data.summary || "No summary available"}</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
