import React from 'react';

function About() {
  return (
    <section id="about" className="min-h-screen flex items-center py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About Our Technology
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Powered by cutting-edge natural language processing, our platform delivers 
            <span className="text-indigo-600 font-semibold"> unmatched accuracy </span>
            in sentiment detection
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features Column */}
          <div className="space-y-8">
            {[
              {
                icon: "🧠",
                title: "Advanced AI Models",
                desc: "Our sentiment analysis uses state-of-the-art transformer models trained on millions of text samples to understand context, sarcasm, and nuanced emotions.",
                color: "from-purple-500 to-indigo-600"
              },
              {
                icon: "⚡",
                title: "Real-time Processing",
                desc: "Get instant results with our optimized processing pipeline that can handle thousands of reviews per second with minimal latency.",
                color: "from-blue-500 to-cyan-600"
              },
              {
                icon: "📈",
                title: "Actionable Insights",
                desc: "Transform raw sentiment data into meaningful business intelligence with our comprehensive analytics and visualization tools.",
                color: "from-green-500 to-teal-600"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Column */}
          <div className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-10 rounded-3xl border border-white/20 shadow-xl">
            <div className="text-center space-y-8">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                99.2% Accuracy
              </h3>
              <p className="text-gray-700 text-lg font-medium">
                Validated across multiple datasets and industries
              </p>
              
              {/* Achievement Grid */}
              <div className="grid grid-cols-2 gap-6 mt-10">
                {[
                  { metric: "150K+", label: "Reviews Analyzed", icon: "📊" },
                  { metric: "25+", label: "Languages", icon: "🌍" },
                  { metric: "500+", label: "Companies", icon: "🏢" },
                  { metric: "<100ms", label: "Response Time", icon: "⚡" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center hover:scale-105 transition-transform duration-200">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-xl font-bold text-indigo-600">{stat.metric}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Technology Stack */}
              <div className="mt-8 p-6 bg-white/40 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-4">Powered By</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["PyTorch", "Transformers", "BERT", "RoBERTa", "Flask", "React"].map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;