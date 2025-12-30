import { useState } from "react"
import QRCode from "qrcode"

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
        dark: "#0f172a",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center px-4 pt-30 md:pt-10 ">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            QR Code Generator
          </h1>
          <p className="text-white/80 mt-2">
            Generate & download QR codes instantly 🚀
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Input Card */}
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 text-white shadow-xl">
            <h2 className="text-lg font-semibold mb-6">
              Enter Your Text / URL
            </h2>

            <input
              type="text"
              placeholder="https://example.com"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-sm text-white placeholder-white/60 outline-none focus:border-white"
            />

            <button
              onClick={generateQrCode}
              className="mt-6 w-full rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:scale-[1.03] hover:bg-black hover:text-white"
            >
              {loading ? "Generating..." : "Generate QR Code"}
            </button>
          </div>

          {/* Output Card */}
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-8 text-white shadow-xl flex flex-col items-center justify-center">
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
                  className="mt-6 rounded-full border border-white px-6 py-2 text-sm transition hover:bg-white hover:text-black"
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
      </div>
    </div>
  )
}
