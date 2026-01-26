

// import React from 'react';

// const DashboardCards = () => {
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

//   // Duplicate cards for seamless infinite loop
//   const duplicatedCards = [...cards, ...cards];

//   return (
//     <div className="dashboard-cards-section">
//       <h2 className="section-title">Quick Actions</h2>
      
//       <div className="cards-scroll-container">
//         <div className="cards-track">
//           {duplicatedCards.map((card, index) => (
//             <div 
//               key={`card-${card.id}-${index}`}
//               className="dashboard-card"
//               style={{ background: card.gradient }}
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


//export default DashboardCards;

import React, { useRef, useEffect } from 'react';

const DashboardCards = () => {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);

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
    if (!track) return;

    let isScrolling = false;
    let scrollTimeout;

    const handleWheel = (e) => {
      e.preventDefault();
      isScrolling = true;
      
      // Manual scroll
      scrollPositionRef.current += e.deltaX || e.deltaY;
      
      // Keep scroll position in bounds
      const maxScroll = track.scrollWidth / 3;
      if (scrollPositionRef.current < 0) {
        scrollPositionRef.current += maxScroll;
      } else if (scrollPositionRef.current >= maxScroll) {
        scrollPositionRef.current -= maxScroll;
      }
      
      track.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      
      // Resume animation after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    // Infinite animation
    const animate = () => {
      if (!isScrolling && track) {
        scrollPositionRef.current += 0.5;
        
        const maxScroll = track.scrollWidth / 3;
        if (scrollPositionRef.current >= maxScroll) {
          scrollPositionRef.current = 0;
        }
        
        track.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    track.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      track.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="dashboard-cards-section">
      <h2 className="section-title">Quick Actions</h2>
      
      <div className="cards-scroll-container-manual">
        <div className="cards-track-manual" ref={trackRef}>
          {duplicatedCards.map((card, index) => (
            <div 
              key={`card-${card.id}-${index}`}
              className="dashboard-card"
              style={{ background: card.gradient }}
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