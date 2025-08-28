// src/components/layout/Page.tsx
'use client';
import { ReactNode } from 'react';

/**
 * Page
 * - 페이지 공통 컨테이너. 상단/본문 여백과 max-width만 책임짐.
 * - 스타일은 global의 .container 사용.
 */
export default function Page({ children }: { children: ReactNode }) {
  return <main className="container">{children}</main>;
}