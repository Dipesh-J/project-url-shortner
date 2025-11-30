import { Card, SectionHeader } from '../components';
import { FiLink2, FiDatabase, FiZap, FiCode } from 'react-icons/fi';

/**
 * About Page
 * Information about the URL Shortener application
 */
const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-text-primary mb-4">
            About <span className="text-primary-variant">URL Shortener</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A scalable URL shortening service built with modern technologies
          </p>
        </div>

        {/* About Content */}
        <div className="max-w-4xl mx-auto">
          <Card padding="lg" className="mb-8">
            <SectionHeader
              title="What is URL Shortening?"
              subtitle="Making long URLs manageable"
            />
            <p className="text-text-secondary leading-relaxed">
              URL shortening is used to create shorter aliases for long URLs. We call these 
              shortened aliases &quot;short links.&quot; Users are redirected to the original URL when 
              they hit these short links. Short links save a lot of space when displayed, 
              printed, messaged, or tweeted. Additionally, users are less likely to mistype 
              shorter URLs.
            </p>
          </Card>

          {/* Tech Stack */}
          <SectionHeader
            title="Technology Stack"
            subtitle="Built with modern, scalable technologies"
            centered
          />
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <TechCard
              icon={<FiCode />}
              title="Frontend"
              items={['React 19', 'Vite', 'TailwindCSS', 'React Router', 'Axios']}
            />
            <TechCard
              icon={<FiDatabase />}
              title="Backend"
              items={['Node.js', 'Express.js', 'MongoDB', 'Redis Cache', 'ShortID']}
            />
            <TechCard
              icon={<FiZap />}
              title="Features"
              items={['Fast URL Generation', 'Redis Caching', 'URL Validation', 'Instant Redirects']}
            />
            <TechCard
              icon={<FiLink2 />}
              title="How It Works"
              items={['Enter long URL', 'Generate unique code', 'Store in database', 'Cache for speed', 'Redirect on access']}
            />
          </div>

          {/* API Documentation */}
          <Card padding="lg">
            <SectionHeader
              title="API Endpoints"
              subtitle="REST API for URL shortening"
            />
            
            <div className="space-y-6">
              <APIEndpoint
                method="POST"
                endpoint="/createShortUrl"
                description="Create a shortened URL from a long URL"
                request={{ longUrl: 'https://example.com/very/long/url/path' }}
                response={{
                  data: {
                    shortUrlCode: 'abc123',
                    longUrl: 'https://example.com/very/long/url/path',
                    shortUrl: 'http://localhost:3000/abc123'
                  }
                }}
              />
              
              <APIEndpoint
                method="GET"
                endpoint="/:shortUrlCode"
                description="Redirect to the original URL"
                response="302 Redirect to original URL"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

/**
 * Tech Card Component
 */
const TechCard = ({ icon, title, items }) => (
  <Card padding="md" className="border border-transparent hover:border-primary transition-all duration-300">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-primary-variant text-2xl">{icon}</div>
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-text-secondary text-sm flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary-variant rounded-full" />
          {item}
        </li>
      ))}
    </ul>
  </Card>
);

/**
 * API Endpoint Documentation Component
 */
const APIEndpoint = ({ method, endpoint, description, request, response }) => (
  <div className="border border-bg-surface rounded-lg p-4">
    <div className="flex items-center gap-3 mb-3">
      <span
        className={`
          px-2 py-1 rounded text-xs font-semibold
          ${method === 'POST' ? 'bg-accent-success text-white' : 'bg-primary text-white'}
        `}
      >
        {method}
      </span>
      <code className="text-primary-variant font-mono">{endpoint}</code>
    </div>
    <p className="text-text-secondary text-sm mb-4">{description}</p>
    
    {request && (
      <div className="mb-3">
        <span className="text-xs text-text-secondary uppercase">Request Body:</span>
        <pre className="mt-1 p-3 bg-bg-default rounded text-xs text-text-primary overflow-x-auto">
          {JSON.stringify(request, null, 2)}
        </pre>
      </div>
    )}
    
    <div>
      <span className="text-xs text-text-secondary uppercase">Response:</span>
      <pre className="mt-1 p-3 bg-bg-default rounded text-xs text-text-primary overflow-x-auto">
        {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
      </pre>
    </div>
  </div>
);

export default AboutPage;
