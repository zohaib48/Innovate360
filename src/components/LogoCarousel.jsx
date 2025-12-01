import styles from './LogoCarousel.module.css';

const LogoCarousel = () => {
  const logos = [

    { weblink: "https://shn.pca.org/", imglink: "https://innovate360.us/wp-content/uploads/2025/01/SHN_LOGO.png" },
    { weblink: "https://www.pca.org/", imglink: "https://innovate360.us/wp-content/uploads/2025/01/pca_logo-1.png" },
    { weblink: "https://edensbodycare.com/", imglink: "https://i.postimg.cc/MG5CyQNR/new-final.png" },
    { weblink: "https://gt-rally.vercel.app/", imglink: "https://i.postimg.cc/qMbsPMnp/logo-2x-removebg-preview.png" },
    { weblink: "https://pebblesofficial.com/", imglink: "https://i.postimg.cc/d3f9dPs7/pebbles-removebg-preview-(1).png" }
  ]
  
  return (
    <div className={styles.carouselWrapper}>
      {/* <div className={styles.textMarquee}>
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
      </div> */}
      <div className={styles.logos}>
        <div className={styles.logoItems}>
          {Array.from({ length: 4 }).map((_, loopIndex) =>
            logos.map((src, index) => (
              <img
                key={`${loopIndex}-${index}`}
                src={src.imglink}
                onClick={() => window.open(src.weblink, "_blank")}
                style={{ cursor: "pointer" }}
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
