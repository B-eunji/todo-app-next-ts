'use client';
import Link from 'next/link';

/**
 * 공용 헤더
 * - 로고 클릭 시 '/'로 이동(과제 요구: 로고=목록으로 이동)
 * - 스티키 헤더로 사용성 향상
 */
export default function Header() {
  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 10,         // 스크롤 시 상단 고정
        backdropFilter: 'blur(6px)',                    // 반투명+블러
        borderBottom: '1px solid var(--border)',
        background: 'rgba(11,20,16,0.7)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* 로고: 클릭 시 '/'로 이동 */}
        <Link href="/" aria-label="홈으로">
          <strong style={{ color: 'var(--primary)' }}>TODO</strong>
        </Link>

        {/* 서브 텍스트(선택) */}
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>Next.js + TypeScript</span>
      </div>
    </header>
  );
}