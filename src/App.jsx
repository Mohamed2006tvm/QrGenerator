import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./Pages/LoginPage"
import QrGenerator from "./Pages/QrGenerator" // your existing QR page
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'
import { supabase } from "./data/supabase"
import {useState,useEffect, createContext } from "react"

export const userData = createContext()

export default function App() {


  const [user, setUser] = useState(null)

  useEffect(() => {
    // initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    // listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (

    <userData.Provider value={{user}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<QrGenerator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </BrowserRouter>
    </userData.Provider>
  )
}
