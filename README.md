
# WeatherSpace 🌤️

A responsive weather application built with React and Tailwind CSS. Search for cities and view current weather conditions using the OpenWeather API.

## Features

- Get weather for your current location.
- Search for cities by name.
- View temperature and feels-like temperature.
- Check humidity, wind speed, cloud coverage, and pressure.
- Responsive interface with an Aurora-inspired design.
- Loading and error states for API requests.

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- OpenWeather API

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/krunal0234/Weather-app.git
cd Weather-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API key

Create a `.env` file in the project root:

```env
VITE_Api_key=your_openweather_api_key
```

Replace the placeholder with your OpenWeather API key.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Notes

- Location access requires browser permission.
- The app uses the OpenWeather API for city search and current weather.
- Never commit your `.env` file or expose credentials in your repository.

## Author

Krunal Ramteke
