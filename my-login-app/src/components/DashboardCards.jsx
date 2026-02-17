


// import React, { useRef, useEffect, useState } from 'react';

// const DashboardCards = () => {
//   const trackRef = useRef(null);
//   const animationRef = useRef(null);
//   const scrollPositionRef = useRef(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const cards = [
//     {
//       id: 1,
//       title: 'Ask Doubt',
//       icon: 'bx-help-circle',
//       description: 'Get your questions answered by mentors',
//       gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)'
//     },
//     {
//       id: 2,
//       title: 'Upload Files',
//       icon: 'bx-upload',
//       description: 'Share documents and assignments',
//       gradient: 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)'
//     },
//     {
//       id: 3,
//       title: 'Schedule Meeting',
//       icon: 'bx-calendar-plus',
//       description: 'Book sessions with your mentor',
//       gradient: 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)'
//     },
//     {
//       id: 4,
//       title: 'Join Meeting',
//       icon: 'bx-video',
//       description: 'Connect with your mentor instantly',
//       gradient: 'linear-gradient(135deg, #1A252F 0%, #2C3E50 100%)'
//     },
//     {
//       id: 5,
//       title: 'Create Project Group',
//       icon: 'bx-group',
//       description: 'Collaborate with team members',
//       gradient: 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)'
//     },
//     {
//       id: 6,
//       title: 'Choose a Guide',
//       icon: 'bx-user-check',
//       description: 'Select your project mentor',
//       gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)'
//     },
//     {
//       id: 7,
//       title: 'Submit Project Idea',
//       icon: 'bx-bulb',
//       description: 'Share your innovative ideas',
//       gradient: 'linear-gradient(135deg, #1A252F 0%, #34495E 100%)'
//     }
//   ];

//   const duplicatedCards = [...cards, ...cards, ...cards];

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;

//     // Infinite animation with increased speed
//     const animate = () => {
//       if (!isPaused && track) {
//         scrollPositionRef.current += 1; // Increased from 0.5 to 1 for faster speed
        
//         const maxScroll = track.scrollWidth / 3;
//         if (scrollPositionRef.current >= maxScroll) {
//           scrollPositionRef.current = 0;
//         }
        
//         track.style.transform = `translateX(-${scrollPositionRef.current}px)`;
//       }
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [isPaused]);

//   return (
//     <div className="dashboard-cards-section">
//       <h2 className="section-title">Quick Actions</h2>
      
//       <div className="cards-scroll-container-manual">
//         <div className="cards-track-manual" ref={trackRef}>
//           {duplicatedCards.map((card, index) => (
//             <div 
//               key={`card-${card.id}-${index}`}
//               className="dashboard-card"
//               style={{ background: card.gradient }}
//               onMouseEnter={() => setIsPaused(true)}
//               onMouseLeave={() => setIsPaused(false)}
//             >
//               <div className="card-icon">
//                 <i className={`bx ${card.icon}`}></i>
//               </div>
//               <h3 className="card-title">{card.title}</h3>
//               <p className="card-description">{card.description}</p>
//               <button className="card-action">
//                 Get Started <i className='bx bx-right-arrow-alt'></i>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCards;



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
      title: 'Ask Doubt',
      icon: 'bx-help-circle',
      description: 'Get your questions answered by mentors',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)'
    },
    {
      id: 2,
      title: 'Upload Files',
      icon: 'bx-upload',
      description: 'Share documents and assignments',
      gradient: 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)'
    },
    {
      id: 3,
      title: 'Schedule Meeting',
      icon: 'bx-calendar-plus',
      description: 'Book sessions with your mentor',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #1A252F 100%)'
    },
    {
      id: 4,
      title: 'Join Meeting',
      icon: 'bx-video',
      description: 'Connect with your mentor instantly',
      gradient: 'linear-gradient(135deg, #1A252F 0%, #2C3E50 100%)'
    },
    {
      id: 5,
      title: 'Create Project Group',
      icon: 'bx-group',
      description: 'Collaborate with team members',
      gradient: 'linear-gradient(135deg, #34495E 0%, #2C3E50 100%)'
    },
    {
      id: 6,
      title: 'Choose a Guide',
      icon: 'bx-user-check',
      description: 'Select your project mentor',
      gradient: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)'
    },
    {
      id: 7,
      title: 'Submit Project Idea',
      icon: 'bx-bulb',
      description: 'Share your innovative ideas',
      gradient: 'linear-gradient(135deg, #1A252F 0%, #34495E 100%)'
    }
  ];

  const duplicatedCards = [...cards, ...cards, ...cards];

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Handle manual scroll via wheel/touchpad
    const handleWheel = (e) => {
      // Check if scroll is more horizontal or vertical
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      
      if (isHorizontalScroll || e.shiftKey) {
        e.preventDefault();
        // Horizontal scroll
        scrollPositionRef.current += e.deltaX;
      } else {
        // Vertical scroll - convert to horizontal
        e.preventDefault();
        scrollPositionRef.current += e.deltaY;
      }
      
      // Keep position within valid bounds (infinite loop range)
      const maxScroll = track.scrollWidth / 3;
      if (scrollPositionRef.current < 0) {
        scrollPositionRef.current += maxScroll;
      } else if (scrollPositionRef.current >= maxScroll) {
        scrollPositionRef.current -= maxScroll;
      }
    };

    // Infinite auto-scroll animation (unchanged)
    const animate = () => {
      if (track) {
        // Auto-scroll only when not paused
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

    // Start animation
    animate();
    
    // Add wheel listener to container
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