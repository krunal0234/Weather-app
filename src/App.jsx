
import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import ChooseCityoption from './components/ChooseCityoption'
import CityWeather from './components/CityWeather'
import Spinner from './components/Spinner'

function App() {
  const [coordinates, setCoordinates] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
        setLoading(false)
      },
      (error) => {
        console.error('Unable to get location:', error)
        setLoading(false)
      }
    )
  }, [])

  const navClass = ({ isActive }) =>
    `rounded-xl px-4 py-2.5 text-sm font-medium transition ${isActive
      ? 'bg-teal-300 text-slate-950 shadow-lg shadow-teal-400/10'
      : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#08131f] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed -left-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-teal-500/[0.12] blur-[130px]" />
      <div className="pointer-events-none fixed -right-40 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/[0.12] blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 -z-10 h-[350px] w-[350px] rounded-full bg-cyan-400/[0.07] blur-[120px]" />

      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#08131f]/80 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-4 sm:flex-row sm:px-8">

          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-teal-200/20 bg-teal-300/10 text-xl">
              ☀
            </span>

            <span className="text-xl font-bold tracking-tight">
              Weather<span className="text-teal-300">Space</span>
            </span>
          </NavLink>

          <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-1.5">
            <NavLink to="/" end className={navClass}>
              Current Weather
            </NavLink>

            <NavLink to="/ChooseCityoption" className={navClass}>
              Explore Cities
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="mx-auto min-h-[75vh] max-w-7xl px-5 py-10 sm:px-8 sm:py-14">

        <div className="mb-9">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_12px_#5eead4]" />
            Weather dashboard
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Your world, at a glance.
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Discover current conditions and explore weather around the world.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-72 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<CityWeather coordinates={coordinates} />}
            />

            <Route
              path="/ChooseCityoption"
              element={
                <ChooseCityoption
                  coordinates={coordinates}
                  setCoordinates={setCoordinates}
                />
              }
            />

            <Route
              path="*"
              element={
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
                  <h2 className="text-2xl font-bold">Page not found</h2>
                  <NavLink
                    to="/"
                    className="mt-4 inline-block text-teal-300 hover:text-teal-200"
                  >
                    Return to weather
                  </NavLink>
                </div>
              }
            />
          </Routes>
        )}
      </main>

      <footer className="border-t border-white/[0.08] bg-black/10 px-5 py-6 text-center text-sm text-slate-500">
        WeatherSpace <span className="mx-2 text-slate-700">•</span>
        Built with React & Tailwind CSS
      </footer>
    </div>
  )
}

export default App
