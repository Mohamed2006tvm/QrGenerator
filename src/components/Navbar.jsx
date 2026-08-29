import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">

          {/* Logo */}
          <h1 className="text-lg font-bold text-white tracking-wide">
            QR<span className="text-zinc-300">Gen</span>
          </h1>
          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-white/70">
            <Link to="/" className="hover:text-white transition">Home</Link>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar

