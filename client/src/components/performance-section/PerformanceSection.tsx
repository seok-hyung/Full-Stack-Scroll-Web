import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PerformanceSection.css';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface PerformanceImage {
  id: number;
  src: string;
  alt: string;
  speed: number;
  width?: string;
  height?: string;
}

const PerformanceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  const performanceImages: PerformanceImage[] = [
    { id: 1, src: '/assets/1.png', alt: '이미지 1', speed: 0.5, width: '300px', height: '300px' },
    { id: 5, src: '/assets/5.png', alt: '이미지 5', speed: 1.2, width: '400px', height: '400px' },
    { id: 4, src: '/assets/4.png', alt: '이미지 4', speed: 2, width: '300px', height: '250px' },
    { id: 3, src: '/assets/3.png', alt: '이미지 3', speed: 1.5, width: '300px', height: '400px' },
    { id: 2, src: '/assets/2.png', alt: '이미지 2', speed: 1.7, width: '400px', height: '300px' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 초기 애니메이션
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        })
        .fromTo(containerRef.current, { backgroundColor: 'transparent' }, { backgroundColor: '#000000', duration: 1 })
        .fromTo(
          [titleRef.current, buttonRef.current],
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 },
          '<'
        );

      // 버튼 호버 애니메이션
      if (buttonRef.current) {
        const button = buttonRef.current;
        const arrowIcon = button.querySelector('svg');

        button.addEventListener('mouseenter', () => {
          gsap
            .to(arrowIcon, { x: 10, duration: 0.1, ease: 'power2.out' })
            .then(() => gsap.to(arrowIcon, { x: 0, duration: 0.1, ease: 'power2.in' }));
        });
      }

      // 메인 스크롤 애니메이션
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
        },
      });

      const xPositions = ['50%', '10%', '30%', '70%', '90%'];

      // 이미지 애니메이션
      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;

        if (index === 0) {
          // 중앙 이미지의 초기 상태 설정
          gsap.set(ref, {
            left: '50%',
            top: '50%',
            xPercent: -50,
            yPercent: -50,
            y: '100vh',
            opacity: 0,
            width: performanceImages[index].width,
            height: performanceImages[index].height,
            transformOrigin: 'center center',
            position: 'absolute',
          });

          // 중앙 이미지 등장 애니메이션 효과
          mainTimeline.to(ref, {
            y: '0vh',
            opacity: 1,
            duration: 10,
          });
        } else {
          // 나머지 이미지 애니메이션 초기 상태
          gsap.set(ref, {
            left: xPositions[index],
            y: '150vh',
            opacity: 0.8,
            width: performanceImages[index].width,
            height: performanceImages[index].height,
          });

          // 각 이미지마다 다른 속도 적용
          const baseDuration = 15;
          const speedFactor = performanceImages[index].speed;
          const duration = baseDuration / speedFactor;

          mainTimeline.to(
            ref,
            {
              y: '-150vh',
              duration: duration,
              ease: 'none',
            },
            '<'
          );
        }
      });

      // 중앙 이미지 확대 애니메이션
      mainTimeline.to(
        imageRefs.current[0],
        {
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          duration: 5,
          ease: 'power2.inOut',
          position: 'fixed',
          zIndex: 5,
        },
        '>-2'
      );

      // 이미지가 확대되는 동안 동시에 오버레이 애니메이션 시작
      mainTimeline.to(
        overlayRef.current,
        {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          opacity: 1,
          zIndex: 6,
          duration: 5,
        },
        '<'
      );

      // 텍스트와 버튼의 z-index 조정
      mainTimeline.to(
        [titleRef.current, buttonRef.current],
        {
          zIndex: 15,
          duration: 0.1,
        },
        '<+2'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="performance-section" ref={sectionRef}>
      <div className="performance-container" ref={containerRef}>
        <div className="performance-content">
          <div className="fixed-content">
            <h2 ref={titleRef}>Environmental consultancy firm offering high-value advisory services</h2>
            <Link to="/" className="button-container" ref={buttonRef}>
              <span>사업실적</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </Link>
          </div>

          <div className="performance-images">
            {performanceImages.map((image, index) => (
              <div
                key={image.id}
                className={`performance-image ${index === 0 ? 'featured' : ''}`}
                ref={(el) => {
                  if (el) {
                    imageRefs.current[index] = el;
                  }
                }}>
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>

          <div className="overlay" ref={overlayRef}></div>
        </div>
      </div>
    </section>
  );
};
export default PerformanceSection;
