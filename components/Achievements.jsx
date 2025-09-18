export default function Achievements({ achievements }) {
  const getAchievementIcon = (role) => {
    const iconMap = {
      'Assistant Editor': '📝',
      'Student Placement Coordinator': '🎯',
      'Campus Ambassador': '🌟',
      'Documentation Lead': '📚',
      'Social Media Lead': '📱',
      'Publication': '📄',
      'Conference Presentation': '🎤'
    };
    return iconMap[role] || '🏆';
  };

  const getAchievementColor = (role) => {
    const colorMap = {
      'Assistant Editor': 'from-green-600/20 to-emerald-600/20 border-green-600/30',
      'Student Placement Coordinator': 'from-blue-600/20 to-cyan-600/20 border-blue-600/30',
      'Campus Ambassador': 'from-yellow-600/20 to-orange-600/20 border-yellow-600/30',
      'Documentation Lead': 'from-purple-600/20 to-violet-600/20 border-purple-600/30',
      'Social Media Lead': 'from-pink-600/20 to-rose-600/20 border-pink-600/30',
      'Publication': 'from-indigo-600/20 to-blue-600/20 border-indigo-600/30',
      'Conference Presentation': 'from-red-600/20 to-pink-600/20 border-red-600/30'
    };
    return colorMap[role] || 'from-gray-600/20 to-gray-700/20 border-gray-600/30';
  };

  return (
    <section id="achievements" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Achievements & Leadership
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Beyond technical expertise, I actively contribute to academic communities and lead initiatives 
            that drive innovation and collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${getAchievementColor(achievement.role)} rounded-xl p-6 border hover:scale-105 transform transition-all duration-300 hover:shadow-2xl`}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 mt-1">
                  {getAchievementIcon(achievement.role)}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {achievement.role}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {achievement.activity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-600/20">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Impact Through Leadership
              </h3>
              
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                I believe in the power of collaboration and knowledge sharing. Through various leadership roles 
                and publications, I strive to contribute to the academic community and inspire the next generation 
                of AI/ML enthusiasts.
              </p>
              
              <div className="mt-8 flex justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">{achievements.length}</div>
                  <div className="text-gray-400 text-sm">Achievements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-1">5+</div>
                  <div className="text-gray-400 text-sm">Leadership Roles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-1">2</div>
                  <div className="text-gray-400 text-sm">Publications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
