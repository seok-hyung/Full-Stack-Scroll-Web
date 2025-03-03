import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={'/assets/logo.png'} alt="로고" />
        </div>

        <div className="footer-info">
          <div className="info-row">
            <span>개인정보처리방침</span>
            <span>사업자명: 용길동</span>
            <span>대표자명: 용길동</span>
            <span>팩스: 02-1234-5678</span>
            <span>주소: 서울 서초구 서초대로77길 39, 10층</span>
            <span>대표전화: 010-1234-5678</span>
            <span>사업자등록번호: 123-45-67890</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
