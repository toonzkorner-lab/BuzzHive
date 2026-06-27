import React from 'react';
import Gallery from '../components/Gallery';
import './PageDefaults.css';

const AboutPage = () => {
  return (
    <div className="page-wrapper pt-32">
      <div className="container">
        <h1 className="page-title text-gradient">About The Buzz Hive</h1>
        
        <div className="glass content-card mt-8 animate-fade-up">
          <p className="text-xl">
            As a single-location, independent local business, <strong>The Buzz Hive</strong> does not have a lengthy corporate history, but it has firmly established itself as a go-to neighborhood smoke and vape shop in San Antonio.
          </p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4 text-primary animate-fade-up delay-1">Our Journey</h2>
        
        <div className="contact-grid mt-4">
          <div className="glass content-card animate-fade-up delay-1">
            <h3 className="text-primary font-bold text-xl mb-2">The Launch</h3>
            <p>
              The shop opened its doors on Perrin Beitel Road to provide a premium "one-stop-shop" experience for vapes, glass, and cannabis/hemp alternatives.
            </p>
          </div>

          <div className="glass content-card animate-fade-up delay-2">
            <h3 className="text-primary font-bold text-xl mb-2">Anniversary Milestones</h3>
            <p>
              The business has celebrated its ongoing presence in the community with special store anniversaries during Thanksgiving week, thanking the San Antonio community for its strong local support.
            </p>
          </div>

          <div className="glass content-card animate-fade-up delay-3">
            <h3 className="text-primary font-bold text-xl mb-2">Community Footprint</h3>
            <p>
              Over its years in operation, The Buzz Hive has built its stellar reputation primarily through word-of-mouth and active social media engagement within the local neighborhood.
            </p>
          </div>
        </div>

        <Gallery />

      </div>
    </div>
  );
};

export default AboutPage;
