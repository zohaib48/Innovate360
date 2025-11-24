import styles from './LogoCarousel.module.css';

const LogoCarousel = () => {
  const logos = [
    "https://innovate360.us/wp-content/uploads/2025/01/GTRALLY_logo.png",
    "https://innovate360.us/wp-content/uploads/2023/09/woodpeaker.png",
    "https://innovate360.us/wp-content/uploads/2023/09/ctnproperties.png",
    "https://innovate360.us/wp-content/uploads/2023/06/reality-white.png.webp",
    "https://innovate360.us/wp-content/uploads/2023/06/laroja-1.png.webp",
    "https://innovate360.us/wp-content/uploads/2025/01/pca_logo-1.png",
    "https://innovate360.us/wp-content/uploads/2023/06/dolics.png.webp",
    "https://innovate360.us/wp-content/uploads/2023/06/the-goat.png.webp",
    "https://innovate360.us/wp-content/uploads/2023/06/mortogo-1.png.webp",
    "https://innovate360.us/wp-content/uploads/2025/01/TRENDWOOOOD.png-wht.png",
    "https://innovate360.us/wp-content/uploads/2025/01/Eden.png"
  ];

  const textItems = [
    'MARKETING',
    'BRANDING',
    'UI/UX DESIGN',
    'GET STARTED',
    'DESIGN',
    'DEVELOPMENT',
    'MARKETING'
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
      {/* <div className={styles.logos}>
        <div className={styles.logoItems}>
          {logos.map((src, index) => (
            <img key={index} src={src} alt={`Logo ${index + 1}`} />
          ))}
          {logos.map((src, index) => (
            <img key={`dup-${index}`} src={src} alt={`Logo ${index + 1}`} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default LogoCarousel;
