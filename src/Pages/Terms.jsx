import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    const timeout = setTimeout(() => {
      navigate("/")
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center text-center
        text-gray-200
        bg-[radial-gradient(1200px_700px_at_20%_0%,rgba(255,255,255,0.07),transparent_55%),radial-gradient(900px_600px_at_80%_30%,rgba(255,255,255,0.05),transparent_60%),linear-gradient(180deg,#0b0d10_0%,#07090c_100%)]
      "
    >
      <h1
        className="
          text-[120px] font-extrabold tracking-widest
          bg-gradient-to-b from-white to-gray-400
          bg-clip-text text-transparent
        "
      >
        404
      </h1>

      <h2 className="mt-2 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-3 text-sm text-gray-400 leading-relaxed">
        The page you’re looking for doesn’t exist or was moved.
        <br />
        Redirecting to home in{" "}
        <span className="font-semibold text-gray-200">
          {seconds > 0 ? seconds : 0}
        </span>{" "}
        seconds…
      </p>

      <button
        onClick={() => navigate("/")}
        className="
          mt-6 px-7 py-3 rounded-full
          bg-gray-100 text-gray-900 font-semibold
          transition-all duration-200
          hover:bg-white hover:-translate-y-0.5
        "
      >
        Go Home Now
      </button>
    </div>
  )
}

export default NotFound
