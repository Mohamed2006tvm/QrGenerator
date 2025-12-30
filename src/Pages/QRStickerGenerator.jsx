import { useState, useRef } from "react"
import QRCode from "qrcode"
import html2canvas from "html2canvas"
import { qrStickerTemplates } from "../data/qrStickerTemplates"

export default function QRStickerGenerator() {
  const [shopName, setShopName] = useState("")
  const [shopLink, setShopLink] = useState("")
  const [tagline, setTagline] = useState("")
  const [qrSize, setQrSize] = useState(250) // bigger for better download
  const [fontSize, setFontSize] = useState(24)
  const [shopColor, setShopColor] = useState("#ffffff")
  const [taglineColor, setTaglineColor] = useState("#ffffff")
  const [scanText, setScanText] = useState("Scan & Pay")
  const [showScanText, setShowScanText] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState(qrStickerTemplates[0])
  const [qr, setQr] = useState("")
  const stickerRef = useRef()

  const generateQR = async () => {
    if (!shopName || !shopLink) return
    const url = await QRCode.toDataURL(shopLink, { width: qrSize })
    setQr(url)
  }

  const downloadSticker = async () => {
    // Use larger scale for high-quality download
    const canvas = await html2canvas(stickerRef.current, { scale: 2 })
    const link = document.createElement("a")
    link.download = "shop-qr-sticker.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 px-6 py-24">
        
      <h1 className="text-center text-4xl font-bold text-white mb-10">
        High-Quality QR Sticker Generator
      </h1>

      {/* Template Selector */}
      <div className="mx-auto mb-8 flex max-w-5xl flex-wrap justify-center gap-4">
        {qrStickerTemplates.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedTemplate.id === t.id
                ? "bg-white text-black"
                : "bg-white/20 text-white"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="mx-auto max-w-md mb-8 space-y-4">
        <input
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-white placeholder-white/60 outline-none"
        />
        <input
          placeholder="Shop Link (URL)"
          value={shopLink}
          onChange={(e) => setShopLink(e.target.value)}
          className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-white placeholder-white/60 outline-none"
        />
        <input
          placeholder="Tagline / Subtitle (Optional)"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-white placeholder-white/60 outline-none"
        />
        <input
          placeholder="Scan Text (e.g., Scan & Pay)"
          value={scanText}
          onChange={(e) => setScanText(e.target.value)}
          className="w-full rounded-full border border-white/30 bg-transparent px-5 py-3 text-white placeholder-white/60 outline-none"
        />
        <div className="flex items-center gap-2 text-white text-sm">
          <input
            type="checkbox"
            checked={showScanText}
            onChange={() => setShowScanText(!showScanText)}
          />
          Show Scan Text
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            type="number"
            placeholder="QR Size"
            value={qrSize}
            onChange={(e) => setQrSize(Number(e.target.value))}
            className="w-1/2 rounded-full border border-white/30 bg-transparent px-3 py-2 text-white placeholder-white/60 outline-none"
          />
          <input
            type="number"
            placeholder="Shop Font Size"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-1/2 rounded-full border border-white/30 bg-transparent px-3 py-2 text-white placeholder-white/60 outline-none"
          />
          <input
            type="color"
            value={shopColor}
            onChange={(e) => setShopColor(e.target.value)}
            className="w-1/2 h-10 rounded-full p-0 border-none"
          />
          <input
            type="color"
            value={taglineColor}
            onChange={(e) => setTaglineColor(e.target.value)}
            className="w-1/2 h-10 rounded-full p-0 border-none"
          />
          <input
            type="color"
            value={selectedTemplate.bg}
            onChange={(e) =>
              setSelectedTemplate({ ...selectedTemplate, bg: e.target.value })
            }
            className="w-1/2 h-10 rounded-full p-0 border-none"
          />
        </div>

        <button
          onClick={generateQR}
          className="mt-4 w-full rounded-full bg-white py-3 font-semibold text-black hover:bg-black hover:text-white transition"
        >
          Generate Sticker
        </button>
      </div>

      {/* Sticker Preview */}
      {qr && (
        <div className="flex flex-col items-center gap-6">
          <div
            ref={stickerRef}
            className="w-[500px] p-8 rounded-3xl text-center shadow-2xl"
            style={{
              background: selectedTemplate.bg,
              borderRadius: "24px",
            }}
          >
            {showScanText && (
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: shopColor }}
              >
                {scanText}
              </h2>
            )}
            <img
              src={qr}
              alt="QR"
              style={{ width: qrSize, height: qrSize }}
              className="mx-auto mb-4 bg-white p-2 rounded-xl"
            />
            <p
              style={{ fontSize, color: shopColor, fontWeight: "bold" }}
            >
              {shopName}
            </p>
            {tagline && (
              <p style={{ color: taglineColor, marginTop: "4px" }}>{tagline}</p>
            )}
          </div>

          <button
            onClick={downloadSticker}
            className="rounded-full border border-white px-6 py-2 text-white hover:bg-white hover:text-black transition"
          >
            Download Sticker
          </button>
        </div>
      )}
    </div>
  )
}
