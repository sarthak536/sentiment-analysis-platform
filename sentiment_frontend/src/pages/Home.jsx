import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        
        <div className="mb-12">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
              Decode Emotions
            </span>
            <br />
            <span className="text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              with AI Intelligence
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
            Transform customer feedback into actionable insights with our 
            <span className="text-indigo-600 font-semibold"> state-of-the-art </span>
            sentiment analysis platform
          </p>
          
          {/* Educational Disclaimer */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 justify-center">
              <span className="text-2xl">🎓</span>
              <div className="text-center">
                <p className="text-blue-800 font-semibold text-lg mb-1">Educational Demo Project</p>
                <p className="text-blue-600 text-sm">
                  Open source platform for learning sentiment analysis • Not for commercial use • 
                  <a href="https://github.com/sarthak536/sentiment-analysis-platform" className="underline hover:text-blue-800 transition-colors">
                    View Source Code
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link 
              to="/products" 
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                Start Analyzing
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <button 
              onClick={() => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-indigo-600 text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/30"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { 
              icon: "⚡", 
              title: "Lightning Fast", 
              desc: "Get instant sentiment analysis results in milliseconds",
              gradient: "from-yellow-400 to-orange-500"
            },
            { 
              icon: "🎯", 
              title: "Highly Accurate", 
              desc: "AI-powered precision with 99.2% accuracy rate",
              gradient: "from-green-400 to-blue-500"
            },
            { 
              icon: "📊", 
              title: "Rich Analytics", 
              desc: "Comprehensive sentiment breakdown with detailed insights",
              gradient: "from-purple-400 to-pink-500"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-white/20"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { number: "150K+", label: "Reviews Analyzed" },
            { number: "99.2%", label: "Accuracy Rate" },
            { number: "English", label: "Language Focus" },
            { number: "24/7", label: "Demo Available" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;