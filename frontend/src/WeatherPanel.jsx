import React from "react";
import { Save, MapPin, Droplets, Wind, Cloud } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const WeatherPanel = ({
  selectedLocation,
  newLocationName,
  setNewLocationName,
  saveLocation,
  weatherData,
  forecastData,
  getWeatherDescription,
  loading,
}) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading weather data...</p>
      </div>
    );
  }

  if (!selectedLocation) {
    return (
      <div className="text-center py-12">
        <Cloud size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Location Selected</h3>
        <p className="text-gray-500">Click on the map to view weather data</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center gap-2"><MapPin size={20} /> Selected Location</h3>
        <p className="text-sm text-gray-600 mb-3">Lat: {selectedLocation.lat}, Lon: {selectedLocation.lon}</p>
        <div className="flex gap-2">
          <input
            value={newLocationName}
            onChange={(e) => setNewLocationName(e.target.value)}
            placeholder="Enter location name..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={saveLocation}
            className="px-4 py-2 bg-black/40 text-white rounded-lg hover:bg-black transition flex items-center gap-2"
          >
            <Save size={18} /> Save
          </button>
        </div>
      </div>

      {weatherData && (
        <>
          <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-orange-500 text-white rounded-lg">
              <p className="text-sm">Temperature</p>
              <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
            </div>
            <div className="p-4 bg-blue-500 text-white rounded-lg">
              <Droplets size={20} /> {weatherData.humidity}%
            </div>
            <div className="p-4 bg-teal-500 text-white rounded-lg">
              <Wind size={20} /> {weatherData.windSpeed} km/h
            </div>
            <div className="p-4 bg-purple-500 text-white rounded-lg">
              <Cloud size={20} /> {getWeatherDescription(weatherData.weatherCode)}
            </div>
          </div>

          {forecastData && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">14-Day Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="max" stroke="#f97316" name="Max Temp (°C)" strokeWidth={2} />
                  <Line type="monotone" dataKey="min" stroke="#3b82f6" name="Min Temp (°C)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WeatherPanel;
