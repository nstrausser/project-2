# Deployment Guide

## Prerequisites
- Vercel account
- Supabase project
- GitHub repository

## Setup Steps

1. Environment Variables
   In your Vercel project settings, add these environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. Deployment Configuration
   - Connect your GitHub repository to Vercel
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. Domain Setup (Optional)
   - Add your custom domain in Vercel project settings
   - Follow DNS configuration instructions

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test authentication flow
- [ ] Confirm database connections
- [ ] Check all API endpoints
- [ ] Verify static assets loading
- [ ] Test responsive design
- [ ] Monitor error reporting

## Troubleshooting

Common issues and solutions:

1. 404 on Routes
   - Ensure vercel.json has proper rewrites
   - Check build output

2. Environment Variables
   - Verify they're properly set in Vercel
   - Check naming matches .env.example

3. API Connection Issues
   - Verify Supabase URL and key
   - Check CORS settings

## Monitoring

- Set up Vercel Analytics
- Configure error tracking
- Monitor performance metrics

## Updates and Maintenance

To update the deployed application:
1. Push changes to main branch
2. Vercel will automatically deploy
3. Monitor deployment logs
4. Verify changes in production

For manual deployments: