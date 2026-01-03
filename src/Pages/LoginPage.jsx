import React, { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-white text-center">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-white/70 text-sm">
          Login to continue generating QR codes
        </p>

        {/* Form */}
        <div className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white placeholder-white/60 outline-none focus:border-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white placeholder-white/60 outline-none focus:border-white"
          />

          <button className="w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-black hover:text-white">
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/70">
          Don’t have an account?
          <span className="ml-1 cursor-pointer font-semibold text-white hover:underline">
            Sign Up
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login
