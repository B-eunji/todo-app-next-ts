'use client';

import { useEffect, useState } from 'react';
import type { Todo } from '@/types/todo';
import { getTodos, createTodo, toggleTodo } from '@/lib/todos';
import TodoForm from '@/components/todo/TodoForm';
import TodoList from '@/components/todo/TodoList';

/**
 * 홈(page)
 * - 상단: 입력 영역(히어로)
 * - 하단: 리스트 영역(TO DO / DONE) → 내부는 TodoList가 분리 렌더
 * - 뷰 관련 스타일은 전부 CSS 클래스(.page-home …)로 분리
 */
export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // 목록 로딩
  useEffect(() => {
    (async () => {
      setLoading(true); setErr(null);
      try {
        const list = await getTodos();
        setTodos(list);
      } catch (e: any) {
        setErr(e?.message ?? String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 생성 핸들러
  const onCreate = async (name: string) => {
    try {
      const created = await createTodo(name);
      setTodos(prev => [created, ...prev]);
    } catch (e: any) {
      alert('추가 실패: ' + (e?.message ?? e));
    }
  };

  // 토글(낙관적 업데이트)
  const onToggle = async (t: Todo) => {
    const backup = todos;
    setTodos(prev => prev.map(x => (x.id === t.id ? { ...x, done: !x.done } : x)));
    try {
      const updated = await toggleTodo(t.id, !t.done);
      setTodos(cur => cur.map(x => (x.id === t.id ? updated : x)));
    } catch (e: any) {
      setTodos(backup);
      alert('토글 실패: ' + (e?.message ?? e));
    }
  };

  if (loading) return <main className="page-home"><p>Loading…</p></main>;
  if (err)     return <main className="page-home"><p style={{color:'tomato'}}>에러: {err}</p></main>;

  return (
    <main className="page-home">
      {/* 상단 입력 영역(히어로) */}
      <section className="home-hero" aria-label="할 일 추가">
        <TodoForm onCreate={onCreate} 
        hasTodos={(todos.length > 0)}   
        />
      </section>

      {/* 리스트 영역(TO DO / DONE) */}
      <section className="home-list" aria-label="할 일 목록">
        <TodoList todos={todos} onToggle={onToggle} />
      </section>
    </main>
  );
}