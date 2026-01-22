import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Container, Row, Col } from 'react-bootstrap';
import './GameShowcaseSection.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Aew from '../../assets/videos/Aew.mp4';
import Crime from '../../assets/videos/Crimeweb.mp4';
import Golf from '../../assets/videos/Minigolfweb.mp4';

const gameData = [
  {
    genre: 'IDEAL GAMES',
    description: 'Idle Games are designed around progressive automation and rewarding gameplay loops, allowing players to grow their power, resources, or teams even while away from the game.',
    games: [
      {
        id: 1,
        title: 'Aew - Rise to the top',
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
        title: 'Idle Golf',
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
        title: 'Mystic Realms',
        description: 'Immersive RPG with deep character customization and epic quests.',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', // Replace with your video URL
      },
      {
        id: 5,
        title: 'Dragon Quest',
        description: 'Fantasy RPG featuring magical creatures and strategic turn-based combat.',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', // Replace with your video URL
      },
      {
        id: 6,
        title: 'Chronicles of Legends',
        description: 'Story-driven RPG with branching narratives and meaningful choices.',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', // Replace with your video URL
      },
    ],
  },
  {
    genre: 'Puzzle',
    description: 'Challenge your mind with engaging puzzles and brain-teasing gameplay mechanics.',
    games: [
      {
        id: 7,
        title: 'Mind Bender',
        description: 'Challenging puzzle game that tests your logic and problem-solving skills.',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', // Replace with your video URL
      },
      {
        id: 8,
        title: 'Color Match',
        description: 'Addictive puzzle game with vibrant colors and satisfying match mechanics.',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', // Replace with your video URL
      },
      {
        id: 9,
        title: 'Block Master',
        description: 'Classic block puzzle game reimagined with modern graphics and new challenges.',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', // Replace with your video URL
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
            {gameData.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                className={`game-section ${sectionIndex === currentSection ? 'active' : ''}`}
              >
                <Container>
                  <Row className="g-4">
                    {section.games.map((game) => (
                      <Col key={game.id} xs={12} md={6} lg={4}>
                        <div className="game-card">
                          <div className="mobile-frame">
                            <div className="mobile-screen">
                              <div className="notch"></div>
                              <div className="video-wrapper">
                                <video
                                  src={game.video}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  className="game-video"
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
                    ))}
                  </Row>
                </Container>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GameShowcaseSection;

