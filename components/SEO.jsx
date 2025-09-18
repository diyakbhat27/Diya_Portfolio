import Head from 'next/head';

export default function SEO({ title, description, url, image, keywords, author }) {
  const siteTitle = 'Diya K Bhat - AI & ML Engineer | Portfolio';
  const siteDescription = 'AI & ML engineering student with expertise in Python, SQL, data science, and cloud platforms. Experienced in computer vision, predictive modeling, and building deployable AI/ML systems.';
  const siteUrl = 'https://diyakbhat.dev';
  const siteImage = '/assets/avatar.jpg';

  return (
    <Head>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || siteDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description || siteDescription} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:image" content={image || siteImage} />
      <meta property="og:site_name" content="Diya K Bhat Portfolio" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description || siteDescription} />
      <meta name="twitter:image" content={image || siteImage} />
      
      <meta name="keywords" content={keywords || "AI, Machine Learning, Data Science, Python, Computer Vision, Cloud Computing, AWS, Google Cloud, Portfolio"} />
      <meta name="author" content={author || "Diya K Bhat"} />
      <meta name="robots" content="index, follow" />
      
      <link rel="canonical" href={url || siteUrl} />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Diya K Bhat",
          "jobTitle": "AI & ML Engineer",
          "url": siteUrl,
          "sameAs": [
            "https://github.com/diyakbhat27",
            "https://www.linkedin.com/in/diya-k-bhat-75b450257"
          ],
          "alumniOf": "Jyothy Institute of Technology",
          "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Data Science", "Python", "Computer Vision"]
        })}
      </script>
    </Head>
  );
}
