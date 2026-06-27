import React from 'react';
import './Gallery.css';

const Gallery = () => {
  const images = [
    { src: '/gallery/interior.png', alt: 'The Buzz Hive Interior', size: 'large' },
    { src: '/gallery/vapes.png', alt: 'Premium Vapes Display', size: 'small' },
    { src: '/gallery/flower.png', alt: 'THC-A Flower', size: 'small' },
    { src: '/gallery/hookah.png', alt: 'Elegant Hookahs', size: 'medium' }
  ];

  return (
    <section className="gallery-section mt-16 animate-fade-up">
      <h2 className="text-xl font-bold mb-6 text-primary text-center">Inside The Hive</h2>
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <div key={idx} className={`gallery-item item-${img.size}`}>
            <img src={img.src} alt={img.alt} className="gallery-img" />
            <div className="gallery-overlay">
              <span>{img.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
