# Deployment Instructions

This document provides step-by-step instructions for deploying your portfolio website to different hosting platforms.

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Test locally**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🌐 GitHub Pages (Recommended for Portfolios)

### Automatic Deployment (GitHub Actions)

1. **Push to GitHub**: Your repository already has GitHub Actions configured
2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (auto-created by GitHub Actions)
   - Save

3. **Custom Domain** (Optional):
   - Add CNAME record: `yourdomain.com` → `username.github.io`
   - Update repository settings with custom domain

### Manual Deployment

```bash
npm run deploy:gh
```

## 🎯 Netlify

### Automatic Deployment

1. **Connect Repository**:
   - Sign up/login to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Custom Domain**:
   - Go to Site settings → Domain management
   - Add custom domain
   - Configure DNS records

### Manual Deployment

```bash
npm run deploy:netlify
```

## ⚡ Vercel

### Automatic Deployment

1. **Import Project**:
   - Sign up/login to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Framework preset: Other
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Custom Domain**:
   - Go to Project settings → Domains
   - Add custom domain
   - Configure DNS records

## 🔧 Configuration Files

### GitHub Actions (`.github/workflows/deploy.yml`)
- Automatically builds and deploys on push to main branch
- Minifies HTML, CSS, and JavaScript
- Deploys to GitHub Pages

### Netlify (`netlify.toml`)
- Build configuration
- Redirects and headers
- Environment variables

### Vercel (`vercel.json`)
- Build configuration
- Routes and redirects
- Headers and caching

## 📱 Environment Variables

Create `.env` file for local development:

```env
NODE_ENV=development
SITE_URL=http://localhost:3000
```

## 🧪 Testing Before Deploy

1. **Validate HTML**:
   ```bash
   npm run validate:html
   ```

2. **Validate CSS**:
   ```bash
   npm run validate:css
   ```

3. **Lint JavaScript**:
   ```bash
   npm run lint:js
   ```

4. **Run all tests**:
   ```bash
   npm test
   ```

5. **Test locally**:
   ```bash
   npm run serve
   ```

## 🚀 Production Build

```bash
# Clean previous builds
npm run clean

# Build for production
npm run dist

# Test production build locally
npm run serve
```

## 🔍 Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Navigation works on all devices
- [ ] Forms submit properly
- [ ] Images and assets load
- [ ] Performance is acceptable
- [ ] Mobile responsiveness works
- [ ] Cross-browser compatibility
- [ ] SSL certificate is active
- [ ] Custom domain is working
- [ ] Analytics are tracking

## 🛠️ Troubleshooting

### Common Issues

1. **Build fails**:
   - Check Node.js version (requires 18+)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

2. **Assets not loading**:
   - Check file paths in HTML
   - Verify build output structure
   - Check for case sensitivity issues

3. **Deploy fails**:
   - Check GitHub Actions logs
   - Verify repository permissions
   - Check build command and output directory

4. **Custom domain not working**:
   - Verify DNS records
   - Check platform-specific settings
   - Allow time for DNS propagation

### Performance Optimization

1. **Enable compression**:
   - Gzip/Brotli compression
   - Minify all assets
   - Optimize images

2. **Caching**:
   - Set appropriate cache headers
   - Use CDN for static assets
   - Implement service worker (optional)

3. **Monitoring**:
   - Set up performance monitoring
   - Monitor Core Web Vitals
   - Track user experience metrics

## 📚 Additional Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Web Performance Best Practices](https://web.dev/performance/)
- [SEO Best Practices](https://developers.google.com/search/docs)

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Check GitHub Issues for similar problems
4. Create a new issue with detailed information

---

**Happy Deploying! 🎉**
