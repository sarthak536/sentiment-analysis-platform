# 🚀 Deployment Guide

## Frontend Demo Deployment (Recommended)

### GitHub Pages (Automatic)
1. Push to main branch
2. GitHub Actions will automatically build and deploy
3. Visit: `https://sarthak536.github.io/sentiment-analysis-platform/`

### Manual Deployment Options

#### Netlify
1. Build the project: `cd sentiment_frontend && npm run build:demo`
2. Drag `sentiment_frontend/dist` folder to [Netlify Drop](https://app.netlify.com/drop)

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `cd sentiment_frontend && vercel --prod`

## Full Stack Deployment

### Backend Setup (Optional)
See [sentiment_backend/SETUP.md](sentiment_backend/SETUP.md) for complete backend deployment.

## Environment Configuration

### Demo Mode (Current)
- ✅ No backend required
- ✅ Built-in demo data
- ✅ Keyword-based sentiment analysis
- ✅ Perfect for portfolios

### Production Mode
- 🔧 Requires Flask backend
- 🔧 Requires PostgreSQL database
- 🔧 Full ML sentiment analysis
- 🔧 Real-time data processing

## Post-Deployment

1. **Enable GitHub Pages**: Repository Settings → Pages → Deploy from branch `gh-pages`
2. **Custom Domain** (Optional): Add CNAME file with your domain
3. **SSL**: Automatically provided by GitHub Pages

## Demo Features

When deployed, your app will showcase:
- 🎨 Modern React + Tailwind CSS frontend
- 🔄 Smooth single-page navigation
- 📱 Fully responsive design
- 🤖 Demo sentiment analysis
- 🎯 Professional UI/UX
- ⚡ Fast loading with Vite
