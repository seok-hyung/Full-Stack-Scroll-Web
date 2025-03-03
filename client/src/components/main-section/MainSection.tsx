import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './MainSection.css';
import { useSplitText } from '../../hooks/useSplitText';

const MainSection: React.FC = () => {
  const { charsRef, renderSplitText } = useSplitText();

  useEffect(() => {
    gsap.to(charsRef.current, {
      opacity: 1,
      delay: 0.6,
      stagger: 0.03,
      duration: 1,
      ease: 'power2.out',
    });
  }, [charsRef]);

  return (
    <section className="main-section">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="/assets/background-video.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>

      <div className="main-content">
        <div className="text-container">
          <h1 className="main-title">
            {renderSplitText('지속 가능한 미래와 고객의 비즈니스 성공을 위한 혁신적인 환경 솔루션을 제공합니다')}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
