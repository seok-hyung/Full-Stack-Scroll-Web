import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CardSection.css';
import { useSplitText } from '../../hooks/useSplitText';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number;
  title: string;
  content: string;
  image: string;
}

const CardSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { charsRef, renderSplitText } = useSplitText();

  const cards: CardData[] = [
    {
      id: 1,
      title: '컨설팅부',
      content:
        '다양한 경험과 노하우를 바탕으로 기후변화 대응 최적전략 수립 및 탄소배출권 관리 및 국가와 기업의 경쟁령을 고취합니다',
      image: '/assets/scale1.jpg',
    },
    {
      id: 2,
      title: '글로벌연구센터',
      content:
        '기후변화 대응 및 ESG 경영 선도를 위해 국제개발협력, 정책연구, 신재생에너지 및 탄소감축 사업 등 다양한 현지 맞춤형 솔루션을 제공합니다',
      image: '/assets/scale2.jpg',
    },
    {
      id: 3,
      title: '정책연구부',
      content:
        '국가, 지방자치단체, 사업장 등이 환경분야 및 기후변화에 선도적으로 대응할 수 있도록 정책 개발 및 대안 마련합니다',
      image: '/assets/scale3.jpg',
    },
    {
      id: 4,
      title: '기술개발부',
      content:
        '세균 및 바이러스 제거, 지속적인 효과, 환경 친화적인 항균ᆞ항바이러스 나노물질의 개발로 새로운 제품과 서비스를 제공합니다',
      image: '/assets/scale4.jpg',
    },
  ];

  useEffect(() => {
    // 텍스트 애니메이션
    gsap.to(charsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.02,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // 카드 애니메이션
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1500',
          scrub: 1,
          pin: true,
        },
      })
      .to(
        '.card:nth-child(4)',
        {
          flex: '0 0 25%',
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      )
      .to('.card', {
        flex: '0 0 25%',
        duration: 1,
        ease: 'power2.inOut',
      });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [charsRef]);

  const commonStyle = { style: { transform: 'translateY(20px)' } };

  return (
    <section className="card-section" ref={sectionRef}>
      <div className="section-content">
        <div className="section-text">
          <div className="text-sub-title">{renderSplitText('Our Expertise', 0, commonStyle)}</div>
          <div className="text-title">{renderSplitText('깊이 있는 전문 지식으로', 1, commonStyle)}</div>
          <div className="text-title">{renderSplitText('지속 가능한 미래를 설계합니다', 2, commonStyle)}</div>
        </div>

        <div className="cards-container">
          {cards.map((card) => (
            <div key={card.id} className="card" style={{ backgroundImage: `url(${card.image})` }}>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSection;
