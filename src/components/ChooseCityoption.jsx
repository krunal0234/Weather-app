
import { useState } from 'react'
import axios from 'axios'

const ChooseCityoption = ({ setCoordinates }) => {
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState('')
    const [searching, setSearching] = useState(false)
    const [fetchingWeather, setFetchingWeather] = useState(false)

    const apiKey = import.meta.env.VITE_Api_key

    const cityname = async () => {
        if (!city.trim()) {
            setCities([])
            setWeather(null)
            setError('Please enter a city name.')
            return
        }

        setSearching(true)
        setCities([])
        setWeather(null)
        setError('')

        try {
            const api = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city.trim())}&limit=5&appid=${apiKey}`
            const response = await axios.get(api)
            const data = response.data

            setCities(data)

            if (data.length === 0) {
                setError('No cities found. Try a different spelling.')
            }
        } catch (err) {
            console.error(err)
            setError('Unable to search for cities. Please try again.')
        } finally {
            setSearching(false)
        }
    }

    const selectedcityweather = async (selectedCity) => {
        const selectedCoordinates = {
            latitude: selectedCity.lat,
            longitude: selectedCity.lon,
        }

        setCoordinates(selectedCoordinates)
        setWeather(null)
        setError('')
        setFetchingWeather(true)

        try {
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCoordinates.latitude}&lon=${selectedCoordinates.longitude}&appid=${apiKey}&units=metric`
            const response = await axios.get(api)
            setWeather(response.data)
        } catch (err) {
            console.error(err)
            setError('Unable to fetch weather for this city.')
        } finally {
            setFetchingWeather(false)
        }
    }

    return (
        <div className="mx-auto max-w-5xl">

            <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                    EXPLORE THE WORLD
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    Find your next city
                </h1>

                <p className="mt-2 max-w-xl leading-6 text-slate-400">
                    Search for a city and see its current temperature, humidity, wind, and more.
                </p>
            </div>

            {/* Search panel */}
            <section className="rounded-[28px] border border-white/[0.12] bg-gradient-to-br from-white/[0.07] to-white/[0.025] p-5 shadow-xl shadow-black/10 backdrop-blur-2xl sm:p-8">

                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        cityname()
                    }}
                    className="flex flex-col gap-3 sm:flex-row sm:items-end"
                >
                    <div className="min-w-0 flex-1">
                        <label
                            htmlFor="city"
                            className="mb-2 block text-sm font-medium text-slate-300"
                        >
                            City name
                        </label>

                        <input
                            id="city"
                            type="text"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            placeholder="Try Mumbai, Tokyo, London..."
                            className="w-full rounded-xl border border-white/[0.12] bg-[#081722]/70 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/10"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={searching}
                        className="rounded-xl bg-teal-300 px-6 py-3.5 font-semibold text-[#06212a] transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {searching ? 'Searching...' : 'Search city →'}
                    </button>
                </form>

                {error && (
                    <p
                        role="alert"
                        className="mt-5 rounded-xl border border-red-300/20 bg-red-400/[0.07] p-4 text-sm text-red-200"
                    >
                        {error}
                    </p>
                )}

                {cities.length > 0 && (
                    <div className="mt-8">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-semibold text-white">Search results</h2>
                            <span className="text-sm text-slate-500">
                                {cities.length} locations
                            </span>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {cities.map((item, index) => (
                                <button
                                    key={`${item.lat}-${item.lon}-${index}`}
                                    type="button"
                                    disabled={fetchingWeather}
                                    onClick={() => selectedcityweather(item)}
                                    className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.035] p-4 text-left transition hover:border-teal-200/30 hover:bg-teal-200/[0.06] disabled:opacity-50"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-white">
                                            {item.name}
                                        </p>
                                        <p className="mt-1 truncate text-sm text-slate-400">
                                            {[item.state, item.country].filter(Boolean).join(', ')}
                                        </p>
                                    </div>

                                    <span className="shrink-0 text-xl text-teal-300 transition group-hover:translate-x-1">
                                        →
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {fetchingWeather && (
                    <div className="mt-5 flex items-center gap-3 text-sm text-teal-200">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-teal-200/20 border-t-teal-300" />
                        Fetching weather for the selected city...
                    </div>
                )}
            </section>

            {/* Selected city weather */}
            {weather && (
                <section className="mt-7 rounded-[28px] border border-white/[0.12] bg-gradient-to-br from-[#153b46]/90 via-[#112b3b]/90 to-[#172543]/90 p-6 shadow-xl shadow-black/20 backdrop-blur-2xl sm:p-8">

                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                                SELECTED LOCATION
                            </p>

                            <h2 className="mt-3 text-3xl font-bold">
                                {weather.name}
                            </h2>

                            <p className="mt-2 capitalize text-slate-400">
                                {weather.weather?.[0]?.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {weather.weather?.[0]?.icon && (
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt={weather.weather[0].description}
                                    className="h-20 w-20"
                                />
                            )}

                            <p className="text-5xl font-semibold tracking-tight">
                                {Math.round(weather.main.temp)}°
                                <span className="text-2xl text-teal-300">C</span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                            ['Feels like', `${Math.round(weather.main.feels_like)}°C`],
                            ['Humidity', `${weather.main.humidity}%`],
                            ['Wind speed', `${weather.wind.speed} m/s`],
                            ['Pressure', `${weather.main.pressure} hPa`],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="rounded-2xl border border-white/[0.09] bg-[#071722]/40 p-4"
                            >
                                <p className="text-sm text-slate-400">{label}</p>
                                <p className="mt-3 break-words text-lg font-semibold text-white">
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default ChooseCityoption
