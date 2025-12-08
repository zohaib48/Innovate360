import styles from './TextMarquee.module.css';

const TextMarquee = () => {
  // You can pass these as props later if you want to make it dynamic
  const words = [
    "Web Design",
    "Development",
    "SEO Optimization",
    "Digital Marketing",
    "Branding",
    "App Development"
  ];

  // 1. Create a base set repeated enough times to ensure it fills wide screens
  const repeatedWords = [...words, ...words, ...words, ...words];

  // 2. Duplicate that entire set to create the seamless -50% loop
  const marqueeContent = [...repeatedWords, ...repeatedWords];

  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.track}>
        {marqueeContent.map((item, index) => (
          <span key={index} className={styles.item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextMarquee;