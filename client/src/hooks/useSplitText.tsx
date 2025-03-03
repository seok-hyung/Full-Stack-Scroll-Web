import React, { useRef } from 'react';

/**
 * 텍스트를 글자 단위로 분할하여 애니메이션에 사용할 수 있는 커스텀 훅
 *
 * @returns {Object} 분할된 텍스트 요소에 대한 참조와 렌더링 함수
 * @example
 * const { charsRef, renderSplitText } = useSplitText();
 *
 * 기본 사용법
 * {renderSplitText('텍스트', 'unique-id')}
 *
 * 스타일 적용
 * {renderSplitText('텍스트', 'unique-id', { style: { transform: 'translateY(20px)' } })}
 */
export const useSplitText = () => {
  const charsRef = useRef<HTMLSpanElement[]>([]);

  /**
   * 텍스트를 글자 단위로 분할하고 span 요소로 감싸는 함수
   *
   * @param {string} text - 분할할 텍스트
   * @param {number|string} itemId - 요소의 고유 식별자
   * @param {Object} options - 추가 옵션
   * @param {React.CSSProperties} options.style - 적용할 스타일
   * @returns {JSX.Element[]} 분할된 텍스트 요소 배열
   */
  const renderSplitText = (
    text: string,
    itemId?: number | string,
    options?: {
      style?: React.CSSProperties;
    }
  ) => {
    const chars = text.split('');
    const style = {
      display: 'inline-block',
      opacity: 0,
      ...options?.style,
    };

    return chars.map((char, i) => (
      <span
        key={`${itemId}-${i}`}
        className="char"
        ref={(el) => {
          if (el) charsRef.current.push(el);
        }}
        style={style}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return { charsRef, renderSplitText };
};
