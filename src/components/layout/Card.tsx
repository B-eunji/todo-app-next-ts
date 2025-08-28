// src/components/layout/Card.tsx
'use client';
import { ReactNode } from 'react';

/**
 * Card
 * - 패널/카드 스타일을 통일해서 사용.
 * - 테두리/배경/라운드/패딩만 책임짐.
 */
export default function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}