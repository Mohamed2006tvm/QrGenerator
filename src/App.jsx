import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./Pages/LoginPage"
import QrGenerator from "./Pages/QrGenerator" // your existing QR page
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<QrGenerator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
      </Routes>
    </BrowserRouter>
  )
}
