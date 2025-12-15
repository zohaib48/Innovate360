import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ConnectSection.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ConnectSection = () => {
  const sectionRef = useRef(null);
  const itemLeftRef = useRef(null);
  const itemCenterTopRef = useRef(null);
  const itemSkypeRef = useRef(null);
  const itemRightRef = useRef(null);
  const itemCenterLeftRef = useRef(null);
  const itemCenterBottomRef = useRef(null);
  const getInTouchRef = useRef(null);

  useEffect(() => {
    // Check if mobile device
    const isMobile = window.innerWidth < 768;

    // Common animation properties
    const fadeIn = { opacity: 1, duration: 0.8, ease: 'power2.out' };
    const initialMobileState = { opacity: 0, y: 20 };

    // Set initial styles to prevent FOUC (Flash of Unstyled Content)
    const allElements = [
      itemLeftRef.current,
      itemRightRef.current,
      itemCenterTopRef.current,
      itemCenterLeftRef.current,
      itemCenterBottomRef.current,
      itemSkypeRef.current,
      getInTouchRef.current
    ];

    gsap.set(allElements, {
      opacity: 0,
      force3D: !isMobile, // Disable force3D on mobile for better performance
      backfaceVisibility: 'hidden',
      ...(isMobile && initialMobileState) // Add mobile-specific initial state
    });

    // Create a master timeline
    const master = gsap.timeline({
      defaults: {
        ease: 'power2.out',
        force3D: !isMobile, // Disable force3D on mobile
        overwrite: 'auto'
      },
      onComplete: () => {
        if (!isMobile) {
          // Only clear these properties on desktop
          gsap.set(allElements, {
            clearProps: 'will-change,transform-style'
          });
        }
      }
    });

    if (isMobile) {
      // Simplified mobile animation - fade in with slight stagger
      master.fromTo(allElements,
        { opacity: 0, y: 20 },
        {
          ...fadeIn,
          y: 0,
          stagger: 0.1,
          onComplete: () => {
            // Clean up after mobile animation
            gsap.set(allElements, { clearProps: 'all' });
          }
        },
        0
      );
    } else {
      // Desktop animations (original complex animations)
      master
        .fromTo(itemLeftRef.current,
          { x: -100, opacity: 0, force3D: true },
          { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.2
        )
        .fromTo(itemCenterTopRef.current,
          { y: -80, opacity: 0, force3D: true },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.1
        )
        .fromTo(itemRightRef.current,
          { x: 100, opacity: 0, force3D: true },
          { x: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.3
        )
        .fromTo(itemCenterLeftRef.current,
          { x: -80, y: 50, opacity: 0, force3D: true },
          { x: 0, y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.2
        )
        .fromTo(itemCenterBottomRef.current,
          { y: 80, opacity: 0, force3D: true },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.25
        )
        .fromTo(itemSkypeRef.current,
          { scale: 0.5, opacity: 0, force3D: true },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
          0.4
        )
        .fromTo(getInTouchRef.current,
          { y: 50, opacity: 0, force3D: true },
          { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          0.5
        );
    }

    // Create scroll trigger only for desktop
    if (!isMobile) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => master.play(),
        onEnterBack: () => master.play(0),
        onLeaveBack: () => master.pause(0)
      });
    } else {
      // On mobile, play animation immediately
      master.play();
    }

    // Cleanup function
    return () => {
      master.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="connect-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="connect-header">
          <div className="services-banner-label" style={{ justifyContent: "center", marginBottom: 20 }}>
            <svg
              className="rotating-star"
              height="30px"
              width="30px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path style={{ fill: "#66e04d" }} d="M131.21,112.392c29.639,17.11,77.945,116.564,77.945,116.564s-110.285,7.905-139.924-9.22 c-29.639-17.111-39.807-55.022-22.682-84.662C63.659,105.435,101.571,95.267,131.21,112.392z"></path>
                <path style={{ fill: "#4ba05c" }} d="M209.155,283.044c0,0-48.305,99.453-77.945,116.578c-29.639,17.111-67.551,6.957-84.662-22.696 c-17.125-29.639-6.957-67.551,22.682-84.662C98.87,275.154,209.155,283.044,209.155,283.044z"></path>
                <path style={{ fill: "#66e04d" }} d="M465.459,135.074c17.111,29.639,6.957,67.551-22.696,84.662 c-29.639,17.125-139.924,9.22-139.924,9.22s48.305-99.453,77.945-116.564C410.437,95.267,448.334,105.435,465.459,135.074z"></path>
                <g>
                  <path style={{ fill: "#4ba05c" }} d="M442.763,292.264c29.654,17.111,39.807,55.022,22.696,84.662 c-17.125,29.653-55.022,39.807-84.676,22.696c-29.639-17.125-77.945-116.578-77.945-116.578S413.123,275.154,442.763,292.264z"></path>
                  <path style={{ fill: "#4ba05c" }} d="M256.004,14.141c34.221,0,61.98,27.759,61.98,61.98c0,34.235-61.98,125.798-61.98,125.798 s-61.98-91.562-61.98-125.798C194.024,41.9,221.769,14.141,256.004,14.141z"></path>
                </g>
                <path style={{ fill: "#66e04d" }} d="M317.983,435.879c0,34.235-27.759,61.98-61.98,61.98c-34.235,0-61.98-27.744-61.98-61.98 s61.98-125.783,61.98-125.783S317.983,401.644,317.983,435.879z"></path>
                <path d="M256.002,216.059L256.002,216.059c-4.692,0-9.08-2.328-11.71-6.215c-10.754-15.889-64.409-97.012-64.409-133.724 C179.883,34.147,214.029,0,256.002,0s76.121,34.147,76.121,76.121c0,36.711-53.653,117.835-64.41,133.724 C265.082,213.731,260.696,216.059,256.002,216.059z M256.002,28.282c-26.377,0-47.837,21.46-47.837,47.839 c0,18.344,25.906,65.27,47.836,99.939c21.931-34.681,47.84-81.613,47.84-99.939C303.841,49.742,282.382,28.282,256.002,28.282z"></path>
                <path d="M154.22,245.058c-34.157,0-73.838-2.548-92.063-13.078c-17.603-10.162-30.198-26.576-35.463-46.217 c-5.265-19.645-2.562-40.159,7.612-57.764c10.162-17.603,26.575-30.198,46.215-35.463c19.647-5.265,40.159-2.561,57.764,7.611 c31.785,18.356,75.208,105.372,83.59,122.63c2.05,4.221,1.872,9.185-0.474,13.249c-2.345,4.064-6.556,6.7-11.235,7.035 C202,243.645,179.636,245.058,154.22,245.058z M100.3,118.204c-4.155,0-8.337,0.546-12.46,1.65 c-12.344,3.308-22.657,11.224-29.045,22.289c-6.393,11.067-8.091,23.956-4.784,36.298s11.225,22.658,22.289,29.047 c15.883,9.176,69.471,10.198,110.46,8.543c-19.068-36.331-46.756-82.234-62.622-91.391c-0.001-0.001-0.003-0.001-0.004-0.003 C116.767,120.379,108.588,118.204,100.3,118.204z"></path>
                <path d="M100.348,422.098c-6.614,0-13.268-0.87-19.827-2.627c-19.643-5.265-36.056-17.863-46.22-35.477 c-10.169-17.598-12.872-38.113-7.608-57.757c5.265-19.64,17.86-36.055,35.468-46.22H62.16 c31.786-18.349,128.863-12.448,148.003-11.078c4.681,0.335,8.89,2.971,11.236,7.035c2.346,4.064,2.524,9.028,0.474,13.249 c-8.383,17.259-51.809,104.281-83.59,122.643C126.554,418.637,113.536,422.098,100.348,422.098z M154.915,295.324 c-33.275,0-66.656,2.284-78.614,9.187c0,0,0,0-0.001,0c-11.064,6.387-18.981,16.703-22.289,29.047 c-3.308,12.344-1.611,25.233,4.781,36.294c6.392,11.075,16.705,18.993,29.048,22.3c12.341,3.306,25.234,1.612,36.298-4.777 c15.879-9.173,43.562-55.073,62.623-91.4C176.663,295.569,165.79,295.324,154.915,295.324z"></path>
                <path d="M256.002,512c-41.973,0-76.119-34.147-76.119-76.121c0-36.711,53.653-117.823,64.409-133.711 c2.63-3.886,7.018-6.214,11.71-6.214c4.692,0,9.08,2.328,11.709,6.214c10.756,15.887,64.412,97,64.412,133.711 C332.123,477.853,297.975,512,256.002,512z M256.002,335.954c-21.93,34.675-47.837,81.6-47.837,99.927 c0,26.378,21.46,47.839,47.837,47.839c26.378,0,47.839-21.46,47.839-47.839C303.841,417.554,277.934,370.629,256.002,335.954z"></path>
                <path d="M411.637,422.045c-12.904,0-25.967-3.276-37.922-10.174c-0.001-0.001-0.004-0.003-0.007-0.004 c-31.782-18.362-75.208-105.385-83.59-122.643c-2.05-4.221-1.872-9.185,0.474-13.249c2.346-4.064,6.557-6.7,11.236-7.035 c19.138-1.369,116.221-7.27,148.004,11.078c17.61,10.162,30.208,26.576,35.472,46.22c5.265,19.64,2.564,40.153-7.601,57.76 C463.619,408.39,437.97,422.045,411.637,422.045z M387.856,387.378c22.84,13.174,52.163,5.318,65.355-17.523 c6.389-11.064,8.084-23.953,4.777-36.297c-3.309-12.344-11.225-22.658-22.295-29.045c-15.868-9.159-69.463-10.191-110.46-8.538 C344.302,332.309,371.99,378.21,387.856,387.378L387.856,387.378z"></path>
                <path d="M357.78,245.058c-25.424,0-47.785-1.413-55.953-1.998c-4.681-0.335-8.889-2.971-11.235-7.035 c-2.346-4.064-2.524-9.028-0.474-13.249c8.383-17.259,51.811-104.284,83.594-122.633c11.97-6.911,25.553-10.437,39.323-10.2 c7.809,0.136,14.029,6.574,13.893,14.383c-0.133,7.725-6.438,13.896-14.132,13.896c-0.085,0-0.167,0-0.25-0.001 c-8.661-0.143-17.164,2.07-24.693,6.416c-15.866,9.159-43.553,55.059-62.62,91.388c41.004,1.659,94.593,0.631,110.455-8.535 c20.487-11.822,29.313-37.251,20.535-59.157c-2.906-7.249,0.618-15.481,7.867-18.386c7.251-2.9,15.481,0.617,18.386,7.867 c13.978,34.881-0.058,75.365-32.646,94.169C431.613,242.51,391.932,245.058,357.78,245.058z"></path>
                <path d="M447.407,129.481c-2.803,0-5.632-0.831-8.103-2.562c-0.407-0.286-0.817-0.564-1.232-0.836 c-6.53-4.283-8.352-13.051-4.068-19.581c4.282-6.529,13.048-8.353,19.579-4.068c0.658,0.431,1.308,0.872,1.953,1.324 c6.395,4.483,7.946,13.301,3.465,19.695C456.249,127.381,451.862,129.481,447.407,129.481z"></path>
              </g>
            </svg>
            <span className="label-line"></span>
            <span className="label-text-s">LETS TALK !</span>
          </div>
          <h2 className="connect-title">
            CONNECT WITH US, WE'RE
            <br />
            &nbsp;HERE TO HELP
          </h2>

        </div>

        {/* Gallery Grid */}
        <div className="connect-gallery">
          {/* Left tall image */}
          <div className="gallery-item item-left" ref={itemLeftRef}>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=600&fit=crop"
              alt="Modern office space"
            />
          </div>

          {/* Center top large image */}
          <div className="gallery-item item-center-top large-top" ref={itemCenterTopRef}>
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop"
              alt="Creative workspace with colorful mural"
            />
          </div>

          {/* Get in Touch text */}
          <div className="get-in-touch" ref={getInTouchRef}>
            <span className="handwritten">Get in Touch</span>
            <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 2C15 2 20 15 15 25C10 35 15 38 15 38" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 33L15 38L20 33" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Skype contact card */}
          <div className="gallery-item item-skype" ref={itemSkypeRef}>
            <div className="skype-card">
              <div className="skype-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324" fill="#888" />
                </svg>
              </div>
              <p className="skype-label">Direct contact:</p>
              <p className="skype-handle">Skype.agentize</p>
            </div>
          </div>

          {/* Right tall image */}
          <div className="gallery-item item-right right-tall" ref={itemRightRef}>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=500&fit=crop"
              alt="Modern building architecture"
            />
          </div>

          {/* Center bottom left small image */}
          <div className="gallery-item item-center-left" ref={itemCenterLeftRef}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
              alt="Team collaboration"
            />
          </div>

          {/* Center bottom large image */}
          <div className="gallery-item item-center-bottom" ref={itemCenterBottomRef}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
              alt="People working together"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;