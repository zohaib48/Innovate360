import React from 'react';
import { ArrowRight, Pause } from "lucide-react";
// Assuming you have the image imported
import teamImage from "../assets/team-working.jpg"; 
import moonImage from "../assets/moon.png"; 
import './VideoDetailSection.css';

const AboutSection = () => {
  return (
    <section className="w-100 py-5 bg-white">
      <div className="responsive-container">
        {/* Bootstrap Grid: Row with 3 columns on large screens, 1 on mobile */}
        <div className="row align-items-center gy-5">
          
          {/* Left - Circular Image with Video Controls */}
          <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-start">
            <div className="position-relative">
              {/* Image Container - Using inline styles for specific dimensions to match Tailwind's w-64/w-80 */}
              <div 
                className="rounded-circle overflow-hidden shadow-lg"
               
              >
                <img
                  src={teamImage}
                  alt="Team working collaboratively"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              
              {/* Pause button overlay */}
              <button 
                className="btn btn-light rounded-circle position-absolute d-flex align-items-center justify-content-center shadow-sm pause-btn"
                style={{width: '45px', height: '45px' }}
                aria-label="Pause video"
              >
                <Pause  style={{width:'40px'}}/>
              </button>
            </div>
          </div>

          {/* Center - Stats */}
          <div 
            className="col-12 col-lg-3 text-center text-lg-start position-relative"
            style={{
              backgroundImage: `url(${moonImage})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '500px',
              zIndex: 1
            }}
          >
          {/* Center - Stats */}
<div className="col-12 col-lg-3 d-flex justify-content-center my-col">


  <div className="text-center">
    <div className="position-relative d-inline-block">
      <p 
        className="number-display text-dark"
      >
        21
      </p>
      <div 
        className="position-absolute d-flex bg-white align-items-center justify-content-center rounded-circle border border-2 my-m"
        style={{ 
          width: '50px', 
          height: '50px',
          right: '0',
          fontFamily:'Helvetica Neue',
          top: '30%',
          transform: 'translateY(-50%)',
          marginRight: '-65px'
        }}
      >
        <span className="text-dark" style={{ fontSize: '1.5rem', fontWeight: '600' }}>M</span>
      </div>
    </div>
    <p 
      className="text-muted lead " 
      style={{ 
        width: '100%',
        maxWidth: '250px',
       
        textAlign:'left',
        fontSize: '20px',
        fontFamily:'Noyh',
        lineHeight: '1.3'
      }}
    >
      We assisted companies in securing over <span style={{fontFamily:'-apple-system'}}>$</span>21M in funding successfully.
    </p>
  </div>
</div>
          </div>

          {/* Vertical Divider - Only visible on lg screens and up */}
          <div className="col-12 col-lg-1 d-none d-lg-flex justify-content-center">
            <div style={{ width: '1px', height: '500px', backgroundColor: '#e9ecef' }}></div>
          </div>

          {/* Right - About Text */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-4">
              <p className="text-dark lead text-muted " style={{ fontFamily:'Noyh',fontSize: '20px',}}>
                Welcome to Agentise, where creativity meets innovation. Founded in
                2015, we are a digital agency committed to transforming ideas into
                impactful digital experiences. Our passionate team of designers,
                developers, and strategists works collaboratively to deliver
                tailored solutions that drive results and elevate your brand.
              </p>
              
              {/* Note: 'bg-lime' isn't standard Bootstrap. 
                  I used 'btn-success' (green), but you can use a custom class or inline style for the exact lime color. */}
              <div>
                 <button  style={{fontFamily:'Helvetica Neue'}} className="btn services-cta-btn fs-6 px-4 py-3 fw-semibold">
              Explore Services →
            </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;