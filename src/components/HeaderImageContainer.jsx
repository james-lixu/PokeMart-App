import React, { useEffect, useState } from 'react';
import exampleImage from './example.jpg'; // Import the image
import './ImageContainer.css'; // Import the CSS for styling

const ImageContainer = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const scaleValue = window.innerWidth / document.body.clientWidth;
      setScale(scaleValue);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set the scale

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="image-container">
      <img src={exampleImage} alt="Example" style={{ transform: `scale(${scale})` }} />
    </div>
  );
};

export default ImageContainer;
