# ✅ Deployment Checklist

## Pre-Deployment
- [ ] Test application locally (`npm start` + `mvn spring-boot:run`)
- [ ] Run all tests (`npm test` + `mvn test`)
- [ ] Build successful (`npm run build` + `mvn clean package`)
- [ ] Environment variables configured
- [ ] Supabase database accessible
- [ ] Razorpay credentials valid

## Frontend Deployment (Vercel)
- [ ] GitHub repository pushed
- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Build settings configured
- [ ] Environment variables set:
  - [ ] `REACT_APP_API_URL`
- [ ] Domain configured (optional)
- [ ] HTTPS enabled
- [ ] Deployment successful

## Backend Deployment (Railway)
- [ ] GitHub repository pushed
- [ ] Railway account created
- [ ] Repository connected to Railway
- [ ] Java runtime detected
- [ ] Environment variables set:
  - [ ] `DATABASE_URL`
  - [ ] `DB_USERNAME`
  - [ ] `DB_PASSWORD`
  - [ ] `RAZORPAY_KEY_ID`
  - [ ] `RAZORPAY_KEY_SECRET`
  - [ ] `ALLOWED_ORIGINS`
- [ ] Database connection tested
- [ ] Health endpoint responding
- [ ] Deployment successful

## Post-Deployment Testing
- [ ] Frontend loads correctly
- [ ] Backend API accessible
- [ ] Payment flow works end-to-end
- [ ] Database records created
- [ ] Razorpay integration working
- [ ] Mobile responsive
- [ ] All links functional

## Production Monitoring
- [ ] Error logging configured
- [ ] Performance monitoring set up
- [ ] Backup strategy in place
- [ ] SSL certificates valid
- [ ] Domain DNS configured
- [ ] CDN configured (optional)

## Security Checklist
- [ ] Environment variables not in code
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Sensitive data encrypted
- [ ] API keys secured
- [ ] Database credentials protected

## Go-Live
- [ ] Final testing completed
- [ ] Stakeholders notified
- [ ] Documentation updated
- [ ] Support channels ready
- [ ] Monitoring alerts configured

---
**Status**: ⏳ Ready for deployment