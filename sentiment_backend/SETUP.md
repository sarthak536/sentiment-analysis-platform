# Backend Setup Instructions

## 🔧 Environment Configuration

### 1. Copy Environment Template
```bash
cp .env.example .env
```

### 2. Configure Database (Optional)
Update `.env` with your database credentials:

```env
# Database Configuration
DB_HOST=your_database_host
DB_NAME=your_database_name  
DB_USER=your_database_user
DB_PASSWORD=your_secure_password
DB_PORT=5432
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Application
```bash
python app.py
```

## 🧪 Demo Mode

The backend automatically runs in **demo mode** if database configuration is missing or invalid. This allows the application to function without requiring a database setup.

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong passwords for production databases
- The `.env.example` file shows required environment variables without sensitive values
- Database configuration is optional - the app gracefully falls back to demo mode

## 📦 Production Deployment

For production deployment, set environment variables through your hosting platform:

### Railway/Render/Heroku
```bash
# Set via dashboard or CLI
RAILWAY_ENV_DB_HOST=your_host
RAILWAY_ENV_DB_NAME=your_db_name
# etc...
```

### Docker
```bash
docker run -e DB_HOST=your_host -e DB_PASSWORD=your_password your_app
```
