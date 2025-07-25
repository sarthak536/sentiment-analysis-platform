import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Product() {
  const { productType } = useParams();
  const decodedProductType = decodeURIComponent(productType || '');
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitReview = async () => {
    if (!review.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/analyze', {
        product_type: decodedProductType,
        review: review
      });
      setResult(res.data);
    } catch (e) {
      console.error('Backend error:', e);
      // Demo mode - simulate sentiment analysis
      const words = review.toLowerCase();
      let sentiment = 'neutral';
      let score = 0.5;
      
      // Simple sentiment detection for demo
      const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'awesome', 'fantastic', 'perfect', 'wonderful'];
      const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'disappointing', 'useless'];
      
      const positiveCount = positiveWords.filter(word => words.includes(word)).length;
      const negativeCount = negativeWords.filter(word => words.includes(word)).length;
      
      if (positiveCount > negativeCount) {
        sentiment = 'positive';
        score = 0.7 + (positiveCount * 0.1);
      } else if (negativeCount > positiveCount) {
        sentiment = 'negative';
        score = 0.3 + (negativeCount * 0.1);
      } else {
        sentiment = 'neutral';
        score = 0.5;
      }
      
      // Simulate API response
      setResult({
        sentiment: sentiment,
        score: Math.min(score, 0.99),
        demo_mode: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center">
          <span className="mr-2">{decodedProductType}</span>
          <span className="text-2xl">✨</span>
        </h2>
        
        <div className="space-y-6">
          <textarea
            className="w-full h-32 p-4 border-2 border-indigo-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 
                     focus:border-transparent transition-all duration-200
                     placeholder-gray-400 text-gray-700"
            value={review}
            onChange={e => setReview(e.target.value)}
            placeholder="Share your thoughts about this product..."
          />
          
          <button
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white
                     transition-all duration-200 transform hover:scale-105
                     ${isLoading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            onClick={submitReview}
            disabled={isLoading || !review.trim()}
          >
            {isLoading ? 'Analyzing...' : 'Submit Review'}
          </button>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-indigo-900">Analysis Result</h3>
              {result.demo_mode && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Demo Mode
                </span>
              )}
            </div>
            <div className="space-y-3">
              <p className="text-lg">
                Sentiment: {' '}
                <span className={`font-bold ${
                  result.sentiment === 'positive' ? 'text-green-600' :
                  result.sentiment === 'negative' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {result.sentiment}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Confidence:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.score * 100}%` }}
                  ></div>
                </div>
                <span className="text-gray-600 font-mono">
                  {(result.score * 100).toFixed(1)}%
                </span>
              </div>
              {result.demo_mode && (
                <p className="text-sm text-gray-600 mt-2">
                  * This is a demo using simple keyword detection. Connect the Flask backend for full ML analysis.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;