import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ArchitectureShowcase.css";

gsap.registerPlugin(ScrollTrigger);

const archData = [
  {
    id: "pink-arch",
    title: "Porsche Club of America",
    description:
      "A dynamic website designed for the Porsche Club of America – Shenandoah Region, featuring events, blogs, sponsors, and community highlights with a bold, immersive, and user-friendly experience.",

    linkColor: "#D5FF37",
    link: "https://shn.pca.org/",
    image:
      "https://i.postimg.cc/NfQ0FB5p/Gemini-Generated-Image-vq4t75vq4t75vq4t.png",
    imageAlt: "Porsche Club of America Website",
  },
  {
    id: "green-arch",
    title: "Reality Fashion",
    description:
      "Reality Fashion Reload is a Shopify-based fashion store offering a seamless shopping experience for men’s, women’s, and kids’ clothing through a custom-designed theme.",
    linkColor: "#FFA0B0",
    link: "https://realityofficial.com/",
    image:
      "https://i.postimg.cc/44rdVmJv/Gemini-Generated-Image-ew5qbyew5qbyew5q.png",
    imageAlt: "Reality Fashion Website",
  },
  {
    id: "blue-arch",
    title: "Dolcis",
    description:
      "We developed the Dolcis Shopify website with custom theme design and in-house product photography, delivering a polished, user-friendly showcase for shoes and accessories.",
    linkColor: "#7DD6FF",
    link: "https://dolcis.com.pk/",
    image:
      "https://i.postimg.cc/hjx9DcfV/Gemini-Generated-Image-llzpu1llzpu1llzp.png",
    imageAlt: "Dolcis Website",
  },
  {
    id: "blue-arch",
    title: "Pebbles",
    description:
      "We developed a clean, user-friendly e-commerce website for Pebbles, showcasing stylish clothing for boys, girls, and infants with smooth navigation, engaging visuals, and an optimized shopping experience across all devices.",
    linkColor: "#FFA0B0",
    link: "https://pebblesofficial.com/",
    image:
      "https://i.postimg.cc/446dXmNs/Gemini-Generated-Image-6icjg6icjg6icjg6.png",
    imageAlt: "Pebbles Website",
  },
  {
    id: "blue-arch",
    title: "Eden's Body",
    description:
      "We designed a clean, elegant Shopify store for Edens Cosmetics, highlighting organic beauty products with a soft visual aesthetic, intuitive navigation, and a seamless shopping experience optimized for all devices.",
    linkColor: "#D5FF37",
    link: "https://edensbodycare.com/",
    image:
      "https://i.postimg.cc/W1wpPKNj/Gemini-Generated-Image-cd43jtcd43jtcd43.png",
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

    // Mobile layout handler
    const handleMobileLayout = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const leftItems = gsap.utils.toArray(".arch__left .arch__info");
      const rightItems = gsap.utils.toArray(".arch__right .img-wrapper");

      if (isMobile) {
        leftItems.forEach((item, i) => {
          item.style.order = String(i * 2);
        });
        rightItems.forEach((item, i) => {
          item.style.order = String(i * 2 + 1);
        });
      } else {
        leftItems.forEach((item) => {
          item.style.order = "";
        });
        rightItems.forEach((item) => {
          item.style.order = "";
        });
      }
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleMobileLayout, 100);
    };

    window.addEventListener("resize", handleResize);
    handleMobileLayout();

    const imgs = gsap.utils.toArray(".img-wrapper img");

    // GSAP Animation with Media Query
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

        imgs.forEach((_, index) => {
          const currentImage = imgs[index];
          const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

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
                  y: () => {
                    const diff = currentImage.offsetHeight - currentImage.parentElement.offsetHeight;
                    return diff > 0 ? -diff : 0;
                  },
                  duration: 1.5,
                  ease: "none"
                },
                0
              );
          }

          mainTimeline.add(sectionTimeline);
        });
      },
      "(max-width: 768px)": function () {
        const mbTimeline = gsap.timeline();
        gsap.set(imgs, {
          objectPosition: "0px 60%",
        });

        imgs.forEach((image, index) => {
          const innerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: "top-=70% top+=50%",
              end: "bottom+=200% bottom",
              scrub: true,
            },
          });

          innerTimeline
            .to(image, {
              y: () => {
                const diff = image.offsetHeight - image.parentElement.offsetHeight;
                return diff > 0 ? -diff : 0;
              },
              duration: 5,
              ease: "none",
            })
            .to("body", {
              backgroundColor: bgColors[index],
              duration: 1.5,
              ease: "power2.inOut",
            });

          mbTimeline.add(innerTimeline);
        });
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
                >
                  <LeafIcon /> <span>Learn More</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* UPDATED: Removed paddingTop from here */}
        <div className="arch__right">
          {archData.map((item, index) => (
            <div
              key={item.id}
              // UPDATED: Changed 'mt-5' to 'mt-5 mt-md-0'
              // This applies top margin on mobile, and removes it on desktop (md and up).
              className="img-wrapper mt-5 mt-md-0"
              data-index={archData.length - index}
            >
              <img src={item.image} alt={item.imageAlt} style={{ width: "100%" }} />
            </div>
          ))}
        </div>
      </div>

      <div className="spacer"></div>
    </div>
  );
};

export default ArchitectureShowcase;