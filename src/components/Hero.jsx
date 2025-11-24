import  { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { gsap } from 'gsap';
import styles from './Hero.module.css';
import ParticlesBackground from './ParticlesBackground';

const Hero = () => {
  const titleRef = useRef(null);
  const ratingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const title1 = titleRef.current.querySelector('.title-1');
    const title2 = titleRef.current.querySelector('.title-2');

    tl.fromTo(title1,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2 },
      "-=0.4"
    )
    .fromTo(title2,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5 },
      "-=0.8"
    );
    
    tl.fromTo(ratingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(descriptionRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(buttonRef.current,
      { y: 40, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8 },
      "-=0.5"
    );

 
    tl.fromTo(imageRef.current,
      { opacity: 0, scale: 0.9, x: 50 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power2.out" },
      "-=1.2"
    );

    gsap.to(buttonRef.current.querySelector('svg'), {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none"
    });

  }, []);

  return (
    <div className={styles.heroSection}>
   
      <div className={styles.backgroundPattern}></div>
      
     
      <div className={styles.stars}></div>
      <div className={styles.twinkle}></div>
      <ParticlesBackground />

      <Container fluid className="px-5 py-2" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <Row className="align-items-center position-relative" style={{ minHeight: '90vh', zIndex: 10, pointerEvents: 'none' }}>
       
          <Col lg={6} className="text-center" style={{ zIndex: 1, pointerEvents: 'none' }}>
            <div ref={titleRef} className="mb-5">
              <div className={`title-1 ${styles.title}`}>
                INNOVATE360
              </div>
              <div className={`title-2 ${styles.title2}`}>
                AGENCY
              </div>
            </div>
            
            <Row className="mb-5 align-items-start">
              <Col md={5} ref={ratingRef} className={styles['padding-lg-only']}>
                <div className={styles.ratingNumber}>
                  4.9
                </div>
                <div className={styles.ratingText}>
                  (2.5k<br/> Reviews)
                </div>
                <div className={styles.starContainer}>
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={styles.star}>★</div>
                  ))}
                </div>
                <div className={styles.feedbackText}>
                  Average rating based on<br/>client feedback
                </div>
              </Col>

              <Col md={1} className="d-none d-md-flex justify-content-center">
                <div className={styles.divider}></div>
              </Col>

              <Col md={6} ref={descriptionRef}>
                <div className={styles.description}>
                  We are a creative agency that specializes in providing high-quality design and branding solutions to businesses.
                </div>
                <div ref={buttonRef}>
                  <div 
                    className={styles.circularButton}
                    style={{ pointerEvents: 'auto' }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { scale: 1.05, borderColor: '#bfff00', duration: 0.3 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, borderColor: '#2a2a2a', duration: 0.3 });
                    }}
                  >
                    <svg width="130" height="130" style={{ position: 'absolute' }}>
                      <defs>
                        <path id="circle" d="M 65,65 m -55,0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0" />
                      </defs>
                      <text fill="#FFFFFF" fontSize="11" fontWeight="500" letterSpacing="3">
                        <textPath href="#circle" startOffset="0%">
                          EXPLORE • MORE • EXPLORE • MORE •
                        </textPath>
                      </text>
                    </svg>
                    <span className={styles.arrow}>→</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>


          <Col lg={6} className="text-end position-relative" style={{ zIndex: 1, pointerEvents: 'none' }}>
            <div ref={imageRef}>
              <img 
                src="https://i.postimg.cc/7h3TwRdV/Gemini-Generated-Image-eojoeteojoeteojo-(1)-Photoroom.png" 
                alt="3D Head Model" 
                className={styles.heroImage}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;