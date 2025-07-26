import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductsPage() {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  // Use demo mode in production to avoid HTTPS/HTTP mixed content issues
  const PRODUCTION_MODE = process.env.NODE_ENV === 'production' || window.location.protocol === 'https:';

  useEffect(() => {
    if (PRODUCTION_MODE) {
      // Always use demo data in production for security
      console.log('🔒 Secure demo mode - no external API calls');
      setSummary({
        "5.5\" Cell Phones Unlocked Android 5.1 Quad Core Dual Sim-JUNING GSM/3G Smartphone White": {
          "positive": 15,
          "negative": 3,
          "neutral": 7
        },
        "Samsung Galaxy S21": {
          "positive": 25,
          "negative": 5,
          "neutral": 10
        },
        "iPhone 13": {
          "positive": 30,
          "negative": 2,
          "neutral": 8
        },
        "Google Pixel 6": {
          "positive": 20,
          "negative": 4,
          "neutral": 6
        },
        "MacBook Pro 14": {
          "positive": 28,
          "negative": 2,
          "neutral": 5
        },
        "iPad Air": {
          "positive": 22,
          "negative": 3,
          "neutral": 7
        }
      });
      setLoading(false);
      return;
    }

    // Development mode only - try backend
    axios.get('http://localhost:5000/summary')
      .then(res => {
        setSummary(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Backend connection error:', err);
        // Demo data when backend is not available
        console.log('🚀 Running in demo mode - perfect for GitHub Pages deployment!');
        setSummary({
          "5.5\" Cell Phones Unlocked Android 5.1 Quad Core Dual Sim-JUNING GSM/3G Smartphone White": {
            "positive": 15,
            "negative": 3,
            "neutral": 7
          },
          "Samsung Galaxy S21": {
            "positive": 25,
            "negative": 5,
            "neutral": 10
          },
          "iPhone 13": {
            "positive": 30,
            "negative": 2,
            "neutral": 8
          },
          "Google Pixel 6": {
            "positive": 20,
            "negative": 4,
            "neutral": 6
          }
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Product Reviews</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {Object.entries(summary).map(([product, sentiments]) => (
          <div
            key={product}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center justify-between">
              {product}
              <Link 
                to={`/product/${encodeURIComponent(product)}`}
                className="text-sm bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-200 transition"
              >
                Add Review
              </Link>
            </h3>
            <ul className="space-y-2">
              {Object.entries(sentiments).map(([sentiment, count]) => (
                <li key={sentiment} className="flex justify-between items-center">
                  <span className={
                    sentiment === 'positive' ? 'text-green-600 font-semibold' :
                    sentiment === 'negative' ? 'text-red-600 font-semibold' :
                    'text-yellow-600 font-semibold'
                  }>
                    {sentiment}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {count} reviews
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;