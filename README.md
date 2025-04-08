# NIBM Tower Cranes Website

This is the official website for NIBM Tower Cranes, a company specializing in the sale and rental of tower cranes, offering a full-service concept including planning, transport, mounting, inspections, training, and after-sales support.

## Features

- Modern, responsive design built with Next.js and Tailwind CSS
- Interactive UI components powered by Framer Motion animations
- Comprehensive content sections:
  - Home page with hero section, services overview, and featured cranes
  - About Us page with company history, mission, vision, and team information
  - Services page detailing all offered services
  - Available Towercranes page with filtering functionality
  - Technical Information page with resources and FAQs
  - Contact page with form and company information
- SEO optimization with next-seo
- Mobile-friendly navigation with a responsive header

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **UI Components**: Headless UI
- **SEO**: Next SEO
- **Typography**: Inter and Montserrat fonts

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nibm-tower-cranes.git
   cd nibm-tower-cranes
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Project Structure

```
website/
├── public/
│   └── images/            # Website images
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── about/         # About Us page
│   │   ├── contact/       # Contact page
│   │   ├── services/      # Services page
│   │   ├── technical-info/# Technical Information page
│   │   ├── towercranes/   # Available Towercranes pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Homepage
│   └── components/        # Reusable components
│       ├── Header.tsx     # Website header with navigation
│       ├── Footer.tsx     # Website footer
│       ├── HeroSection.tsx# Homepage hero section
│       └── ...            # Other components
└── tailwind.config.js     # Tailwind CSS configuration
```

## Customization

### Adding New Tower Cranes

To add a new tower crane to the Available Towercranes section:

1. Open the `/src/app/towercranes/page.tsx` file
2. Add a new entry to the `cranes` array with the crane's details
3. Make sure to include an image in the `/public/images/` directory

### Modifying Services

To modify or add services:

1. Open the `/src/app/services/page.tsx` file
2. Edit or add to the `services` array

### Adding Team Members

To add or update team members:

1. Open the `/src/app/about/page.tsx` file
2. Modify the `teamMembers` array

## Deployment

This website can be deployed to any hosting service that supports Next.js, such as Vercel, Netlify, or AWS Amplify.

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js).

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project to Vercel
3. Vercel will detect Next.js automatically and use the optimal build settings

## Contact

For questions or support regarding this website, please contact your web development team.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, modification, public display, or public performance of this website is strictly prohibited.
