import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ArchitectureShowcase.css";
import ArchitectureShowcaseMobile from "./ArchitectureShowcaseMobile";

// ... (existing imports and constants remain the same)
import porscheClubDesktop from '../../assets/images/projects/porsche-club-d.webp';
import porscheClubMobile from '../../assets/images/projects/porsche-club-m.webp';
import realityFashion from '../../assets/images/projects/reality-fashion.png';
import dolcis from '../../assets/images/projects/dolcis.png';
import pebbles from '../../assets/images/projects/pebbles.png';
import edensBody from '../../assets/images/projects/edens-body.png';


gsap.registerPlugin(ScrollTrigger);

const archData = [
  {
    id: "pink-arch",
    title: "Porsche Club of America",
    description:
      "A dynamic website designed for the Porsche Club of America – Shenandoah Region, featuring events, blogs, sponsors, and community highlights with a bold, immersive, and user-friendly experience.",

    linkColor: "#D5FF37",
    link: "https://shn.pca.org/",
    image: porscheClubDesktop,
    mobileImage: porscheClubMobile,
    imageAlt: "Porsche Club of America Website",
  },
  {
    id: "green-arch",
    title: "Reality Fashion",
    description:
      "Reality Fashion Reload is a Shopify-based fashion store offering a seamless shopping experience for men's, women's, and kids' clothing through a custom-designed theme.",
    linkColor: "#FFA0B0",
    link: "https://realityofficial.com/",
    image: realityFashion,
    imageAlt: "Reality Fashion Website",
  },
  {
    id: "dolcis-arch",
    title: "Dolcis",
    description:
      "We developed the Dolcis Shopify website with custom theme design and in-house product photography, delivering a polished, user-friendly showcase for shoes and accessories.",
    linkColor: "#7DD6FF",
    link: "https://dolcis.com.pk/",
    image: dolcis,
    imageAlt: "Dolcis Website",
  },
  {
    id: "pebbles-arch",
    title: "Pebbles",
    description:
      "We developed a clean, user-friendly e-commerce website for Pebbles, showcasing stylish clothing for boys, girls, and infants with smooth navigation, engaging visuals, and an optimized shopping experience across all devices.",
    linkColor: "#FFA0B0",
    link: "https://pebblesofficial.com/",
    image: pebbles,
    imageAlt: "Pebbles Website",
  },
  {
    id: "edens-arch",
    title: "Eden's Body",
    description:
      "We designed a clean, elegant Shopify store for Edens Cosmetics, highlighting organic beauty products with a soft visual aesthetic, intuitive navigation, and a seamless shopping experience optimized for all devices.",
    linkColor: "#D5FF37",
    link: "https://edensbodycare.com/",
    image: edensBody,
    imageAlt: "Eden's Body Website",
  },


];

const bgColors = ["#EDF9FF", "#FFECF2", "#FFE8DB"];

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
    <path
      fill="#121212"
      d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
    />
  </svg>
);

const ArchitectureShowcase = ({ backgroundColor }) => {
  const containerRef = useRef(null);
  const archRef = useRef(null);
  const lenisRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      // Only run lenis on desktop if needed, or always. 
      // If mobile component handles its own scroll, we might not need this on mobile, but keeping consistent is fine.
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Set z-index for images
    const imgWrappers = document.querySelectorAll(".arch__right .img-wrapper");
    imgWrappers.forEach((element) => {
      const order = element.getAttribute("data-index");
      if (order !== null) {
        element.style.zIndex = order;
      }
    });

    const handleMobileLayout = () => {
      const isMobileView = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileView);
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleMobileLayout, 150);
    };

    window.addEventListener("resize", handleResize);
    handleMobileLayout();

    const imgs = gsap.utils.toArray(".img-wrapper img");

    const cacheImageHeights = () => {
      return imgs.map((img) => {
        const imgHeight = img.offsetHeight;
        const parentHeight = img.parentElement?.offsetHeight || 0;
        return { img, imgHeight, parentHeight, diff: imgHeight - parentHeight };
      });
    };

    ScrollTrigger.matchMedia({
      "(min-width: 769px)": function () {
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".arch",
            start: "top top+=50px",
            end: "bottom bottom",
            pin: ".arch__right",
            scrub: true,
          },
        });

        gsap.set(imgs, {
          clipPath: "inset(0)",
          objectPosition: "0px 0%",
        });

        const cachedHeights = cacheImageHeights();

        imgs.forEach((_, index) => {
          const currentImage = imgs[index];
          const nextImage = imgs[index + 1] ? imgs[index + 1] : null;
          const cached = cachedHeights[index];

          const sectionTimeline = gsap.timeline();

          if (nextImage) {
            sectionTimeline
              .to(
                "body",
                {
                  backgroundColor: bgColors[index],
                  duration: 1.5,
                  ease: "power2.inOut",
                },
                0
              )
              .to(
                currentImage,
                {
                  clipPath: "inset(100% 0px 0px 0px)",
                  duration: 1.5,
                  ease: "none",
                },
                0
              )
              .to(currentImage,
                {
                  y: cached.diff > 0 ? -cached.diff : 0,
                  duration: 1.5,
                  ease: "none"
                },
                0
              );
          }

          mainTimeline.add(sectionTimeline);
        });
      },
      // Mobile logic removed as we use a separate component
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (isMobile) {
    return <ArchitectureShowcaseMobile data={archData} />;
  }

  return (
    <div ref={containerRef} className="arch-container" style={{ backgroundColor: backgroundColor ? backgroundColor : '  background-color: #F8F8F8' }}>
      <div className="spacer"></div>

      <div ref={archRef} className="arch">
        <div className="arch__left">
          {archData.map((item) => (
            <div key={item.id} className="arch__info" id={item.id}>
              <div className="content">
                <h2 className="header">{item.title}</h2>
                <p className="desc">{item.description}</p>
                <a
                  className="link"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: item.linkColor }}
                  aria-label={`Learn more about ${item.title}`}
                >
                  <LeafIcon /> <span>Learn More <span className="visually-hidden">about {item.title}</span></span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="arch__right">
          {archData.map((item, index) => (
            <div
              key={item.id}
              className="img-wrapper mt-5 mt-md-0"
              data-index={archData.length - index}
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                style={{ width: "100%", objectPosition: "0px 0%" }} // Reset object position for desktop
                loading="lazy"
                width="392"
                height="216"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="spacer"></div>
    </div>
  );
};

export default ArchitectureShowcase;