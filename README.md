# URL Shortener

A scalable URL shortening service built with a React frontend and Express.js backend. Transform long, unwieldy URLs into short, shareable links.

## 🎯 Features

- **Instant URL Shortening**: Generate short URLs instantly
- **Redis Caching**: Lightning-fast lookups with Redis cache
- **URL Validation**: Validates URLs before shortening
- **Responsive Design**: Beautiful, mobile-friendly UI
- **Dark Theme**: Modern dark theme with custom design tokens

## 🏗 Project Structure

```
/
├── backend/             # Express.js Backend API
│   ├── src/
│   │   ├── conttroller/ # Route controllers
│   │   ├── model/       # MongoDB models
│   │   └── routes/      # API routes
│   ├── index.js         # Server entry point
│   └── package.json
├── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API client
│   │   └── theme/       # Design tokens
│   ├── index.html
│   └── package.json
├── package.json         # Root workspace config
└── README.md
```

## 🛠 Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS 4
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- ShortID

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- MongoDB database
- Redis server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dipesh-J/project-url-shortner.git
   cd project-url-shortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the backend folder with:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   REDIS_HOST=your_redis_host
   REDIS_PORT=your_redis_port
   REDIS_PASSWORD=your_redis_password
   ```

### Development

**Run the frontend:**
```bash
npm run dev:frontend
```
Frontend runs at: http://localhost:5173

**Run the backend:**
```bash
npm run dev:backend
```
Backend runs at: http://localhost:3000

### Building for Production

**Build the frontend:**
```bash
npm run build:frontend
```

**Lint the frontend:**
```bash
npm run lint:frontend
```

## 📡 API Endpoints

### Create Short URL
```http
POST /createShortUrl
Content-Type: application/json

{
  "longUrl": "https://example.com/very/long/url/path"
}
```

**Response:**
```json
{
  "data": {
    "shortUrlCode": "abc123",
    "longUrl": "https://example.com/very/long/url/path",
    "shortUrl": "http://localhost:3000/abc123"
  }
}
```

### Redirect to Original URL
```http
GET /:shortUrlCode
```
Returns: 302 Redirect to original URL

## 🎨 Design System

The frontend uses a custom design token system with:

- **Colors**: Primary (#735F32), Primary Variant (#C69749)
- **Background**: Default (#000000), Surface (#282A3A)
- **Typography**: Poppins font family
- **Spacing**: Consistent spacing scale
- **Border Radius**: Defined radius tokens
- **Shadows**: Navbar shadow

## 📦 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend: `npm run build:frontend`
2. Deploy the `frontend/dist` folder

Set environment variable:
- `VITE_API_URL`: Your backend API URL

### Backend (Render/Railway)

1. Deploy the `backend` folder
2. Set environment variables for MongoDB and Redis

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

ISC License

## 👏 Acknowledgments

- Design inspired by modern URL shortening services
- Built with React and Express.js
