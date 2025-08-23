'use client';
import type { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

/**
 * TodoList
 * - 전체 todos를 받아 '진행 중' / '완료' 섹션으로 나눠 렌더링
 * - 실제 상태 변경/서버 통신은 상위(Page)가 담당하고,
 *   여기서는 onToggle 콜백만 전달받아 하위(TodoItem)로 넘김
 *
 * Props
 * - todos: 화면에 표시할 전체 할 일 목록
 * - onToggle(t): 아이템의 체크박스가 변경될 때 상위로 이벤트 전달
 */

export default function TodoList({
    todos,
    onToggle,
}: {
    todos: Todo[];
    onToggle: (t: Todo) => void | Promise<void>;
}) {
    // '진행', '완료'로 목록 분리 - 렌더링 관점에서만 나눔
    const inProgress = todos.filter((t) => !t.done);
    const completed = todos.filter((t)=> t.done);

    return (
        <div style={{ display: 'grid', gap: 16 }}>
            {/* 진행 중 섹션 */}
            <section aria-labelledby="todo-in-progress">
                <h2 id="todo-in-progress" style={{ margin: '8px 0' }}>
                    TO DO
                </h2>
                {inProgress.length === 0 ? (
                    <p style = {{ color: 'var(--muted)' }}>
                        할 일이 없어요. 
                        TODO를 새롭게 추가해주세요!
                    </p>
                ): (
                    <ul style= {{ display: 'grid', gap: 8 }}>
                        {inProgress.map((t) => (
                            <TodoItem key = {t.id} todo={t} onToggle={onToggle} />
                        ))}
                    </ul>
                ) }
            </section>
            {/* 완료 된 섹션 */}
            <section aria-labelledby="todo-completed">
                <h2 id = "todo-completed" style={{ margin: '8px 0'}}>
                    DONE
                </h2>
                
                {completed.length === 0 ? (
                    <p style={{color: 'var(--muted)' }}>
                        아직 다 한 일이 없어요. 
                        해야 할 일을 체크해보세요!
                    </p>
                ): (
                    <ul style={{ display: 'grid', gap: 8 }}>
                        {completed.map((t)=> (
                            <TodoItem key={t.id} todo={t} onToggle={onToggle} />
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
