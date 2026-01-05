import React from "react"
import { Copyright } from "lucide-react"

const Footer = () => {
  return (
    <footer className=" fixed bottom-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-6 sm:py-4 py-2 mb-4">

          <div className="flex flex-col sm:gap-3 gap-1 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

            {/* Left */}
            <p className="flex items-center justify-center gap-1 text-sm text-white/70 sm:justify-start">
              <Copyright size={14} />
              <span>QRGen. All rights reserved</span>
            </p>

            {/* Right */}
            <p className="text-sm text-white/60">
              Powered by <span className="text-white font-medium">Praxire</span>
            </p>

          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
