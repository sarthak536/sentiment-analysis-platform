import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Educational demo - no actual form submission
    setTimeout(() => {
      console.log('Demo form submission:', formData);
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 relative">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* ANTI-PHISHING DISCLAIMER */}
        <div className="mb-8 p-6 bg-green-100 border-2 border-green-300 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-green-800 mb-2">🎓 Educational Demo Project</h3>
          <p className="text-green-700">
            This is a <strong>portfolio demonstration</strong> of sentiment analysis technology. 
            No personal data is collected or transmitted. All processing happens locally in your browser.
          </p>
          <p className="text-green-600 text-sm mt-2">
            Source code: <a href="https://github.com/sarthak536/sentiment-analysis-platform" className="underline font-semibold">github.com/sarthak536/sentiment-analysis-platform</a>
          </p>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              About This Demo
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore the source code, contribute, or learn about 
            <span className="text-purple-600 font-semibold"> sentiment analysis </span>
            implementation and modern web development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Project Info Column */}
          <div className="space-y-8">
            {/* Project Features Card */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm">✨</span>
                Technology Stack
              </h3>
              <div className="space-y-6">
                {[
                  { icon: "⚛️", text: "React + Vite Frontend", color: "from-blue-500 to-cyan-500" },
                  { icon: "🐍", text: "Python Flask Backend", color: "from-green-500 to-emerald-500" },
                  { icon: "🤖", text: "RoBERTa ML Model", color: "from-purple-500 to-violet-500" },
                  { icon: "🎨", text: "Tailwind CSS Design", color: "from-orange-500 to-red-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200`}>
                      {item.icon}
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer Information */}
            <div className="bg-gradient-to-br from-purple-100 via-violet-100 to-fuchsia-100 p-8 rounded-2xl border border-white/20 shadow-lg">
              <h4 className="text-xl font-bold mb-6 text-gray-800">Developer Information</h4>
              <div className="space-y-4">
                {[
                  { icon: "💻", text: "Sarthak Goel", label: "Developer" },
                  { icon: "📧", text: "sarthakgoel534@gmail.com", label: "Contact Email" },
                  { icon: "🔗", text: "github.com/sarthak536", label: "GitHub Profile" },
                  { icon: "🎓", text: "Educational Purpose Only", label: "Project Type" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-xl">{contact.icon}</span>
                    <div>
                      <p className="text-gray-700 font-medium">{contact.text}</p>
                      <p className="text-gray-500 text-sm">{contact.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Form Column */}
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/20">
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-semibold text-sm">
                🔒 Demo Form - No Data Transmitted
              </p>
              <p className="text-blue-600 text-sm">
                This form is for demonstration purposes only. No data is sent to any server.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Demo Submitted!</h3>
                <p className="text-gray-600">This was a demonstration. No data was actually sent.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="demo-name" className="block text-gray-700 font-semibold mb-3 text-lg">
                      Name (Demo Field)
                    </label>
                    <input
                      type="text"
                      id="demo-name"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your name (demo only)"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="demo-email" className="block text-gray-700 font-semibold mb-3 text-lg">
                      Email (Demo Field)
                    </label>
                    <input
                      type="email"
                      id="demo-email"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="demo@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="demo-message" className="block text-gray-700 font-semibold mb-3 text-lg">
                      Message (Demo Field)
                    </label>
                    <textarea
                      id="demo-message"
                      rows="6"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-lg"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Your thoughts about this demo project..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 hover:shadow-xl'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" fill="none"/>
                          <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Processing Demo...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Try Demo Form
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;