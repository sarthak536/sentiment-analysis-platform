import csv
from model_utils import analyze_sentiment
import random

CSV_PATH = "Amazon_Unlocked_Mobile.csv"


def test_sample_reviews(n=5):
    with open(CSV_PATH, encoding="utf-8") as f:
        reader = list(csv.DictReader(f))
        sample_rows = random.sample(reader, min(n, len(reader)))
        print(f"\n--- Testing {len(sample_rows)} random sample reviews ---\n")
        for row in sample_rows:
            review = row.get("Reviews", "").strip()
            product = row.get("Product Name", "Unknown")
            if not review:
                continue
            sentiment_scores = analyze_sentiment(review)
            label = max(sentiment_scores, key=sentiment_scores.get)
            print(f"Product: {product}")
            print(f"Review : {review[:100]}{'...' if len(review) > 100 else ''}")
            print(f"Sentiment: {label} ({round(sentiment_scores[label]*100, 2)}%)")
            print("-" * 60)

if __name__ == "__main__":
    test_sample_reviews(n=5)
