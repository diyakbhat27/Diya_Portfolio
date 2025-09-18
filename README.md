# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Clean, professional design
- Responsive across all devices
- Fast loading with Next.js optimization
- Easy content management through `data.json`
- Resume download functionality
- Social media integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Content Management

### Editing Portfolio Data

All portfolio content is managed through the `data.json` file in the root directory. This includes:

- **Profile Information**: Name, headline, bio, contact details
- **Projects**: Descriptions, technologies, links
- **Education**: Degrees, institutions, years
- **Certifications**: Titles, issuers, links
- **Skills**: Technical and professional skills
- **Achievements**: Roles and activities

To update your portfolio:

1. Open `data.json` in any text editor
2. Modify the relevant sections
3. Save the file
4. The changes will appear automatically in development mode

### Replacing Resume

1. Replace the `resume.pdf` file in the root directory with your actual resume
2. Ensure the file is named exactly `resume.pdf`
3. The download link will automatically work

### Adding Profile Picture

1. Add your profile picture to the `public/assets/` directory
2. Name it `avatar.jpg` or update the path in `data.json`
3. Recommended size: 400x400px

## Resume Parsing (Optional)

Use the included Python script to automatically extract information from your resume:

### Setup Python Environment

```bash
pip install -r requirements.txt
```

### Running the Parser

```bash
python parse_resume.py
```

This script will:
- Extract email and phone from your resume PDF
- Identify technical skills
- Offer to update your `data.json` file

## Building for Production

### Build the Application

```bash
npm run build
```

### Test Production Build Locally

```bash
npm start
```

## Deployment Options

### Vercel (Recommended)

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Deploy
```bash
vercel
```

3. Follow the prompts to complete deployment

**Alternative**: Connect your GitHub repository to Vercel dashboard for automatic deployments.

### Netlify

1. Build your site
```bash
npm run build
```

2. Install Netlify CLI
```bash
npm install -g netlify-cli
```

3. Deploy
```bash
netlify deploy --prod --dir=out
```

**Alternative**: Drag and drop the `out` folder to Netlify dashboard.

### GitHub Pages

1. Update `next.config.js` with your repository name:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/your-repo-name',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

2. Build and export
```bash
npm run build
```

3. Deploy the `out` folder to your `gh-pages` branch

### Other Platforms

The built application in the `out` folder can be deployed to any static hosting service:
- Firebase Hosting
- AWS S3 + CloudFront
- Cloudflare Pages
- Surge.sh

## Creating Short URLs

After deployment, create memorable short URLs for easy sharing:

### TinyURL
1. Visit [tinyurl.com](https://tinyurl.com)
2. Paste your portfolio URL
3. Customize the alias if desired
4. Copy the short URL

### Bitly
1. Visit [bitly.com](https://bitly.com)
2. Sign up for a free account
3. Paste your portfolio URL
4. Customize the back-half if desired
5. Copy the short link

## Project Structure

```
portfolio/
├── components/          # React components
├── pages/              # Next.js pages
├── public/             # Static assets
│   └── assets/         # Images and files
├── styles/             # CSS and styling
├── data.json           # Portfolio content
├── resume.pdf          # Your resume file
├── parse_resume.py     # Resume parsing script
├── requirements.txt    # Python dependencies
└── README.md           # This file
```

## Customization

### Styling
- Edit `tailwind.config.js` for theme customization
- Modify component styles in the `components/` directory
- Add custom CSS in `styles/globals.css`

### Components
- Header: Navigation and branding
- Hero: Main introduction section
- About: Detailed bio and skills
- Projects: Portfolio showcase
- Education: Academic background
- Contact: Contact information and social links

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `python parse_resume.py` - Parse resume data

## Support

For issues or questions:
1. Check the GitHub Issues page
2. Review the Next.js documentation
3. Consult Tailwind CSS docs for styling

## License

This project is open source and available under the MIT License.
