import { useState } from "react"
import QRCode from "qrcode"

export default function App() {
  const [text, setText] = useState("")
  const [qr, setQr] = useState("")

  const generateQrCode = async () => {
    if (!text) return
    const url = await QRCode.toDataURL(text, {
      width: 200,
      margin: 2,
    })
    setQr(url)
  }

  const downloadQrCode = () => {
    const link = document.createElement("a")
    link.href = qr
    link.download = "qr-code.png"
    link.click()
  }

  return (
    <div className="min-h-screen w-full py-16 bg-blue-400">
      <div className="w-[80vw] mx-auto flex flex-wrap items-center text-center">

        {/* Header */}
        <div className="w-full mb-10">
          <h1 className="text-white text-3xl font-bold">
            QR Code Generator
          </h1>
          <p className="text-white mt-2">
            Thank You For Choosing Us,...
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full md:w-1/2 mt-6">
          <div className="mx-auto h-[220px] w-[240px] rounded-2xl border border-gray-400 backdrop-blur-[100px] text-white">
            <h1 className="text-sm font-semibold mt-4">
              QR Code Generator
            </h1>

            <div className="mt-4 text-xs">
              <h3>Enter Your URL :</h3>

              <input
                type="text"
                placeholder="Enter Text or URL"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-3 w-[80%] rounded-full border border-white/20 bg-transparent px-3 py-1 text-white placeholder-white outline-none"
              />

              <br />

              <button
                onClick={generateQrCode}
                className="mt-3 w-[80%] rounded-full border border-black bg-white py-1 text-black transition hover:bg-black hover:text-white hover:border-white"
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="w-full md:w-1/2 mt-6">
          <div className="mx-auto h-[220px] w-[240px] rounded-2xl border border-gray-400 backdrop-blur-[100px] text-white">
            <h1 className="text-sm font-semibold mt-4">Code</h1>

            <div className="mt-4 flex flex-col items-center justify-center gap-3">
              {qr && (
                <>
                  <img src={qr} alt="QR Code" className="w-[120px]" />

                  <button
                    onClick={downloadQrCode}
                    className="rounded-full border border-white px-4 py-1 text-xs hover:bg-white hover:text-black transition"
                  >
                    Download QR
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
