import React, { useState, useEffect } from 'react';
import { FiImage, FiAlertCircle } from 'react-icons/fi';

export const ProductImage = ({ 
  src, 
  alt, 
  className = "w-full h-full object-cover",
  showLoader = true,
  fallbackSrc = '/placeholder-product.png',
  lazy = true
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  // Handle different types of image paths that might come from the API
  const getImageUrl = (src) => {
    if (!src) {
      return fallbackSrc;
    }
    
    // If it's already a full URL
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    
    // If it's a path from the server
    if (src.startsWith('/uploads/')) {
      return `http://localhost:3000${src}`;
    }
    
    // If it starts with 'image/' - handle backend image endpoint
    if (src.startsWith('image/')) {
      return `http://localhost:3000/${src}`;
    }
    
    // If it's just the filename 
    if (!src.startsWith('/')) {
      return `http://localhost:3000/uploads/${src}`;
    }
    
    // Default case: just return the src
    return src;
  };

  useEffect(() => {
    const imageUrl = getImageUrl(src);
    setCurrentSrc(imageUrl);
    setLoading(true);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = (e) => {
    setLoading(false);
    setError(true);
    
    // Try fallback if not already using it
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(false);
      setLoading(true);
    } else {
      e.target.onerror = null; // Prevent infinite loop
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className={`${className} bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center`}>
      {showLoader && (
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="relative">
            <FiImage size={32} className="animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
          <div className="text-xs font-medium">Loading...</div>
        </div>
      )}
    </div>
  );

  // Error fallback component
  const ErrorFallback = () => (
    <div className={`${className} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300`}>
      <div className="flex flex-col items-center gap-2 text-gray-500 p-4 text-center">
        <FiAlertCircle size={24} />
        <div className="text-xs font-medium">Image unavailable</div>
      </div>
    </div>
  );

  // Main image component
  const ImageComponent = () => (
    <div className="relative overflow-hidden group">
      <img 
        src={currentSrc} 
        alt={alt || 'Product image'} 
        className={`${className} transition-all duration-500 group-hover:scale-105`}
        loading={lazy ? "lazy" : "eager"}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
      
      {/* Image overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Shimmer effect while loading */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      )}
    </div>
  );

  // Render logic
  if (error && currentSrc === fallbackSrc) {
    return <ErrorFallback />;
  }

  return (
    <div className="relative">
      {loading && <LoadingSkeleton />}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <ImageComponent />
      </div>
    </div>
  );
};

// Enhanced product image gallery component for product detail pages
export const ProductImageGallery = ({ images, productName, className }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const imageArray = Array.isArray(images) ? images : [images];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main image */}
      <div 
        className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <ProductImage
          src={imageArray[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          className={`w-full h-full object-co transition-transform duration-500 ${
            isZoomed ? 'scale-150' : 'scale-100 hover:scale-110'
          }`}
        />
        
        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          Click to {isZoomed ? 'zoom out' : 'zoom in'}
        </div>
      </div>

      {/* Thumbnail gallery */}
      {imageArray.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {imageArray.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(index);
                setIsZoomed(false);
              }}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedImage === index 
                  ? 'border-primary-500 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300 hover:scale-102'
              }`}
            >
              <ProductImage
                src={image}
                alt={`${productName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                showLoader={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImage;