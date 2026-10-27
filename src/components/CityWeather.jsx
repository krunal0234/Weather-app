
import { useEffect, useState } from 'react'
import axios from 'axios'

const CityWeather = ({ coordinates }) => {
    const apiKey = import.meta.env.VITE_Api_key

    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (
            !coordinates ||
            coordinates.latitude == null ||
            coordinates.longitude == null
        ) {
            setWeather(null)
            setLoading(false)
            setError('')
            return
        }

        let cancelled = false

        const getWeather = async () => {
            setLoading(true)
            setError('')

            try {
                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=metric`
                const response = await axios.get(api)

                if (!cancelled) {
                    setWeather(response.data)
                }
            } catch (err) {
                console.error(err)

                if (!cancelled) {
                    setError('Unable to fetch weather. Please try again.')
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        getWeather()

        return () => {
            cancelled = true
        }
    }, [coordinates, apiKey])

    if (!coordinates) {
        return (
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
                <p className="text-xl font-semibold">Location unavailable</p>
                <p className="mt-2 text-slate-400">
                    Use Explore Cities to search for a location.
                </p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center backdrop-blur-xl">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-teal-300" />
                <p className="mt-4 text-slate-300">Getting the latest weather...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div role="alert" className="mx-auto max-w-4xl rounded-3xl border border-red-400/20 bg-red-400/[0.07] p-6 text-red-200">
                {error}
            </div>
        )
    }

    if (!weather) return null

    const condition = weather.weather?.[0]?.main || 'Clear'
    const description = weather.weather?.[0]?.description || 'Current conditions'
    const icon = weather.weather?.[0]?.icon

    const emoji =
        condition === 'Clear' ? '☀️' :
            condition === 'Clouds' ? '☁️' :
                condition === 'Rain' ? '🌧️' :
                    condition === 'Drizzle' ? '🌦️' :
                        condition === 'Thunderstorm' ? '⛈️' :
                            condition === 'Snow' ? '❄️' :
                                condition === 'Mist' || condition === 'Fog' || condition === 'Haze' ? '🌫️' :
                                    '🌤️'

    const metrics = [
        { label: 'Feels like', value: `${Math.round(weather.main.feels_like)}°C`, icon: '🌡️' },
        { label: 'Humidity', value: `${weather.main.humidity}%`, icon: '💧' },
        { label: 'Wind speed', value: `${weather.wind.speed} m/s`, icon: '💨' },
        { label: 'Pressure', value: `${weather.main.pressure} hPa`, icon: '◉' },
    ]

    return (
        <div className="mx-auto max-w-5xl">

            {/* City heading */}
            <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                    CURRENT CONDITIONS
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    {weather.name}
                    {weather.sys?.country ? (
                        <span className="ml-3 text-lg font-medium text-slate-400">
                            {weather.sys.country}
                        </span>
                    ) : null}
                </h2>

                <p className="mt-2 capitalize text-slate-400">{description}</p>
            </div>

            {/* Main weather card */}
            <section className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-gradient-to-br from-[#153b46]/90 via-[#112b3b]/90 to-[#172543]/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl sm:p-10">

                <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-teal-300/[0.10] blur-3xl" />

                <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">

                    <div>
                        <p className="text-sm font-medium text-slate-300">
                            Temperature right now
                        </p>

                        <div className="mt-3 flex items-start">
                            <span className="text-7xl font-semibold tracking-[-0.07em] sm:text-9xl">
                                {Math.round(weather.main.temp)}
                            </span>
                            <span className="mt-2 text-3xl font-light text-teal-300 sm:text-4xl">
                                °C
                            </span>
                        </div>

                        <p className="mt-3 text-base text-slate-300">
                            Feels like {Math.round(weather.main.feels_like)}°C
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal-200/15 bg-teal-200/[0.07] px-4 py-2 text-sm text-teal-100">
                            <span className="h-2 w-2 rounded-full bg-teal-300" />
                            <span className="capitalize">{description}</span>
                        </div>
                    </div>

                    <div className="flex min-h-48 flex-col items-center justify-center rounded-3xl border border-white/[0.09] bg-white/[0.04] p-5">
                        {icon ? (
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                                alt={description}
                                className="h-36 w-36 object-contain drop-shadow-xl"
                            />
                        ) : (
                            <span className="text-8xl">{emoji}</span>
                        )}

                        <p className="mt-1 text-sm text-slate-400">Live conditions</p>
                    </div>
                </div>

                {/* Metrics */}
                <div className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="rounded-2xl border border-white/[0.09] bg-[#071722]/40 p-5 transition duration-200 hover:border-teal-200/25 hover:bg-white/[0.06]"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-400">{metric.label}</p>
                                <span className="text-lg">{metric.icon}</span>
                            </div>

                            <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
                                {metric.value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <p className="mt-4 text-xs text-slate-500">
                Weather data provided by OpenWeather.
            </p>
        </div>
    )
}

export default CityWeather
