import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GridSection.css';
import { useSplitText } from '../../hooks/useSplitText';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

interface GridItem {
  id: number;
  type: 'orange' | 'blue' | 'empty';
  title?: string;
  subtitle?: string;
  image?: string;
  hasArrow?: boolean;
  className?: string;
  position: [number, number, number?, number?];
}

const GridSection: React.FC = () => {
  const { charsRef, renderSplitText } = useSplitText();

  const gridItems: GridItem[] = [
    // 첫 번째 행
    {
      id: 1,
      type: 'orange',
      subtitle: 'Latest News',
      title: '순환경제사회법 시행령 일부개정령안 입법예고',
      className: 'news',
      position: [1, 1, 2, 2],
    },
    { id: 2, type: 'empty', position: [3, 1] },
    { id: 3, type: 'empty', position: [4, 1] },
    { id: 4, type: 'empty', position: [5, 1] },

    // 두 번째 행
    { id: 5, type: 'empty', position: [3, 2] },
    {
      id: 6,
      type: 'blue',
      title: '신뢰와 정확성을 바탕으로 하는 카이트 엔지니어링',
      position: [4, 2],
      image: '/assets/2-1.png',
    },
    { id: 7, type: 'empty', position: [5, 2] },

    // 세 번째 행
    { id: 8, type: 'empty', position: [1, 3] },
    { id: 9, type: 'empty', position: [2, 3] },
    {
      id: 10,
      type: 'blue',
      title: '신뢰와 정확성을 바탕으로 하는 카이트 엔지니어링',
      position: [3, 3],
      image: '/assets/2-2.png',
    },
    { id: 11, type: 'empty', position: [4, 3] },
    {
      id: 12,
      type: 'blue',
      title: '고객 맞춤형 환경 솔루션 제공',
      position: [5, 3],
      image: '/assets/2-3.png',
    },

    // 네 번째 행
    { id: 13, type: 'empty', position: [1, 4] },
    {
      id: 14,
      type: 'blue',
      title: '신뢰와 정확성을 바탕으로 하는 카이트 엔지니어링',
      position: [2, 4],
      image: '/assets/2-4.png',
    },
    { id: 15, type: 'empty', position: [3, 4] },
    {
      id: 16,
      type: 'blue',
      title: '고객 맞춤형 환경 솔루션 제공',
      position: [4, 4],
      image: '/assets/2-5.png',
    },
    { id: 17, type: 'empty', position: [5, 4] },

    // 다섯 번째 행
    { id: 18, type: 'empty', position: [1, 5] },
    { id: 19, type: 'empty', position: [2, 5] },
    {
      id: 20,
      type: 'orange',
      title: '바로가기',
      hasArrow: true,
      className: 'link',
      position: [3, 5],
    },
    { id: 21, type: 'empty', position: [4, 5] },
    { id: 22, type: 'empty', position: [5, 5] },
  ];

  useEffect(() => {
    // 텍스트 애니메이션
    gsap.to(charsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.grid-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [charsRef]);

  // 그리드 아이템 렌더링 함수
  const renderGridItem = (item: GridItem) => {
    const style: React.CSSProperties = {};

    if (item.position) {
      style.gridColumn = item.position[2] ? `${item.position[0]} / span ${item.position[2]}` : `${item.position[0]}`;

      style.gridRow = item.position[3] ? `${item.position[1]} / span ${item.position[3]}` : `${item.position[1]}`;
    }

    if (item.type === 'empty') {
      return <div key={item.id} className="grid-item empty" style={style} />;
    }

    return (
      <div key={item.id} className={`grid-item ${item.type} ${item.className || ''}`} style={style}>
        <div className="grid-item-content">
          {item.subtitle && (
            <div className="title-small" style={{ opacity: 1 }}>
              {item.subtitle}
            </div>
          )}

          {item.title && (
            <h3 className={item.subtitle ? 'title-large' : ''}>
              {item.id === 20
                ? item.title
                : renderSplitText(item.title, item.id, {
                    style: { opacity: 0, transform: 'translateY(20px)' },
                  })}
            </h3>
          )}

          {item.hasArrow && (
            <div className="arrow-container">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </div>
          )}
        </div>

        {item.image && (
          <div className="hover-image">
            <img src={item.image} alt={item.title || '이미지'} />
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="grid-section">
      <div className="grid-container">{gridItems.map(renderGridItem)}</div>
    </section>
  );
};

export default GridSection;
