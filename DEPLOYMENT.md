# Deployment Guide - Khanqah Yaseen Zai Website

This guide covers deploying both the React frontend and Django backend to production.

## Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.9+ and pip
- PostgreSQL database
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)

---

## Frontend Deployment (Vercel/Netlify)

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub/GitLab
   - Import project in Vercel dashboard

2. **Environment Variables**
   Add these in Vercel project settings:
   ```
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

3. **Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Vercel will auto-deploy on git push
   - Custom domain can be added in project settings

### Option 2: Netlify

1. **Connect Repository** (same as Vercel)

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Environment Variables**
   ```
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

---

## Backend Deployment (Options)

### Option 1: Railway.app (Easiest)

1. **Create Account** at railway.app
2. **New Project** → Deploy from GitHub
3. **Add PostgreSQL** service
4. **Environment Variables** (from `khanqah-backend/env.example`):
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=api.yourdomain.com,railway.app
   DATABASE_NAME=railway
   DATABASE_USER=postgres
   DATABASE_PASSWORD=(from Railway PostgreSQL service)
   DATABASE_HOST=(from Railway PostgreSQL service)
   DATABASE_PORT=5432
   CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-app-password
   CONTACT_RECIPIENT_EMAIL=recipient@gmail.com
   ```

5. **Deploy**
   - Railway auto-detects Django
   - Add custom domain in settings

### Option 2: Render.com

1. **Create Web Service**
   - Connect GitHub repo
   - Root Directory: `khanqah-backend`
   - Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - Start Command: `gunicorn khanqah_backend.wsgi:application`

2. **Add PostgreSQL Database**
   - Create new PostgreSQL service
   - Use connection string in environment variables

3. **Environment Variables** (same as Railway)

### Option 3: VPS (DigitalOcean, AWS EC2, etc.)

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Python, PostgreSQL, Nginx
   sudo apt install python3-pip python3-venv postgresql nginx certbot python3-certbot-nginx -y
   ```

2. **Clone Repository**
   ```bash
   git clone <your-repo-url>
   cd khanqah-site/khanqah-backend
   ```

3. **Create Virtual Environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. **Setup PostgreSQL**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE khanqah_db;
   CREATE USER khanqah_user WITH PASSWORD 'your-password';
   GRANT ALL PRIVILEGES ON DATABASE khanqah_db TO khanqah_user;
   \q
   ```

5. **Environment Variables**
   ```bash
   cp env.example .env
   nano .env  # Edit with your values
   ```

6. **Run Migrations**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py collectstatic --noinput
   ```

7. **Setup Gunicorn**
   ```bash
   pip install gunicorn
   ```

8. **Create Systemd Service**
   ```bash
   sudo nano /etc/systemd/system/khanqah-backend.service
   ```
   
   Add:
   ```ini
   [Unit]
   Description=Khanqah Backend Gunicorn
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/path/to/khanqah-backend
   Environment="PATH=/path/to/khanqah-backend/venv/bin"
   ExecStart=/path/to/khanqah-backend/venv/bin/gunicorn \
       --workers 3 \
       --bind unix:/path/to/khanqah-backend/khanqah.sock \
       khanqah_backend.wsgi:application

   [Install]
   WantedBy=multi-user.target
   ```

9. **Start Service**
   ```bash
   sudo systemctl start khanqah-backend
   sudo systemctl enable khanqah-backend
   ```

10. **Configure Nginx**
    ```bash
    sudo nano /etc/nginx/sites-available/khanqah-backend
    ```
    
    Add:
    ```nginx
    server {
        listen 80;
        server_name api.yourdomain.com;

        location / {
            include proxy_params;
            proxy_pass http://unix:/path/to/khanqah-backend/khanqah.sock;
        }

        location /static/ {
            alias /path/to/khanqah-backend/staticfiles/;
        }

        location /media/ {
            alias /path/to/khanqah-backend/media/;
        }
    }
    ```

11. **Enable Site & SSL**
    ```bash
    sudo ln -s /etc/nginx/sites-available/khanqah-backend /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl reload nginx
    sudo certbot --nginx -d api.yourdomain.com
    ```

---

## Post-Deployment Checklist

### Backend
- [ ] All environment variables set correctly
- [ ] Database migrations applied
- [ ] Static files collected (`collectstatic`)
- [ ] Media files accessible
- [ ] Admin user created
- [ ] CORS origins configured correctly
- [ ] SSL certificate installed
- [ ] Logs directory created and writable
- [ ] Email settings tested

### Frontend
- [ ] Environment variable `VITE_API_BASE_URL` set
- [ ] Build completes without errors
- [ ] All API calls working
- [ ] Images loading correctly
- [ ] Bilingual switching works
- [ ] Contact form submits successfully

### Testing
- [ ] Homepage loads
- [ ] All pages accessible
- [ ] Publications load
- [ ] Gallery images display
- [ ] Video/Audio players work
- [ ] Contact form sends emails
- [ ] Mobile responsive
- [ ] SEO meta tags present

---

## Environment Variables Reference

### Frontend (`env.example`)
```
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (`khanqah-backend/env.example`)
```
SECRET_KEY=change-me
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,api.yourdomain.com

DATABASE_NAME=khanqah_db
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_HOST=localhost
DATABASE_PORT=5432

CORS_ALLOWED_ORIGINS=https://yourdomain.com
CSRF_TRUSTED_ORIGINS=https://yourdomain.com

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=you@gmail.com
EMAIL_HOST_PASSWORD=app-password
CONTACT_RECIPIENT_EMAIL=recipient@gmail.com

LANGUAGE_CODE=en-us
TIME_ZONE=Asia/Karachi
```

---

## Troubleshooting

### Backend Issues

**Database Connection Error**
- Check DATABASE_HOST, PORT, NAME, USER, PASSWORD
- Ensure PostgreSQL is running
- Verify firewall allows connection

**Static Files Not Loading**
- Run `python manage.py collectstatic`
- Check STATIC_ROOT path
- Verify Nginx/webserver static file configuration

**CORS Errors**
- Add frontend domain to CORS_ALLOWED_ORIGINS
- Check CSRF_TRUSTED_ORIGINS
- Verify environment variables are loaded

**Email Not Sending**
- Check EMAIL_HOST_USER and EMAIL_HOST_PASSWORD
- For Gmail, use App Password (not regular password)
- Verify SMTP settings

### Frontend Issues

**API Calls Failing**
- Verify VITE_API_BASE_URL is set correctly
- Check CORS configuration on backend
- Inspect browser console for errors

**Build Errors**
- Clear node_modules and reinstall
- Check for TypeScript/ESLint errors
- Verify all dependencies in package.json

---

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review logs weekly
- Backup database daily
- Monitor disk space for media files

### Backup Strategy
```bash
# Database backup
pg_dump khanqah_db > backup_$(date +%Y%m%d).sql

# Media files backup
tar -czf media_backup_$(date +%Y%m%d).tar.gz media/
```

---

## Support

For issues or questions:
- Check logs: `khanqah-backend/logs/django.log`
- Review error messages in browser console
- Verify environment variables are set correctly

