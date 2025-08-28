// src/components/layout/EmptyState.tsx
'use client';
import { ReactNode } from 'react';

/**
 * EmptyState
 * - 목록이 비었을 때 보여줄 안내 블록
 * - 작은 아이콘+설명문 조합을 염두에 둠.
 */
export default function EmptyState({
  children,
}: { children: ReactNode }) {
  return <p className="empty">{children}</p>;
}