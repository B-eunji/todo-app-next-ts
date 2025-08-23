'use client';
import Link from 'next/link';
import type { Todo } from '@/types/todo';

/**
 * TodoItem
 * - '할 일 1개'를 표시하는 최소 단위 컴포넌트
 * - 완료 토글(체크박스) + 제목(레이블) + 상세 페이지 링크 제공
 * - 삭제는 과제 요구상 상세 페이지에서 처리하므로 여기서는 제외
 *
 * Props
 * - todo: 렌더링할 할 일 한 개
 * - onToggle(t): 체크박스 변경 시 상위로 이벤트를 올림 (실제 상태/서버 업데이트는 상위가 담당)
 */

export default function TodoItem({
    todo,
    onToggle,
}: {
    todo: Todo;
    onToggle: (t: Todo) => void | Promise<void>;
}) {
    //label과 연결해 텍스트 클릭만으로 토글 가능(히트 영역 확대 및 접근성 향상)
    const checkboxId = `todo-check-${todo.id}`;

    return (
        <li
            style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', border: `1px solid var(--border)`,
                background: 'var(--panel)', borderRadius: 10
            }}
        >
            {/* 네이티브 체크박스: 탭/스페이스 자동 지원 */}
            <input
                id = {checkboxId}
                type   = "checkbox"
                checked={todo.done}
                onChange={()=> onToggle(todo)} // 이벤트만 상위로 전달
                aria-label={`${todo.name} 완료 토글`}
            /> 

            {/* Todo 제목 */}
            <label
                htmlFor={checkboxId}
                style={{
                    textDecoration: todo.done ? 'line-through' : 'none',
                    color: todo.done ? 'var(--muted)' : 'var(--text)',
                    cursor: 'pointer'
                }}
            >
                {todo.name}
            </label>

            {/* 상세 페이지로 이동 */}
            <Link href={`/items/${todo.id}`} style={{marginLeft: 'auto'}}>
                상세
            </Link>
        </li>
    );
}