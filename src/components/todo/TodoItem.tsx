'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './TodoItem.module.css';
import type { Todo } from '@/types/todo';
import ICON from '@/design/icons';

/**
 * 단일 아이템
 * - 좌측 체크 아이콘(진행/완료)
 * - 텍스트
 * - 전체 캡슐 클릭 시 상세 페이지 이동
 */

export default function TodoItem({
  todo,
  onToggle,
}: {
  todo: Todo;
  onToggle: () => void;
}) {
  const icon = todo.done ? ICON['check-box-done'] : ICON['check-box'];
  const label = todo.done ? '완료됨' : '진행 중';

  return (
    <Link
      href={`/items/${todo.id}`}
      className={styles.capsule}
      aria-label={`상세 보기: ${todo.name}`}
    >
      <span className={styles.front}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={(e) => {
            e.preventDefault();    // 링크 이동 차단
            e.stopPropagation();   // 상위로 이벤트 버블링 방지
            onToggle();            // 완료/해제 토글
          }}
          aria-pressed={todo.done}
          aria-label={`${label}: ${todo.name}`}
        >
          <Image src={icon} alt={label} width={32} height={32} />
        </button>

        {/* 텍스트 (기존 그대로) */}
        <span className={styles.text}>{todo.name}</span>
      </span>
    </Link>
  );
}