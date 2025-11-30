import { useState } from 'react';
import { FiLink, FiCopy, FiExternalLink, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Button, Input, Card, Loader, SectionHeader } from '../components';
import { urlService } from '../services/api';

/**
 * Home Page
 * Main URL shortening interface
 */
const HomePage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrlData(null);

    if (!longUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(longUrl)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setLoading(true);

    try {
      const response = await urlService.createShortUrl(longUrl);
      setShortUrlData(response.data);
      toast.success('URL shortened successfully!');
    } catch (err) {
      const errorMessage = err.message || 'Failed to shorten URL. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleReset = () => {
    setLongUrl('');
    setShortUrlData(null);
    setError('');
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-4xl lg:text-4xl font-semibold text-text-primary mb-4">
            Shorten Your <span className="text-primary-variant">URLs</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Transform long, unwieldy URLs into short, shareable links. 
            Fast, simple, and free.
          </p>
        </div>

        {/* URL Shortener Form */}
        <Card padding="lg" className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Enter your long URL here..."
                  value={longUrl}
                  onChange={(e) => {
                    setLongUrl(e.target.value);
                    setError('');
                  }}
                  error={error}
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="md:w-auto w-full"
              >
                <FiLink className="mr-2" />
                Shorten
              </Button>
            </div>
          </form>

          {/* Loading State */}
          {loading && (
            <div className="mt-8 flex justify-center">
              <Loader text="Generating short URL..." />
            </div>
          )}

          {/* Result Display */}
          {shortUrlData && !loading && (
            <div className="mt-8 p-6 bg-bg-default rounded-lg border border-primary">
              <SectionHeader
                title="Your Shortened URL"
                subtitle="Click to copy or visit the link"
                centered
              />
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex-1 w-full">
                  <div
                    className="
                      flex items-center justify-between
                      bg-bg-surface p-4 rounded-md
                      border border-primary-variant
                      cursor-pointer
                      transition-all duration-300
                      hover:border-primary
                    "
                    onClick={() => copyToClipboard(shortUrlData.shortUrl)}
                  >
                    <span className="text-primary-variant font-medium truncate mr-4">
                      {shortUrlData.shortUrl}
                    </span>
                    <button
                      className="text-text-secondary hover:text-primary-variant transition-colors"
                      aria-label="Copy to clipboard"
                    >
                      {copied ? (
                        <FiCheck className="text-accent-success text-xl" />
                      ) : (
                        <FiCopy className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>
                
                <a
                  href={shortUrlData.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2
                    px-4 py-3
                    bg-primary text-white
                    rounded-md
                    transition-all duration-300
                    hover:bg-primary-variant
                  "
                >
                  <FiExternalLink />
                  Visit
                </a>
              </div>

              {/* URL Details */}
              <div className="mt-6 pt-6 border-t border-bg-surface">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Original URL:</span>
                    <p className="text-text-primary truncate mt-1">
                      {shortUrlData.longUrl}
                    </p>
                  </div>
                  <div>
                    <span className="text-text-secondary">URL Code:</span>
                    <p className="text-primary-variant font-mono mt-1">
                      {shortUrlData.shortUrlCode || shortUrlData.urlCode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="mt-6 text-center">
                <Button variant="outline" onClick={handleReset}>
                  Shorten Another URL
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title="Why Use Our URL Shortener?"
            subtitle="Simple, fast, and reliable URL shortening service"
            centered
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="⚡"
              title="Lightning Fast"
              description="Generate short URLs instantly with our optimized backend"
            />
            <FeatureCard
              icon="🔒"
              title="Reliable"
              description="Your links are stored securely and work reliably"
            />
            <FeatureCard
              icon="📊"
              title="Simple"
              description="No signup required. Just paste and shorten!"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Feature Card Component
 */
const FeatureCard = ({ icon, title, description }) => (
  <Card padding="lg" className="text-center hover:border-primary border border-transparent transition-all duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
    <p className="text-text-secondary">{description}</p>
  </Card>
);

export default HomePage;
