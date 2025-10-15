// server.js - Express Backend for Weather SPA
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'locations.json');

// Initialize data file if it doesn't exist
async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
}

// Helper function to read locations
async function readLocations() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write locations
async function writeLocations(locations) {
  await fs.writeFile(DATA_FILE, JSON.stringify(locations, null, 2));
}

// ===== WEATHER ROUTES =====

// Get current weather
app.get('/api/weather/current', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Fetch from Open-Meteo API
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching current weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get forecast weather (7 days)
app.get('/api/weather/forecast', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=7`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

// Get historical weather (past 30 days)
app.get('/api/weather/historical', async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&past_days=30&forecast_days=0`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching historical weather:', error.message);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

// ===== LOCATION ROUTES (CRUD) =====

// GET all saved locations
app.get('/api/locations', async (req, res) => {
  try {
    const locations = await readLocations();
    res.json(locations);
  } catch (error) {
    console.error('Error reading locations:', error.message);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// POST - Save new location
app.post('/api/locations', async (req, res) => {
  try {
    const { name, lat, lon } = req.body;

    if (!name || !lat || !lon) {
      return res.status(400).json({ error: 'Name, latitude, and longitude are required' });
    }

    const locations = await readLocations();
    const newLocation = {
      id: Date.now(),
      name,
      lat,
      lon,
      createdAt: new Date().toISOString(),
    };

    locations.push(newLocation);
    await writeLocations(locations);

    res.status(201).json(newLocation);
  } catch (error) {
    console.error('Error saving location:', error.message);
    res.status(500).json({ error: 'Failed to save location' });
  }
});

// PUT - Update location
app.put('/api/locations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lat, lon } = req.body;

    const locations = await readLocations();
    const index = locations.findIndex((loc) => loc.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ error: 'Location not found' });
    }

    // Update fields
    if (name) locations[index].name = name;
    if (lat) locations[index].lat = lat;
    if (lon) locations[index].lon = lon;
    locations[index].updatedAt = new Date().toISOString();

    await writeLocations(locations);
    res.json(locations[index]);
  } catch (error) {
    console.error('Error updating location:', error.message);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

// DELETE - Delete location
app.delete('/api/locations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const locations = await readLocations();
    const filteredLocations = locations.filter((loc) => loc.id !== parseInt(id));

    if (locations.length === filteredLocations.length) {
      return res.status(404).json({ error: 'Location not found' });
    }

    await writeLocations(filteredLocations);
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting location:', error.message);
    res.status(500).json({ error: 'Failed to delete location' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await initDataFile();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Weather API endpoints available at /api/weather/*`);
    console.log(`📍 Location API endpoints available at /api/locations`);
  });
}

startServer();