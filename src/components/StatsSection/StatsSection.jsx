import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StatsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const STAT_ITEMS = [
  {
    id: 'experience',
    value: 26,
    label: 'YEARS EXPERIENCE',
    format: 'plain'
  },
  {
    id: 'engineers',
    value: 40,
    label: 'EXPERIENCE ENGINEERING MEMBERS',
    format: 'plus',
    haveLetter: true
  },
  {
    id: 'projects',
    value: 2000,
    label: 'SUCCESSFULLY FINISHED PROJECT',
    format: 'kPlus',
    haveLetter: true
  },
  {
    id: 'awards',
    value: 25,
    label: 'GOOD AWARD WINING COMPANY',
    format: 'plain',
    accent: true
  }
];

const formatValue = (value, format) => {
  const numericValue = Number.isFinite(value) ? value : 0;
  const safeValue = Math.max(0, Math.round(numericValue));

  if (format === 'kPlus') {
    if (safeValue === 0) return '0K+';
    const kValue = Math.max(1, Math.round(safeValue / 1000));
    return `${kValue}K+`;
  }

  if (format === 'plus') {
    return `${safeValue}+`;
  }

  return `${safeValue}`;
};

const StatCard = ({ item, index, registerRef }) => {
  const numberClass = `${styles.number} ${item.haveLetter ? styles.numberHasLetter : styles.numberNoLetter
    }`;
  const labelClass = `${styles.label} ${item.haveLetter ? styles.labelHasLetter : styles.labelNoLetter
    }`;

  return (
    <article className={`${styles.card} ${item.accent ? styles.cardAccent : ''}`}>
      <span className={styles.corner} aria-hidden="true" />
      <p
        ref={(el) => registerRef(index, el)}
        className={numberClass}
      >
        {item.value}
      </p>
      <p className={labelClass}>{item.label}</p>
    </article>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    numberRefs.current.forEach((el, index) => {
      if (!el) return;
      const stat = STAT_ITEMS[index];
      el.textContent = formatValue(stat.value, stat.format);
    });

    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, index) => {
        if (!el) return;

        const stat = STAT_ITEMS[index];
        const finalValue = stat.value;
        const format = stat.format;
        const randomizer = { progress: 0 };
        const counter = { value: 0 };

        const updateWithRandomValue = () => {
          const randomValue = gsap.utils.random(finalValue * 0.3, finalValue * 1.6);
          el.textContent = formatValue(randomValue, format);
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        });

        tl.to(randomizer, {
          progress: 1,
          duration: 1,
          ease: 'none',
          onUpdate: updateWithRandomValue
        });

        tl.to(counter, {
          value: finalValue,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = formatValue(counter.value, format);
          },
          onComplete: () => {
            el.textContent = formatValue(finalValue, format);
          }
        }, '-=0.2');
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const registerRef = (index, el) => {
    numberRefs.current[index] = el;
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner} ref={sectionRef}>
        <div className="row g-0 mb-0">
          <div className="col-12 col-md-3 offset-md-3">
            <StatCard
              item={STAT_ITEMS[0]}
              index={0}
              registerRef={registerRef}
            />
          </div>

          <div className="col-12 col-md-3 offset-md-3">
            <StatCard
              item={STAT_ITEMS[1]}
              index={1}
              registerRef={registerRef}
            />
          </div>
        </div>

        <div className="row g-0">
          <div className="col-12 col-md-3">
            <StatCard
              item={STAT_ITEMS[2]}
              index={2}
              registerRef={registerRef}
            />
          </div>

          <div className="col-12 col-md-3 offset-md-3">
            <StatCard
              item={STAT_ITEMS[3]}
              index={3}
              registerRef={registerRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;