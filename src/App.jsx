import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/LoginPage"
import QrGenerator from "./Pages/QrGenerator" // your existing QR page
import QRStickerGenerator from "./Pages/QRStickerGenerator"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<QrGenerator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/QRStickerGenerator" element={<QRStickerGenerator />} />
      </Routes>
    </BrowserRouter>
  )
}
