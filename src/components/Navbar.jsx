import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Logout from "../Pages/Logout"
import { supabase } from "../data/supabase"

const Navbar = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (!error) {
        setUser(data.user)
      }
    }
    getUser()
  }, [])

  const avatar = user?.user_metadata?.picture

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

          {/* Auth */}
          <div className="flex items-center gap-3">
            {avatar && (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-9 h-9 rounded-full border border-white/15"
              />
            )}

            {user ? (
              <Logout />
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/15 transition"
              >
                Login
              </Link>
            )}



          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar

