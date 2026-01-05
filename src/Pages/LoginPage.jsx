import React from "react";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../data/supabase";
import Seo from "../components/Seo";
import { Link } from "react-router-dom";

const Login = () => {

  const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://easy-qr.praxire.com",
    },
     
    
  })

  if (error) {
    console.error(error)
    alert("Google login failed")
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[6.5rem] pb-10">
      <Seo
        title="Login — QRGen"
        description="Log in to QRGen to generate, manage, and download QR codes quickly and securely."
        path="/login"
        noIndex
      />
      
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-[0_18px_50px_rgba(0,0,0,0.45)] text-center">
        
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white">
          Welcome to QuickQR
        </h1>

        <p className="mt-2 text-sm text-white/60">
          Generate, manage & share QR codes easily
        </p>

        {/* Google Login Button */}
        <div className="mt-10">
          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-white/90 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            <FcGoogle className="text-xl bg-white rounded-full" />
            Continue with Google
          </button>
        </div>

        {/* Terms */}
        <p className="mt-6 text-xs text-white/50">
          By continuing, you agree to our
          <Link to="/terms" className="mx-1 underline cursor-pointer">Terms & Service</Link>
          &
          <Link to="/privacy" className="ml-1 underline cursor-pointer">Privacy Policy</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
