import { useState } from "react"
import QRCode from "qrcode"
import Seo from "../components/Seo"
import Footer from "../components/Footer"

export default function App() {
  const [text, setText] = useState("")
  const [qr, setQr] = useState("")
  const [loading, setLoading] = useState(false)

  const generateQrCode = async () => {
    if (!text) return
    setLoading(true)

    const url = await QRCode.toDataURL(text, {
      width: 220,
      margin: 2,
      color: {
        dark: "#111827",
        light: "#ffffff",
      },
    })

    setQr(url)
    setLoading(false)
  }

  const downloadQrCode = () => {
    const link = document.createElement("a")
    link.href = qr
    link.download = "qr-code.png"
    link.click()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-[7.5rem] md:pt-10">
      <Seo
        title="QRGen — QR Code Generator"
        description="Generate and download high-quality QR codes instantly. Create QR codes for links, text, and more."
        path="/"
      />
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            QR Code Generator
          </h1>
          <p className="text-white/70 mt-2">
            Generate & download QR codes instantly
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Input Card */}
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
            <h2 className="text-lg font-semibold mb-6">
              Enter Your Text / URL
            </h2>

            <input
              type="text"
              placeholder="https://example.com"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-black/30 px-5 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-white/25"
            />

            <button
              onClick={generateQrCode}
              className="mt-6 w-full rounded-full bg-white/90 py-3 text-sm font-semibold text-black transition hover:bg-white"
            >
              {loading ? "Generating..." : "Generate QR Code"}
            </button>
          </div>

          {/* Output Card */}
          <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center sm:mb-0 mb-30">
            <h2 className="text-lg font-semibold mb-6">
              Your QR Code
            </h2>

            {qr ? (
              <>
                <img
                  src={qr}
                  alt="QR Code"
                  className="w-[160px] rounded-xl bg-white p-2"
                />

                <button
                  onClick={downloadQrCode}
                  className="mt-6 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm transition hover:bg-white/10"
                >
                  Download PNG
                </button>
              </>
            ) : (
              <p className="text-white/60 text-sm">
                Your QR code will appear here
              </p>
            )}
          </div>

        </div>
        <Footer/>
      </div>
    </div>
  )
}
