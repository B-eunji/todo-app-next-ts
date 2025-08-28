// src/components/layout/Section.tsx
'use client';
import { ReactNode } from 'react';

/**
 * Section
 * - 섹션 제목과 내용 래핑.
 * - h2 타이포/마진은 CSS 유틸 클래스에 위임.
 */
export default function Section({
  title,
  children,
}: { title: string; children: ReactNode }) {
  return (
    <section className="section">
      <h2 className="section__title">{title}</h2>
      <div className="section__body">{children}</div>
    </section>
  );
}