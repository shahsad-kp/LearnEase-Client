import {useState} from "react";

// eslint-disable-next-line react/prop-types
export const LazyImage = ({ smallSrc, bigSrc, alt, ...extra }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div {...extra} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      {isLoading && (
        <img
          src={smallSrc}
          alt={alt}
          style={{ width: '100%', height: 'auto' }}
        />
      )}

      <img
        src={bigSrc}
        alt={alt}
        style={{ display: isLoading ? 'none' : 'block', width: '100%', height: 'auto' }}
        onLoad={handleImageLoad}
      />
    </div>
  );
};
