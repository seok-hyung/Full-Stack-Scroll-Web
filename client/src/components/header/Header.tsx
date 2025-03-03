import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './Header.css';

interface MenuItem {
  title: string;
  subItems: { name: string; path: string }[];
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [isInitialRender, setIsInitialRender] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const subMenuRefs = useRef<(HTMLUListElement | null)[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const menuItemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        title: 'WHO WE ARE',
        subItems: [
          { name: 'CAIT VALUE', path: '/' },
          { name: 'CEO 메시지', path: '/' },
          { name: '연혁', path: '/' },
        ],
      },
      {
        title: 'WHAT WE CAN',
        subItems: [
          { name: '컨설팅부', path: '/' },
          { name: '글로벌연구센터', path: '/' },
          { name: '정책연구부', path: '/' },
          { name: '기술개발부', path: '/' },
        ],
      },
      {
        title: 'WHAT WE DO',
        subItems: [
          { name: '사업실적', path: '/' },
          { name: '발표논문', path: '/board/presentation' },
          { name: 'NEWS', path: '/' },
        ],
      },
    ],
    []
  );

  // 초기 렌더링 지연 효과
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsInitialRender(false);
      gsap.fromTo(headerRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      if (isInitialRender) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // 아래로 스크롤 - 헤더 숨김
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // 위로 스크롤 - 헤더 표시
        setIsVisible(true);
        setIsScrolled(currentScrollY > 0);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isInitialRender]);

  // 마우스 진입 처리
  const handleMouseEnter = () => {
    if (isInitialRender) return;

    // 이전 애니메이션이 있으면 중단
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // 새 애니메이션 타임라인 생성
    const tl = gsap.timeline();
    animationRef.current = tl;

    // 배경 및 메뉴 애니메이션
    tl.to(backgroundRef.current, { height: '300px', duration: 0.8 });

    // 메뉴 아이템 및 버튼 색상 변경
    menuItemRefs.current.forEach((ref) => {
      if (ref) tl.to(ref, { color: '#333', duration: 0.2 }, '<');
    });

    tl.to(
      contactButtonRef.current,
      {
        color: '#333',
        borderColor: '#333',
        duration: 0.2,
      },
      '<'
    );

    // 서브메뉴 표시
    subMenuRefs.current.forEach((ref) => {
      if (ref) {
        tl.to(ref, { y: 0, opacity: 1, duration: 0.7, visibility: 'visible', pointerEvents: 'auto' }, '<0.13');
      }
    });
  };

  // 마우스 이탈 처리
  const handleMouseLeave = () => {
    if (isInitialRender) return;

    // 이전 애니메이션이 있으면 중단
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // 새 애니메이션 타임라인 생성
    const tl = gsap.timeline({
      onComplete: () => {
        // 애니메이션 완료 후 서브메뉴 완전히 숨김
        subMenuRefs.current.forEach((ref) => {
          if (ref) {
            gsap.set(ref, { visibility: 'hidden', pointerEvents: 'none' });
          }
        });
      },
    });
    animationRef.current = tl;

    // 서브메뉴 숨김 (먼저 실행)
    subMenuRefs.current.forEach((ref) => {
      if (ref) tl.to(ref, { y: -20, opacity: 0, duration: 0.2 }, 0);
    });

    // 배경 및 메뉴 애니메이션 복원
    tl.to(backgroundRef.current, { height: '0', duration: 0.3 }, 0.1);

    // 메뉴 아이템 및 버튼 색상 복원
    menuItemRefs.current.forEach((ref) => {
      if (ref) tl.to(ref, { color: 'white', duration: 0.2 }, 0.1);
    });

    tl.to(
      contactButtonRef.current,
      {
        color: 'white',
        borderColor: 'white',
        duration: 0.2,
      },
      0.1
    );
  };

  // 서브메뉴 참조 초기화
  useEffect(() => {
    subMenuRefs.current = subMenuRefs.current.slice(0, menuItems.length);
  }, [menuItems]);

  return (
    <header
      ref={headerRef}
      className={`header ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="header-background" ref={backgroundRef}></div>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/assets/logo.png" alt="CAIT 로고" />
          </Link>
        </div>

        <nav className="main-nav">
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li key={item.title} className="menu-item">
                <span
                  ref={(el) => {
                    if (el) menuItemRefs.current[index] = el;
                  }}>
                  {item.title}
                </span>
                <ul
                  className="sub-items-list"
                  ref={(el) => {
                    if (el) subMenuRefs.current[index] = el;
                  }}>
                  {item.subItems?.map((subItem) => (
                    <li key={subItem.name}>
                      <Link to={subItem.path}>{subItem.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="contact-button">
          <button ref={contactButtonRef}>CONTACT</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
