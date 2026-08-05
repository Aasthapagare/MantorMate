import React, { useRef, useEffect, useState } from 'react';

const DashboardCards = () => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  const cards = [
    {
      id: 1,
      title: 'Project Idea',
      icon: 'bx-bulb',
      description: 'Review and approve student project proposals',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)'
    },
    {
      id: 2,
      title: 'Attendance',
      icon: 'bx-check-circle',
      description: 'Mark and track student attendance',
      gradient: 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)'
    },
    {
      id: 3,
      title: 'Schedule Meeting',
      icon: 'bx-calendar-plus',
      description: 'Book sessions with your students',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)'
    },
    {
      id: 4,
      title: 'Join Meeting',
      icon: 'bx-video',
      description: 'Connect with students instantly',
      gradient: 'linear-gradient(135deg, #1A252F 0%, #2C3E50 100%)'
    },
    {
      id: 5,
      title: 'See Uploaded Files',
      icon: 'bx-folder-open',
      description: 'View student submissions and documents',
      gradient: 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)'
    }
  ];

  const duplicatedCards = [...cards, ...cards, ...cards];

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Handle manual scroll via wheel/touchpad
    const handleWheel = (e) => {
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      
      if (isHorizontalScroll || e.shiftKey) {
        e.preventDefault();
        scrollPositionRef.current += e.deltaX;
      } else {
        e.preventDefault();
        scrollPositionRef.current += e.deltaY;
      }
      
      const maxScroll = track.scrollWidth / 3;
      if (scrollPositionRef.current < 0) {
        scrollPositionRef.current += maxScroll;
      } else if (scrollPositionRef.current >= maxScroll) {
        scrollPositionRef.current -= maxScroll;
      }
    };

    // Infinite auto-scroll animation
    const animate = () => {
      if (track) {
        if (!isPaused) {
          scrollPositionRef.current += 1;
        }
        
        const maxScroll = track.scrollWidth / 3;
        if (scrollPositionRef.current >= maxScroll) {
          scrollPositionRef.current = 0;
        }
        
        track.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isPaused]);

  return (
    <div className="dashboard-cards-section">
      <h2 className="section-title">Quick Actions</h2>
      
      <div 
        className="cards-scroll-container-manual" 
        ref={containerRef}
        style={{ cursor: 'grab' }}
      >
        <div className="cards-track-manual" ref={trackRef}>
          {duplicatedCards.map((card, index) => (
            <div 
              key={`card-${card.id}-${index}`}
              className="dashboard-card"
              style={{ background: card.gradient }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="card-icon">
                <i className={`bx ${card.icon}`}></i>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <button className="card-action">
                Get Started <i className='bx bx-right-arrow-alt'></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;