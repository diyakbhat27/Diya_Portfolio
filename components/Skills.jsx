export default function Skills({ skills }) {
  const skillCategories = {
    'Programming Languages': ['Python', 'Java', 'C++', 'C', 'R'],
    'Data & Databases': ['SQL', 'MySQL', 'MongoDB'],
    'Cloud & DevOps': ['AWS', 'Google Cloud'],
    'AI/ML & Analytics': ['OpenAI APIs', 'Tableau', 'Power BI'],
    'Methodologies': ['Agile Methadologies', 'Remote Collaboration']
  };

  const getSkillsInCategory = (categorySkills) => {
    return categorySkills.filter(skill => skills.includes(skill));
  };

  const getSkillIcon = (skill) => {
    const icons = {
      'Python': '🐍',
      'Java': '☕',
      'C++': '⚡',
      'C': '🔧',
      'R': '📊',
      'SQL': '🗃️',
      'MySQL': '🐬',
      'MongoDB': '🍃',
      'AWS': '☁️',
      'Google Cloud': '🌤️',
      'OpenAI APIs': '🤖',
      'Tableau': '📈',
      'Power BI': '📊',
      'Agile Methadologies': '🔄',
      'Remote Collaboration': '🌐'
    };
    return icons[skill] || '💻';
  };

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A comprehensive toolkit spanning AI/ML, cloud computing, data analysis, and software development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, categorySkills]) => {
            const availableSkills = getSkillsInCategory(categorySkills);
            if (availableSkills.length === 0) return null;

            return (
              <div key={category} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-600/50 transition-all duration-300">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  {category}
                </h3>
                
                <div className="space-y-3">
                  {availableSkills.map((skill, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                    >
                      <span className="text-2xl">{getSkillIcon(skill)}</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors flex-1">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-blue-600/30">
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-gray-300 max-w-2xl">
              Technology evolves rapidly, and I'm committed to staying at the forefront of AI/ML innovations, 
              continuously expanding my skillset to deliver cutting-edge solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
