# Sentiment Analysis Backend

A Flask-based REST API for sentiment analysis of product reviews using RoBERTa model.

## Features

- Sentiment analysis using the RoBERTa model
- PostgreSQL database for storing reviews and analysis results
- CSV data preloading capability
- RESTful API endpoints for analysis and summary
- Environment-based configuration

## Prerequisites

- Python 3.8+
- PostgreSQL database server
- Required Python packages (see `requirements.txt`)

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up PostgreSQL:
   - Create a database named `sentiment_db`
   - Create a user `sentiment_user` with appropriate permissions
   - Update database configuration in `.env` file

5. Configure environment:
   - Copy `.env.example` to `.env`
   - Update the values according to your environment

## Configuration

Configure the application using environment variables in `.env` file:

```env
# Database Configuration
DB_HOST=localhost
DB_NAME=sentiment_db
DB_USER=sentiment_user
DB_PASSWORD=your_password
DB_PORT=5432

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_HOST=0.0.0.0
FLASK_PORT=5000
```

### Environment Management

Use the `manage_env.py` utility to manage environment variables:

```bash
# List all environment variables
python manage_env.py list

# Get a specific variable
python manage_env.py get DB_HOST

# Set a variable
python manage_env.py set DB_HOST localhost

# Remove a variable
python manage_env.py remove DB_HOST
```

Note: Sensitive information like `DB_PASSWORD` will be displayed as `[HIDDEN]` for security.

## Running the Application

1. Start the server:
   ```bash
   python app.py
   ```

2. The server will:
   - Initialize the database
   - Create required tables
   - Preload data from CSV if needed
   - Start the Flask server

## API Endpoints

### Analyze Sentiment
- **POST** `/analyze`
- Request body:
  ```json
  {
    "review": "Your review text here",
    "product_type": "Product category"
  }
  ```
- Response:
  ```json
  {
    "sentiment": "positive",
    "score": 0.95,
    "all_scores": {
      "negative": 0.02,
      "neutral": 0.03,
      "positive": 0.95
    }
  }
  ```

### Get Summary
- **GET** `/summary`
- Response:
  ```json
  {
    "status": "success",
    "data": {
      "Product Category 1": {
        "positive": 100,
        "neutral": 50,
        "negative": 20
      }
    }
  }
  ```

## Error Handling

The API returns appropriate HTTP status codes and error messages:
- 400: Bad Request (missing or invalid parameters)
- 500: Internal Server Error (database or processing errors)

## Security Notes

- Never commit `.env` file with sensitive information
- Use strong passwords for database access
- Configure CORS settings appropriately in production