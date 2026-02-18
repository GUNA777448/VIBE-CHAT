# VIBE-CHAT

A full-stack real-time chat application built with React, Express, MongoDB, and Socket.IO.

---

## Tech Stack

| Layer    | Technology                                                     |
| -------- | -------------------------------------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS, Zustand, Framer Motion, Firebase |
| Backend  | Express 5, Node.js, Socket.IO, JWT, Arcjet rate-limiting       |
| Database | MongoDB (Mongoose 9)                                           |
| DevOps   | Docker, Docker Compose, Kubernetes manifests                   |

---

## Project Structure

```
VIBE-CHAT/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI & auth components
│   │   ├── pages/          # Route pages (Home, Login, Signup, Chat, Profile, Forgot)
│   │   ├── stores/         # Zustand state management
│   │   └── utils/          # API client & helpers
│   └── ...
├── server/                 # Express backend
│   ├── controllers/        # Route handlers (auth)
│   ├── middlewares/         # Auth & rate-limit middleware
│   ├── models/             # Mongoose schemas (User, Chat, Message)
│   ├── routes/             # API route definitions
│   └── utils/              # DB config & token helpers
├── k8s/                    # Kubernetes deployment manifests
├── docker-compose.yml      # Dev environment (MongoDB + Server + Client)
├── docker-compose.prod.yml # Production environment
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **yarn**
- **MongoDB** (local, Atlas, or via Docker)

### 1. Clone the repository

```bash
git clone https://github.com/GUNA777448/VIBE-CHAT.git
cd VIBE-CHAT
```

### 2. Environment variables

Create a `.env` file in the **server/** directory:

```env
MONGO_URI=mongodb://localhost:27017/vibe-chat
JWT_SECRET=your-jwt-secret
PORT=5000
ARCJET_KEY=your-arcjet-key        # optional, for rate limiting
ARCJET_ENV=development
```

Create a `.env` file in the **client/** directory (if needed):

```env
VITE_API_URL=http://localhost:5000
```

> See `.env.example` in the project root for a full reference.

### 3. Install dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 4. Run in development

```bash
# Terminal 1 — Server
cd server
npm run dev          # starts nodemon on port 5000

# Terminal 2 — Client
cd client
npm run dev          # starts Vite dev server
```

Or use the Docker shortcut:

```powershell
.\dev-start.ps1
```

---

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint            | Auth   | Description              |
| ------ | ------------------- | ------ | ------------------------ |
| GET    | `/`                 | —      | Health check             |
| POST   | `/api/auth/signup`  | —      | Register a new user      |
| POST   | `/api/auth/signin`  | —      | Log in                   |
| GET    | `/api/auth/profile` | Bearer | Get current user profile |
| PUT    | `/api/auth/profile` | Bearer | Update user profile      |

A ready-to-import Postman collection is available at **`server/VIBE-CHAT.postman_collection.json`**.

---

## Docker

```bash
# Development (hot-reload)
docker compose up --build

# Production
docker compose -f docker-compose.prod.yml up --build -d

# Stop
docker compose down
```

---

## Kubernetes

Manifests live in `k8s/`:

```bash
kubectl apply -f k8s/
```

---

## Scripts (PowerShell)

| Script           | Purpose                        |
| ---------------- | ------------------------------ |
| `dev-start.ps1`  | Start dev environment (Docker) |
| `prod-start.ps1` | Start production environment   |
| `stop.ps1`       | Stop all containers            |
| `logs.ps1`       | Tail container logs            |
| `shell.ps1`      | Open a shell into a container  |

---

## License

ISC
