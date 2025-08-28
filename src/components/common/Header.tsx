'use client';
import Link from 'next/link';
import Image from 'next/image';

/**
 * 공용 헤더
 * - 로고 클릭 시 '/'로 이동(과제 요구: 로고=목록으로 이동)
 * - 스티키 헤더로 사용성 향상
 */

export default function Header() {
  return (
    <header className="app-header" role="banner">
      {/* 헤더 전용 래퍼: 높이/패딩/정렬은 여기서 처리 */}
      <div className="header-inner">
        <Link href="/" aria-label="홈으로" className="logo">
          {/* 데스크탑 로고 (≥769px) */}
          <Image
            className="logo--desktop"
            src="/images/logo.svg"
            alt="do it;"
            width={151}
            height={40}
            priority
          />
          {/* 모바일 로고 (≤768px) */}
          <Image
            className="logo--mobile"
            src="/images/logo_simple.svg"
            alt="do it;"
            width={71}    
            height={40}   
            priority
          />
        </Link>
      </div>
    </header>
  );
}