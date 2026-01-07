import styles from './LogoCarousel.module.css';
import shnLogo from '../../assets/images/logos/SHN_LOGO.webp';
import pcaLogo from '../../assets/images/logos/pca_logo-m.png';
import newFinalLogo from '../../assets/images/logos/new-final.png';
import logo2x from '../../assets/images/logos/logo-2x-removebg-preview.png';
import pebblesLogo from '../../assets/images/logos/pebbles-removebg-preview.png';

const LogoCarousel = () => {
  const logos = [
    {
      weblink: 'https://shn.pca.org/',
      imglink: shnLogo,
    },
    {
      weblink: 'https://www.pca.org/',
      imglink: pcaLogo,
    },
    {
      weblink: 'https://edensbodycare.com/',
      imglink: newFinalLogo,
    },
    {
      weblink: 'https://gt-rally.vercel.app/',
      imglink: logo2x,
    },
    {
      weblink: 'https://pebblesofficial.com/',
      imglink: pebblesLogo,
    },
  ];

  // Double the logos for seamless loop
  const doubledLogos = [...logos, ...logos];

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.logos}>
        <div className={styles.logoItems}>
          {doubledLogos.map((logo, index) => (
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
                loading="lazy"
                width="120"
                height="120"
              />
            </a>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className={styles.logoItems} aria-hidden="true">
          {doubledLogos.map((logo, index) => (
            <a
              key={`duplicate-${index}`}
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
                loading="lazy"
                width="120"
                height="120"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
