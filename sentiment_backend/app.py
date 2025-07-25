from flask import Flask, request, jsonify
from flask_cors import CORS
from model_utils import analyze_sentiment
import psycopg2
from psycopg2.extras import RealDictCursor
import csv
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


#Flask app init
app=Flask(__name__)
CORS(app)

# Load environment variables for database configuration
def get_db_config():
    return {
        "host": os.getenv("DB_HOST", "localhost"),
        "dbname": os.getenv("DB_NAME", "sentiment_db"),
        "user": os.getenv("DB_USER", "sentiment_user"),
        "password": os.getenv("DB_PASSWORD", "SA@g250804"),
        "port": int(os.getenv("DB_PORT", "5432"))
    }

# Validate database configuration
def validate_db_config(config):
    required_fields = ["host", "dbname", "user", "password", "port"]
    for field in required_fields:
        if not config.get(field):
            raise ValueError(f"Missing required database configuration field: {field}")
    
    if not isinstance(config["port"], int) or config["port"] < 1 or config["port"] > 65535:
        raise ValueError("Invalid database port number")

# Initialize database configuration
try:
    DB_CONFIG = get_db_config()
    validate_db_config(DB_CONFIG)
    print("[INFO] Database configuration validated successfully")
except Exception as e:
    print(f"[ERROR] Invalid database configuration: {e}")
    raise

CSV_PATH = os.path.join(os.path.dirname(__file__), "Amazon_Unlocked_Mobile.csv")

def check_file_permissions():
    try:
        # Check if file exists
        if not os.path.exists(CSV_PATH):
            print(f"[ERROR] CSV file {CSV_PATH} not found")
            return False
            
        # Check read permissions
        with open(CSV_PATH, 'r', encoding='utf-8') as f:
            f.read(1)
            
        return True
    except PermissionError:
        print(f"[ERROR] No permission to read {CSV_PATH}. Please check file permissions.")
        return False
    except Exception as e:
        print(f"[ERROR] Failed to access {CSV_PATH}: {e}")
        return False

# Connect to PostgreSQL
def get_connection():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("[INFO] Successfully connected to PostgreSQL database")
        return conn
    except psycopg2.Error as e:
        print(f"[ERROR] Failed to connect to PostgreSQL database: {e}")
        raise

# Create table
def init_db():
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                print("[INFO] Creating reviews table if not exists...")
                cur.execute("""
                CREATE TABLE IF NOT EXISTS reviews(
                    id SERIAL PRIMARY KEY,
                    product_type TEXT NOT NULL,
                    review TEXT NOT NULL,
                    sentiment TEXT NOT NULL,
                    score REAL NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP     
                )
                """)
                conn.commit()
                print("[INFO] Reviews table created successfully")
    except psycopg2.Error as e:
        print(f"[ERROR] Failed to create reviews table: {e}")
        raise

def clear_reviews_table():
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM reviews")
                conn.commit()
                print("[INFO] Cleared all data from reviews table.")
    except Exception as e:
        print(f"[ERROR] Failed to clear reviews table: {e}")

#Load CSV if table is empty
def preload_csv_if_needed():
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT COUNT(*) FROM reviews")
                count = cur.fetchone()[0]
                if count == 0:
                    print("[INFO] Preloading reviews from CSV...")
                    if not check_file_permissions():
                        print("[ERROR] Skipping CSV preload due to file access issues")
                        return
                    
                    try:
                        with open(CSV_PATH, encoding="utf-8") as f:
                            reader = csv.DictReader(f)
                            processed = 0
                            for row in reader:
                                review_text = row.get("Reviews", "").strip()
                                product = row.get("Product Name", "").strip() or "Unknown"

                                if not review_text:
                                    continue

                                try:
                                    scores = analyze_sentiment(review_text)
                                    label = max(scores, key=scores.get)
                                    confidence = float(scores[label])

                                    cur.execute("""
                                        INSERT INTO reviews (product_type, review, sentiment, score)
                                        VALUES (%s, %s, %s, %s)
                                    """, (product, review_text, label, confidence))
                                    processed += 1
                                    if processed % 100 == 0:
                                        print(f"[INFO] Processed {processed} reviews...")
                                except Exception as e:
                                    print(f"[WARNING] Failed to process review: {e}")
                                    continue
                            
                            conn.commit()
                            print(f"[INFO] CSV data loaded successfully. Processed {processed} reviews.")
                    except Exception as e:
                        print(f"[ERROR] Failed to read CSV file: {e}")
                        raise
                else:
                    print("[INFO] Reviews already exist in DB. Skipping CSV load.")
    except Exception as e:
        print(f"[ERROR] Failed to preload CSV data: {e}")
        raise

@app.route("/analyze",methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400

        review_text = data.get("review", "").strip()
        product_type = data.get("product_type", "").strip()

        if not review_text or not product_type:
            return jsonify({"error": "Missing 'review' or 'product_type'"}), 400
        
        try:
            scores = analyze_sentiment(review_text)
            label = max(scores, key=scores.get)
            confidence = float(scores[label])
        except Exception as e:
            print(f"[ERROR] Failed to analyze sentiment: {e}")
            return jsonify({"error": "Failed to analyze sentiment"}), 500

        try:
            with get_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                    INSERT INTO reviews (product_type, review, sentiment, score)
                    VALUES (%s, %s, %s, %s)
                    """, (product_type, review_text, label, confidence))
                    conn.commit()

            return jsonify({
                "sentiment": label,
                "score": confidence,
                "all_scores": scores
            })
        except Exception as e:
            print(f"[ERROR] Failed to save review to database: {e}")
            return jsonify({"error": "Failed to save review"}), 500
    except Exception as e:
        print(f"[ERROR] Unexpected error in analyze endpoint: {e}")
        return jsonify({"error": "Internal server error"}), 500
    
@app.route("/summary", methods=["GET"])
def summary():
    try:
        with get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT product_type, sentiment, COUNT(*) AS count
                    FROM reviews
                    GROUP BY product_type, sentiment
                    ORDER BY product_type, sentiment
                """)
                rows = cur.fetchall()

        summary = {}
        for row in rows:
            product = row["product_type"]
            sentiment = row["sentiment"]
            count = row["count"]
            if product not in summary:
                summary[product] = {}
            summary[product][sentiment] = count

        return jsonify({
            "status": "success",
            "data": summary
        })
    except Exception as e:
        print(f"[ERROR] Failed to get sentiment summary: {e}")
        return jsonify({"error": "Failed to get sentiment summary"}), 500

if __name__ == "__main__":
    # Initialize Flask configuration
    app.config.update(
        ENV=os.getenv("FLASK_ENV", "development"),
        DEBUG=os.getenv("FLASK_DEBUG", "True").lower() == "true",
    )
    
    # Initialize database and load data
    init_db()
    # clear_reviews_table()  # Clear table for dev use only
    preload_csv_if_needed()
    
    # Start the server
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", 5000))
    print(f"[INFO] Starting server on {host}:{port}")
    app.run(host=host, port=port)