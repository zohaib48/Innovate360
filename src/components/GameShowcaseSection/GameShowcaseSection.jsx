import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Container, Row, Col } from 'react-bootstrap';
import './GameShowcaseSection.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Aew from '../../assets/videos/Aew.mp4';
import Crime from '../../assets/videos/Crimeweb.mp4';
import Golf from '../../assets/videos/Minigolfweb.mp4';
import Catchthesuspect from '../../assets/videos/Catchthesuspect.mp4';
import SneakInto from '../../assets/videos/Sneakin.mp4';
import Trickortreat from '../../assets/videos/Trickortreat.mp4'; 
import BladesofBattle from '../../assets/videos/Bladesofbattle-1.mp4';
import ActionRogueAdventure from '../../assets/videos/Archero.mp4';
import ZombieCatchers from '../../assets/videos/Zombiecatchers.mp4';

const gameData = [
  {
    genre: 'IDLE GAMES',
    description: 'Idle Games are designed around progressive automation and rewarding gameplay loops, allowing players to grow their power, resources, or teams even while away from the game.',
    games: [
      {
        id: 1,
        title: 'AEW - Rise to the top',
        description: 'Build and strategize with legendary superstars in this licensed wrestling idle RPG. Progress through automated combat and lead your team to championship glory.',
        video: Aew, // Replace with your video URL
      },
      {
        id: 2,
        title: 'IDLE Crime',
        description: 'A licensed mafia empire-building idle RPG where players expand a criminal network, recruit operatives, and dominate city territories through strategy and combat.',
        video: Crime, // Replace with your video URL
      },
      {
        id: 3,
        title: 'IDLE Golf',
        description: 'A licensed idle golf simulation combining collection, upgrades, and automated gameplay, with a built-in mini-golf mode for variety and engagement.',
        video: Golf, // Replace with your video URL
      },
    ],
  },
  {
    genre: 'RPG',
    description: 'Immerse yourself in rich storylines, character development, and epic adventures.',
    games: [
      {
        id: 4,
        title: 'Blades of Battle',
        description: 'A fast-paced licensed mobile action RPG featuring real-time strategic combat and hero customization. It blends deep character progression with seamless PvE and PvP multiplayer battles.',
        video: BladesofBattle, // Replace with your video URL
      },
    
      {
        id: 5,
        title: 'Zombie Catchers',
        description: 'Zombie Catchers is a licensed fun and fast-paced action game where players hunt and capture zombies using traps, gadgets, and jetpacks. The gameplay blends reflex-based catching with strategic upgrades to keep players engaged across levels.',
        video: ZombieCatchers, // Replace with your video URL
      },
      {
        id: 6,
        title: 'Action Rogue Adventure',
        description: 'Action Rogue Adventure is a licensed full-scale rogue-like action project inspired by Archero, featuring multiple heroes, diverse enemies, and procedurally generated dungeon rooms.',
        video: ActionRogueAdventure, // Replace with your video URL
      },
    ],
  },
  {
    genre: 'HYPER CASUAL',
    description: 'Hyper-casual games deliver fast, intuitive gameplay with simple mechanics and short sessions.They focus on smooth controls, instant feedback, and engaging visuals for quick, replayable fun.',
    games: [
      {
        id: 7,
        title: 'Trick or Treat',
        description: 'A licensed zombie-themed survival game where players save civilians while avoiding zombie detection across progressive levels.',
        video: Trickortreat, // Replace with your video URL
      },
      {
        id: 8,
        title: 'Master Robber',
        description: 'A licensed stealth-based game developed in collaboration with another developer. Players must reach the safe undetected by guards through a series of mini-games.',
        video: SneakInto, // Replace with your video URL
      },
      {
        id: 9,
        title: 'Catch the Suspect',
        description: 'A licensed reflex-based casual game where players catch the suspect in a moving crowd, our contributions focused on crowd spawning logic and UI feedback improvements.',
        video: Catchthesuspect, // Replace with your video URLA reflex-based casual game focused on catching suspects in crowds. Optimized via custom crowd-spawning logic and enhanced UI feedback
      },
    ],
  },
];

const GameShowcaseSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);     
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const autoPlayTimerRef = useRef(null);

  // Auto-swipe functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentSection((prev) => (prev + 1) % gameData.length);
      }, 5000); // Change section every 5 seconds
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying]);

  // GSAP animations - New style with fade + scale + rotation
  useEffect(() => {
    const currentSectionElement = sectionRefs.current[currentSection];
    if (!currentSectionElement) return;

    // Animate section entrance with scale and fade
    gsap.fromTo(
      currentSectionElement,
      {
        opacity: 0,
        scale: 0.8,
        rotationY: -15,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.7,
        ease: 'back.out(1.2)',
      }
    );

    // Animate game cards with stagger and scale
    const gameCards = currentSectionElement.querySelectorAll('.game-card');
    gsap.fromTo(
      gameCards,
      {
        opacity: 0,
        scale: 0.7,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.15,
      }
    );

    // Animate previous section out with fade and scale down
    sectionRefs.current.forEach((section, index) => {
      if (index !== currentSection && section) {
        gsap.to(section, {
          opacity: 0,
          scale: 0.9,
          rotationY: 15,
          duration: 0.4,
          ease: 'power2.in',
        });
      }
    });
  }, [currentSection]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentSection((prev) => (prev + 1) % gameData.length);
  };

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentSection((prev) => (prev - 1 + gameData.length) % gameData.length);
  };

  const handleSectionClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentSection(index);
  };

  return (
    <section className="game-showcase-section" ref={containerRef}>
      <Container fluid className="px-0">
        <div className="game-showcase-wrapper">
          {/* Navigation Arrows */}
          <button
            className="nav-arrow nav-arrow-left"
            onClick={handlePrevious}
            aria-label="Previous section"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            className="nav-arrow nav-arrow-right"
            onClick={handleNext}
            aria-label="Next section"
          >
            <ChevronRight size={32} />
          </button>

          {/* Section Indicator */}
          <div className="section-indicator">
            {gameData.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === currentSection ? 'active' : ''}`}
                onClick={() => handleSectionClick(index)}
                aria-label={`Go to ${gameData[index].genre} section`}
              />
            ))}
          </div>

          {/* Genre Title */}
          <div className="genre-title-container">
            <h2 className="genre-title">{gameData[currentSection].genre}</h2>
            <p className="genre-description">{gameData[currentSection].description}</p>
          </div>

          {/* Game Sections */}
          <div className="sections-container">
            {gameData.map((section, sectionIndex) => {
              const isActive = sectionIndex === currentSection;

              return (
                <div
                  key={sectionIndex}
                  ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                  className={`game-section ${isActive ? 'active' : ''}`}
                >
                  {/* Only render videos and heavy content for the active section */}
                  {isActive && (
                    <Container>
                      <Row className="g-4">
                        {section.games.map((game, gameIndex) => {
                          // Check if this is the second game in the RPG section (index 1)
                          const isRPGSecondGame = sectionIndex === 1 && gameIndex === 1;
                          const isRPGSection = sectionIndex === 1;
                          // For RPG section: make middle column wider, others narrower
                          let colProps = { xs: 12, md: 4, lg: 4 };
                          if (isRPGSection) {
                            if (isRPGSecondGame) {
                              colProps = { xs: 12, md: 6, lg: 6 }; // Middle column - wider
                            } else {
                              colProps = { xs: 12, md: 3, lg: 3 }; // Side columns - narrower
                            }
                          }
                          return (
                            <Col 
                              key={game.id} 
                              xs={colProps.xs}
                              md={colProps.md}
                              lg={colProps.lg}
                              className={isRPGSecondGame ? 'tablet-column' : ''}
                            >
                              <div className={`game-card ${isRPGSecondGame ? 'tablet-card' : ''}`}>
                                <div className={`mobile-frame ${isRPGSecondGame ? 'tablet-frame' : ''}`}>
                                  <div className={`mobile-screen ${isRPGSecondGame ? 'tablet-screen' : ''}`}>
                                    {!isRPGSecondGame && <div className="notch"></div>}
                                    <div className={`video-wrapper ${isRPGSecondGame ? 'tablet-video-wrapper' : ''}`}>
                                      <video
                                        src={game.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="none"
                                        className={`game-video ${isRPGSecondGame ? 'tablet-video' : ''}`}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="game-content">
                                  <h3 className="game-title">{game.title}</h3>
                                  <p className="game-description">{game.description}</p>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Container>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GameShowcaseSection;

