import { useContext, useState } from "react"
import QRCode from "qrcode"
import Seo from "../components/Seo"
import Footer from "../components/Footer"
import { userData } from "../App"
import { useNavigate } from "react-router-dom"


export default function App() {
  const [text, setText] = useState("")
  const [qr, setQr] = useState("")
  const [loading, setLoading] = useState(false)
  const [logo, setLogo] = useState(null)

  const {user} = useContext(userData)
  const navigate = useNavigate()

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogo(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateQrCode = async () => {
    if (!text) return
    setLoading(true)

    try {
      // Create a temporary canvas to draw the QR and later the logo
      const canvas = document.createElement("canvas")
      const options = {
        width: 1000, // Higher resolution for better quality
        margin: 2,
        errorCorrectionLevel: 'H', // Required for logos to work
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      }

      await QRCode.toCanvas(canvas, text, options)

      if (logo) {
        const ctx = canvas.getContext("2d")
        const img = new Image()
        img.src = logo
        
        await new Promise((resolve) => {
          img.onload = () => {
            const logoSize = canvas.width * 0.22 // Slightly larger logo
            const x = (canvas.width - logoSize) / 2
            const y = (canvas.height - logoSize) / 2

            // Rounded corner background for logo
            const padding = 15
            ctx.fillStyle = "#ffffff"
            // Draw a rounded rectangle for the logo background
            const r = 10
            ctx.beginPath()
            ctx.moveTo(x - padding + r, y - padding)
            ctx.lineTo(x + logoSize + padding - r, y - padding)
            ctx.quadraticCurveTo(x + logoSize + padding, y - padding, x + logoSize + padding, y - padding + r)
            ctx.lineTo(x + logoSize + padding, y + logoSize + padding - r)
            ctx.quadraticCurveTo(x + logoSize + padding, y + logoSize + padding, x + logoSize + padding - r, y + logoSize + padding)
            ctx.lineTo(x - padding + r, y + logoSize + padding)
            ctx.quadraticCurveTo(x - padding, y + logoSize + padding, x - padding, y + logoSize + padding - r)
            ctx.lineTo(x - padding, y - padding + r)
            ctx.quadraticCurveTo(x - padding, y - padding, x - padding + r, y - padding)
            ctx.closePath()
            ctx.fill()

            ctx.drawImage(img, x, y, logoSize, logoSize)
            resolve()
          }
        })
      }

      setQr(canvas.toDataURL("image/png"))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const downloadQrCode = () => {
    
    if(!user){
      navigate('login')
      return
    }

    const link = document.createElement("a")
    link.href = qr
    link.download = "qr-code.jpg"
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

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2 text-white/70">
                Upload Business Logo (Optional)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex-1 cursor-pointer rounded-full border border-dashed border-white/20 bg-white/5 px-5 py-3 text-sm text-center transition hover:bg-white/10"
                >
                  {logo ? "Change Logo" : "Choose Image"}
                </label>
                {logo && (
                  <button
                    onClick={() => setLogo(null)}
                    className="rounded-full bg-red-500/20 p-2 text-red-500 transition hover:bg-red-500/30"
                    title="Remove logo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  </button>
                )}
              </div>
              {logo && (
                <div className="mt-3 flex items-center gap-3">
                  <img src={logo} alt="Logo preview" className="w-10 h-10 object-contain rounded border border-white/10 bg-white/5" />
                  <span className="text-xs text-white/50">Logo added to QR code</span>
                </div>
              )}
            </div>

            <button
              onClick={generateQrCode}
              className="mt-8 w-full rounded-full bg-white/90 py-3 text-sm font-semibold text-black transition hover:bg-white"
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
