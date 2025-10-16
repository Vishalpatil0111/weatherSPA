

```markdown
# 🌦️ Interactive Weather SPA

An interactive Weather Dashboard built using React.js, TailwindCSS, Leaflet, and Open-Meteo API — where users can click anywhere on the map to view real-time weather, forecasts, and manage saved locations.  

This project demonstrates React state management, API integration, modular architecture, and data visualization using Recharts.

---

## 🎥 Demo Video
> 🎬 Watch Demo: 
  https://drive.google.com/uc?export=download&id=1EEoKrdeY5aPKlEVTgdSsDtiQEs89qkXN

---

## 🚀 Features

✅ Click anywhere on the map to get weather details  
✅ Displays current, past, and 7-day forecast weather  
✅ Save, edit, and delete favorite locations (CRUD)  
✅ Persistent data using localStorage  
✅ Real-time weather data via Open-Meteo API  
✅ Interactive charts using Recharts  
✅ Modern UI with TailwindCSS and Lucide Icons

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React.js - Vite  |
| Styling | TailwindCSS |
| Map | Leaflet.js + react-leaflet |
| Charts | Recharts |
| Icons | Lucide-react |
| API | Open-Meteo API |
| Storage | localStorage |
| Optional Backend (Future) | Express.js or FastAPI |

---

## 🗂️ Folder Structure



---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Vishalpatil0111/weather-spa.git
cd weather-spa
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm start
# or if using Vite:
npm run dev
```

### 4️⃣ Open the app

Visit 👉 [http://localhost:5173](http://localhost:5000)

---

## 🔍 API Used — Open-Meteo

* Free and no API key required.
* Documentation: [https://open-meteo.com/](https://open-meteo.com/)
* Example Endpoint:

  ```
  https://api.open-meteo.com/v1/forecast?latitude=20&longitude=80&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&past_days=7&forecast_days=7
  ```

---

## 🧠 How It Works (Architecture Overview)

1. Map Interaction

   * The user clicks on any point on the Leaflet map.
   * The app captures latitude & longitude via `useMapEvents`.

2. Weather Fetching

   * `fetchWeatherData(lat, lon)` calls the Open-Meteo API.
   * Data is structured into `weatherData` (current) and `forecastData` (7-day trend).

3. UI Rendering

   * Current weather is shown in colored cards (temperature, humidity, etc.).
   * Forecast is plotted using Recharts LineChart.

4. Saved Locations

   * Users can name and save favorite spots.
   * CRUD operations (add, edit, delete) are managed in localStorage.

5. Data Persistence

   * Saved data remains available even after page refresh.

---

## 🧠 React Concepts Used

* `useState`, `useEffect` for state & lifecycle management
* Props drilling for component communication
* Conditional rendering for UI updates
* Reusable functional components
* Integration of third-party APIs and charting libraries

---

## 🎨 UI Highlights

* Responsive layout (map + data side-by-side)
* Gradient header and weather cards
* Smooth transitions & hover effects
* Custom scrollbar and global styling
* Works perfectly across desktop and tablets

---

## 📈 Future Improvements

| Feature                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| 🌐 Backend Integration | Connect Express.js or FastAPI for database CRUD |
| 👤 User Auth           | Allow user login and saved location sync        |
| 🌙 Dark Mode           | Theme toggle support                            |
| 📱 Mobile Optimization | Add touch events and mobile map support         |
| ⚡ Performance         | Cache API responses for speed                   |

---

## 👨‍💻 Author

Vishal Patil
Frontend Developer | React & Next.js Enthusiast
Portfolio : https://vishalportfolio-theta.vercel.app/

---

## 🧾 License

This project is open-source and available under the MIT License.

---

```
