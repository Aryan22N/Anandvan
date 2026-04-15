# 🚀 Deployment Guide for Anandwan Payment Application

## Overview
Your application consists of:
- **Frontend**: React application (serves static files)
- **Backend**: Spring Boot API (Java)
- **Database**: Supabase PostgreSQL (already deployed)

## 📋 Deployment Options

### Option 1: Vercel + Railway (Recommended - Easiest)

#### Frontend Deployment (Vercel)
1. **Build the React app**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Vercel will auto-detect React and deploy
   - Set environment variable: `REACT_APP_API_URL=https://your-backend-url.railway.app`

#### Backend Deployment (Railway)
1. **Create Railway account** at [railway.app](https://railway.app)

2. **Deploy Spring Boot app**:
   - Connect GitHub repository
   - Railway auto-detects Java/Spring Boot
   - Set environment variables in Railway dashboard:
     ```
     SPRING_PROFILES_ACTIVE=prod
     SPRING_DATASOURCE_URL=your-supabase-connection-string
     SPRING_DATASOURCE_USERNAME=your-supabase-username
     SPRING_DATASOURCE_PASSWORD=your-supabase-password
     RAZORPAY_KEY_ID=your-razorpay-key-id
     RAZORPAY_KEY_SECRET=your-razorpay-key-secret
     ```

### Option 2: Netlify + Render

#### Frontend Deployment (Netlify)
1. **Build the React app**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `build` folder or connect GitHub
   - Set environment variable: `REACT_APP_API_URL=https://your-backend-url.onrender.com`

#### Backend Deployment (Render)
1. **Create Render account** at [render.com](https://render.com)

2. **Deploy Spring Boot app**:
   - Connect GitHub repository
   - Choose "Web Service" for Spring Boot
   - Set build command: `./mvnw clean install`
   - Set start command: `./mvnw spring-boot:run`
   - Set environment variables (same as Railway)

### Option 3: Docker Containerization (Advanced)

#### Create Docker Files

**Frontend Dockerfile** (`Dockerfile.frontend`):
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Backend Dockerfile** (`payment-backend/Dockerfile`):
```dockerfile
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
```

**docker-compose.yml** (for local testing):
```yaml
version: '3.8'
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "3000:80"

  backend:
    build:
      context: ./payment-backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_URL=${DATABASE_URL}
      - RAZORPAY_KEY_ID=${RAZORPAY_KEY_ID}
      - RAZORPAY_KEY_SECRET=${RAZORPAY_KEY_SECRET}
```

#### Deploy Docker Containers

**Railway (with Docker)**:
- Push to GitHub with Dockerfiles
- Railway will auto-detect and deploy

**Google Cloud Run**:
```bash
gcloud run deploy --source . --platform managed
```

**AWS Fargate**:
```bash
aws ecs create-service --cluster your-cluster --service-name your-service --task-definition your-task
```

### Option 4: Azure Deployment

#### Frontend (Azure Static Web Apps)
1. **Create Azure Static Web App**:
   ```bash
   az staticwebapp create --name anandwan-frontend --resource-group your-rg --source https://github.com/yourusername/anandwan --location "Central US" --branch main --app-location "/" --output-location "build" --login-with-github
   ```

2. **Set environment variables**:
   ```bash
   az staticwebapp environment-variables set --name anandwan-frontend --resource-group your-rg --environment-variables REACT_APP_API_URL=https://your-backend.azurewebsites.net
   ```

#### Backend (Azure App Service)
1. **Create App Service**:
   ```bash
   az appservice plan create --name anandwan-plan --resource-group your-rg --sku B1 --is-linux
   az webapp create --resource-group your-rg --plan anandwan-plan --name anandwan-backend --runtime "JAVA:17-java17" --deployment-source-url https://github.com/yourusername/anandwan --deployment-source-branch main
   ```

2. **Set environment variables**:
   ```bash
   az webapp config appsettings set --name anandwan-backend --resource-group your-rg --setting SPRING_PROFILES_ACTIVE=prod SPRING_DATASOURCE_URL="your-supabase-url" RAZORPAY_KEY_ID="your-key" RAZORPAY_KEY_SECRET="your-secret"
   ```

## 🔧 Environment Variables Required

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

### Backend (Production Environment Variables)
```env
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:postgresql://your-supabase-url
SPRING_DATASOURCE_USERNAME=your-supabase-username
SPRING_DATASOURCE_PASSWORD=your-supabase-password
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

## 🚀 Quick Deployment (Recommended)

### Step 1: Prepare Frontend
```bash
# Build React app
npm run build

# The build folder contains static files ready for deployment
```

### Step 2: Prepare Backend
```bash
# Build Spring Boot app
cd payment-backend
mvn clean package -DskipTests
```

### Step 3: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect React and deploy
4. Add environment variable: `REACT_APP_API_URL=https://your-backend-url`

### Step 4: Deploy Backend to Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-detect Java and deploy
4. Add environment variables in Railway dashboard

## 🔍 Testing Deployment

### Frontend Tests
```bash
# Test build locally
npm run build
npx serve -s build

# Visit http://localhost:3000 to test
```

### Backend Tests
```bash
# Test API endpoints
curl https://your-backend-domain.com/api/payments/health
curl https://your-backend-domain.com/api/payments/create-order -X POST -H "Content-Type: application/json" -d '{"amount":50000,"currency":"INR","name":"Test","phoneNumber":"9876543210"}'
```

## 📊 Monitoring & Maintenance

### Health Checks
- Frontend: Check if static files load
- Backend: Monitor `/api/payments/health` endpoint
- Database: Check Supabase dashboard

### Logs
- Vercel: Dashboard logs
- Railway: Service logs
- Supabase: Query logs and performance

### Updates
1. Push changes to GitHub
2. Deployments auto-update (if configured)
3. Test thoroughly after updates

## 💡 Cost Comparison

| Platform | Frontend | Backend | Database | Total/Month |
|----------|----------|---------|----------|-------------|
| Vercel + Railway | Free | $5 | Free* | ~$5 |
| Netlify + Render | Free | $7 | Free* | ~$7 |
| Azure Static Web Apps + App Service | Free | $10-50 | Free* | $10-50 |

*Supabase has a generous free tier

## 🎯 Recommended Approach

**For beginners**: Vercel (Frontend) + Railway (Backend)
**For Azure users**: Azure Static Web Apps + Azure App Service
**For Docker enthusiasts**: Docker + Cloud Run/Fargate

Choose based on your familiarity and requirements!