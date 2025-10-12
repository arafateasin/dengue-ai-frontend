# 🦟 Dengue Guard AI - Frontend

Modern React frontend for the Dengue Guard AI system with real-time analytics and AI-powered predictions.

## 🚀 Features

- **Real-time Dashboard** - Live dengue risk monitoring
- **AI Image Analysis** - Upload images for breeding site detection
- **Interactive Maps** - Risk heatmaps and outbreak visualization
- **Weather Integration** - Real-time weather-based predictions
- **Mobile Responsive** - Works on all devices
- **Modern UI** - Built with React + TypeScript + Tailwind CSS

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Radix UI** for components
- **Recharts** for data visualization
- **React Hook Form** for forms
- **Axios** for API communication

## 🏃‍♂️ Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/arafateasin/dengue-ai-frontend.git
cd dengue-ai-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Development server: http://localhost:8080

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Environment Configuration

Create `.env` file:

```env
# Development
VITE_API_URL=http://localhost:8002
VITE_ENVIRONMENT=development

# Production (Vercel will auto-set)
VITE_API_URL=https://your-backend.railway.app
VITE_ENVIRONMENT=production
```

## 🚀 Deployment (Vercel)

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**: This repository
2. **Import to Vercel**: https://vercel.com/new
3. **Configure**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Environment Variables**:
   - `VITE_API_URL`: Your Railway backend URL
5. **Deploy** - Automatic deployments on every push!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

## 📱 Features Overview

### 🏠 Home Page

- Hero section with AI capabilities
- Feature highlights
- Call-to-action buttons

### 📊 Dashboard

- Real-time dengue case statistics
- Risk level indicators
- Weather data integration
- Interactive charts

### 🔍 Prediction

- Image upload for breeding site detection
- AI-powered risk assessment
- Location-based predictions
- Results visualization

### 📈 Reports

- Historical data analysis
- Trend visualizations
- Export capabilities
- Detailed insights

## 🗂️ Project Structure

```
dengue-ai-frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Main page components
│   ├── services/        # API services
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and configs
│   └── assets/          # Static assets
├── public/              # Public assets
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
└── tailwind.config.ts   # Tailwind CSS config
```

## 🎨 UI Components

Built with **Radix UI** and **Tailwind CSS**:

- Modern, accessible components
- Dark/light mode support
- Responsive design
- Consistent styling

## 🔌 API Integration

The frontend communicates with the backend API:

- RESTful API calls
- Real-time data updates
- Error handling
- Loading states

## 📊 Charts & Visualization

Using **Recharts** for:

- Line charts (trends)
- Bar charts (statistics)
- Pie charts (distributions)
- Area charts (risk maps)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🐛 Issues

Report issues at: https://github.com/arafateasin/dengue-ai-frontend/issues

---

**Made with ❤️ for dengue prevention and public health**

## 📸 Screenshots

_Add screenshots of your application here_

## 🌟 Live Demo

**Frontend**: https://your-app.vercel.app
**Backend API**: https://your-backend.railway.app/docs
