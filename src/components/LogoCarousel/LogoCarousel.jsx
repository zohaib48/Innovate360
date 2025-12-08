import styles from './LogoCarousel.module.css';

const LogoCarousel = () => {
  const logos = [
    { weblink: "https://shn.pca.org/", imglink: "https://innovate360.us/wp-content/uploads/2025/01/SHN_LOGO.png" },
    { weblink: "https://www.pca.org/", imglink: "https://innovate360.us/wp-content/uploads/2025/01/pca_logo-1.png" },
    { weblink: "https://edensbodycare.com/", imglink: "https://i.postimg.cc/MG5CyQNR/new-final.png" },
    { weblink: "https://gt-rally.vercel.app/", imglink: "https://i.postimg.cc/qMbsPMnp/logo-2x-removebg-preview.png" },
    { weblink: "https://pebblesofficial.com/", imglink: "https://i.postimg.cc/d3f9dPs7/pebbles-removebg-preview-(1).png" }
  ];

  // We create a base set large enough to fill a wide screen (repeat logos 3 times)
  // Then we duplicate that entire set once to create the perfect 50% loop.
  const baseSet = [...logos, ...logos, ...logos];
  const loopSet = [...baseSet, ...baseSet]; 

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.logos}>
        <div className={styles.logoItems}>
          {loopSet.map((logo, index) => (
            <a 
              key={index}
              href={logo.weblink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.logoItem}
            >
              <img
                src={logo.imglink}
                alt={`Logo ${index}`}
                draggable="false"
                className={styles.logoImage}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;