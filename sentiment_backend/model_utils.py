from transformers import AutoTokenizer, AutoModelForSequenceClassification
from scipy.special import softmax
import torch

MODEL = "cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

def analyze_sentiment(text):
    # Truncate text if too long
    max_tokens = 512
    encoded_input = tokenizer(text, return_tensors="pt", truncation=True, max_length=max_tokens)

    with torch.no_grad():
        output = model(**encoded_input)

    scores = softmax(output[0][0].numpy())
    return {
        "negative": float(scores[0]),
        "neutral": float(scores[1]),
        "positive": float(scores[2])
    }
