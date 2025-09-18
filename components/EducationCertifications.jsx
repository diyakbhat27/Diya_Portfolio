export default function EducationCertifications({ education, certifications }) {
  return (
    <section id="education" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Education & Certifications
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            My academic journey and professional certifications that fuel my expertise in AI and ML.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <svg className="w-6 h-6 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
              </svg>
              Education
            </h3>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="relative pl-8 pb-8 border-l-2 border-blue-400 last:border-l-0 last:pb-0">
                  <div className="absolute w-4 h-4 bg-blue-400 rounded-full -left-2 top-0"></div>
                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                      <span className="text-blue-400 text-sm font-medium">{edu.year}</span>
                    </div>
                    <p className="text-gray-300 mb-2">{edu.institute}</p>
                    {edu.details && (
                      <p className="text-gray-400 text-sm">{edu.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <svg className="w-6 h-6 mr-3 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              Certifications
            </h3>
            
            <div className="grid gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-all duration-300 transform hover:scale-105">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium flex-1 pr-4">{cert.title}</h4>
                    <span className="text-purple-400 text-sm font-medium">{cert.year}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{cert.issuer}</p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
