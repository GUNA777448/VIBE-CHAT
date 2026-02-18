# 🐳 Docker Setup Guide for VIBE-CHAT

## Quick Start

### Development Mode (Hot-Reload Enabled)

```bash
# Start all services with hot-reload
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access the application:**

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Production Mode

```bash
# Start production services
docker-compose -f docker-compose.prod.yml up --build -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

**Access the application:**

- Frontend: http://localhost:80
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

## Interactive Development Features

### 🔥 Hot-Reload

- **Frontend**: Vite dev server with HMR - changes reflect instantly
- **Backend**: Nodemon watches file changes and restarts automatically
- **Code Changes**: Edit files in your IDE and see changes immediately in the running containers

### 🔍 Debugging

Access container shells for debugging:

```bash
# Backend container
docker exec -it vibe-chat-server sh

# Frontend container
docker exec -it vibe-chat-client sh

# MongoDB container
docker exec -it vibe-chat-mongodb mongosh -u admin -p password
```

### 📊 View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
docker-compose logs -f client
docker-compose logs -f mongodb

# Last N lines
docker-compose logs --tail=100 server
```

### 🔄 Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart server
docker-compose restart client
```

## Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

**Important**: Update the following in production:

- `MONGO_PASSWORD`: Strong password for MongoDB
- `JWT_SECRET`: Strong secret for JWT tokens
- `JWT_REFRESH_SECRET`: Strong secret for refresh tokens
- `VITE_API_URL`: Your production API URL

## Container Architecture

### Development Mode

- **MongoDB**: Persistent data with health checks
- **Server**: Node.js with Nodemon (auto-restart on changes)
- **Client**: Vite dev server with HMR (port 5173)
- **Volumes**: Source code mounted for live editing

### Production Mode

- **MongoDB**: Persistent data with health checks
- **Server**: Optimized Node.js production build
- **Client**: Static files served by Nginx (port 80)
- **Volumes**: No source code mounting

## Useful Commands

### Build without cache

```bash
docker-compose build --no-cache
```

### Remove all containers and volumes

```bash
docker-compose down -v
```

### View container resource usage

```bash
docker stats
```

### Inspect a specific service

```bash
docker-compose ps
docker inspect vibe-chat-server
```

### Execute commands in containers

```bash
# Run npm commands in server
docker-compose exec server npm install new-package

# Run npm commands in client
docker-compose exec client npm install new-package
```

## Troubleshooting

### Port conflicts

If ports are already in use, modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "NEW_PORT:5000" # Change NEW_PORT to an available port
```

### Container won't start

```bash
# Check logs
docker-compose logs service-name

# Remove and rebuild
docker-compose down
docker-compose up --build
```

### MongoDB connection issues

```bash
# Verify MongoDB is healthy
docker-compose ps

# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker exec -it vibe-chat-mongodb mongosh -u admin -p password
```

### Clear all Docker resources

```bash
# Stop all containers
docker-compose down -v

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune
```

## Health Checks

The containers include health checks:

- **MongoDB**: Pings database every 10s
- **Server**: Checks HTTP endpoint every 30s

View health status:

```bash
docker-compose ps
```

## Interactive Terminal Access

For interactive development and debugging:

```bash
# Backend - Run Node REPL or commands
docker-compose exec server node

# Frontend - Access npm commands
docker-compose exec client npm run lint

# MongoDB - Query database
docker exec -it vibe-chat-mongodb mongosh -u admin -p password --authenticationDatabase admin
```

## Best Practices

1. **Development**: Use default `docker-compose.yml` with hot-reload
2. **Production**: Use `docker-compose.prod.yml` with optimized builds
3. **Security**: Always change default passwords in `.env`
4. **Data**: MongoDB data persists in Docker volumes
5. **Logs**: Regular monitoring with `docker-compose logs`
6. **Updates**: Rebuild after dependency changes: `docker-compose up --build`

## Network Architecture

All services communicate through `vibe-chat-network`:

- Client ↔ Server: HTTP requests
- Server ↔ MongoDB: Database connection
- Isolated from host network for security

## Volume Mounts (Development)

- `./VIBE-CHAT-SERVER:/app` - Server code hot-reload
- `./VIBE-CHAT-CLIENT:/app` - Client code hot-reload
- `mongodb_data` - Persistent database storage
