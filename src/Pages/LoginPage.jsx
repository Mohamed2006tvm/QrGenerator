import React from "react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../data/supabase";

const Login = () => {

  const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://easy-qr.online",
    },
  })

  if (error) {
    console.error(error)
    alert("Google login failed")
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center px-4">
      
      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl text-center">
        
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white">
          Welcome to QuickQR
        </h1>

        <p className="mt-2 text-sm text-white/70">
          Generate, manage & share QR codes easily
        </p>

        {/* Google Login Button */}
        <div className="mt-10">
          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-white py-3 text-sm font-semibold text-black transition-all hover:scale-[1.03] hover:bg-black hover:text-white"
          >
            <FcGoogle className="text-xl bg-white rounded-full" />
            Continue with Google
          </button>
        </div>

        {/* Terms */}
        <p className="mt-6 text-xs text-white/60">
          By continuing, you agree to our
          <span className="mx-1 underline cursor-pointer">Terms</span>
          &
          <span className="ml-1 underline cursor-pointer">Privacy Policy</span>
        </p>

      </div>
    </div>
  );
};

export default Login;
