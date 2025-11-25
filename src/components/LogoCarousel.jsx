import styles from './LogoCarousel.module.css';

const LogoCarousel = () => {
  const logos = [
    "https://innovate360.us/wp-content/uploads/2025/01/SHN_LOGO.png",
    "https://innovate360.us/wp-content/uploads/2025/01/pca_logo-1.png",
    "https://i.postimg.cc/qMbsPMnp/logo-2x-removebg-preview.png",
    "https://i.postimg.cc/MG5CyQNR/new-final.png"
  ];

  const textItems = [
    'MARKETING',
    'BRANDING',
    'UI/UX DESIGN',
    'GET STARTED',
    'DESIGN',
    'MARKETING',
    'DEVELOPMENT',
  
  ];

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.textMarquee}>
        <div className={styles.textTrack}>
          {textItems.map((item, index) => (
            <span key={index} className={styles.textItem}>
              {item}
            </span>
          ))}
          {textItems.map((item, index) => (
            <span key={`dup-${index}`} className={styles.textItem}>
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.logos}>
        <div className={styles.logoItems}>
          {Array.from({ length: 4 }).map((_, loopIndex) =>
            logos.map((src, index) => (
              <img
                key={`${loopIndex}-${index}`}
                src={src}
                alt={`Logo ${index + 1}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
