import React, { useState, useEffect } from "react";

import { Cloud } from "lucide-react";
import MapSection from "../MapSection";
import SavedLocations from "../SavedLocations";
import WeatherPanel from "./WeatherPanel";

function WeatherSPA() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [newLocationName, setNewLocationName] = useState("");

  // Load saved locations on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedLocations") || "[]");
    setSavedLocations(saved);
  }, []);

  // Fetch weather data
  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&past_days=7&forecast_days=7`
      );
      const data = await response.json();

      setWeatherData({
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
      });

      const forecast = data.daily.time.map((date, i) => ({
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        max: data.daily.temperature_2m_max[i],
        min: data.daily.temperature_2m_min[i],
        precipitation: data.daily.precipitation_sum[i],
      }));
      setForecastData(forecast);
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle map click
  const handleMapClick = async (latlng) => {
    const location = {
      lat: latlng.lat.toFixed(4),
      lon: latlng.lng.toFixed(4),
    };
    setSelectedLocation(location);
    setNewLocationName("");
    await fetchWeatherData(location.lat, location.lon);
  };

  // Save a location
  const saveLocation = () => {
    if (!selectedLocation || !newLocationName.trim()) {
      alert("Please enter a name for this location");
      return;
    }

    const newLoc = {
      id: Date.now(),
      name: newLocationName.trim(),
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
    };

    const updated = [...savedLocations, newLoc];
    setSavedLocations(updated);
    localStorage.setItem("savedLocations", JSON.stringify(updated));
    setNewLocationName("");
    alert("Location saved!");
  };

  // Delete location
  const deleteLocation = (id) => {
    if (confirm("Delete this location?")) {
      const updated = savedLocations.filter((loc) => loc.id !== id);
      setSavedLocations(updated);
      localStorage.setItem("savedLocations", JSON.stringify(updated));
    }
  };

  // Edit location
  const startEdit = (loc) => {
    setEditingId(loc.id);
    setEditName(loc.name);
  };
  const saveEdit = (id) => {
    if (!editName.trim()) return alert("Name cannot be empty");
    const updated = savedLocations.map((loc) =>
      loc.id === id ? { ...loc, name: editName.trim() } : loc
    );
    setSavedLocations(updated);
    localStorage.setItem("savedLocations", JSON.stringify(updated));
    setEditingId(null);
    setEditName("");
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  // Load saved location
  const loadSavedLocation = async (loc) => {
    setSelectedLocation({ lat: loc.lat, lon: loc.lon });
    await fetchWeatherData(loc.lat, loc.lon);
  };

  // Weather description helper
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      51: "Light drizzle",
      61: "Rain",
      71: "Snow",
      95: "Thunderstorm",
    };
    return weatherCodes[code] || "Unknown";
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md text-white py-4 px-6 shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2 uppercase">
          <Cloud size={32} /> Weather SPA 
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Map */}
        <div className="w-1/2 relative">
          <MapSection
            selectedLocation={selectedLocation}
            savedLocations={savedLocations}
            onMapClick={handleMapClick}
            onMarkerClick={loadSavedLocation}
          />
        </div>

        {/* Right: Weather Info */}
        <div className="w-1/2 overflow-y-auto bg-white p-6">
          <SavedLocations
            savedLocations={savedLocations}
            editingId={editingId}
            editName={editName}
            onEditChange={setEditName}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onDelete={deleteLocation}
            onSelect={loadSavedLocation}
          />

          <WeatherPanel
            selectedLocation={selectedLocation}
            newLocationName={newLocationName}
            setNewLocationName={setNewLocationName}
            saveLocation={saveLocation}
            weatherData={weatherData}
            forecastData={forecastData}
            getWeatherDescription={getWeatherDescription}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherSPA;
