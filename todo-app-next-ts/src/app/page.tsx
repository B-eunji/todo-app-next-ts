'use client';

import { useEffect, useState } from 'react';
import type { Todo } from '@/types/todo';
import { getTodos, createTodo, toggleTodo } from '@/lib/todos';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

/**
 * Page (할 일 목록 페이지)
 * - 최초 진입 시 서버에서 목록을 가져와 상태에 저장
 * - 새 항목 추가(TodoForm) / 완료 토글(TodoList -> TodoItem) 처리
 * - 네트워크 지연에 대비한 로딩/에러 처리
 * - 토글은 '낙관적 업데이트'로 즉시 반응 → 실패 시 롤백
 */
export default function Page() {
  // 화면에 렌더링할 전체 할 일 목록
  const [todos, setTodos] = useState<Todo[]>([]);
  // 초기 로딩 상태
  const [loading, setLoading] = useState(true);
  // 에러 메시지(있으면 표시)
  const [err, setErr] = useState<string | null>(null);

  /** 서버에서 목록을 불러오는 공용 함수 */
  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const list = await getTodos(); // 서버 목록
      setTodos(list);                // 상태 반영
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  /** 최초 진입 시 한 번만 목록 로딩 */
  useEffect(() => {
    load();
  }, []);

  /** 새 항목 추가 핸들러 (TodoForm → 여기) */
  const onCreate = async (name: string) => {
    try {
      const created = await createTodo(name); // 서버에 생성
      setTodos(prev => [created, ...prev]);   // 성공 시 목록 맨 앞에 추가
    } catch (e: any) {
      alert('추가 실패: ' + (e?.message ?? e));
    }
  };

  /** 완료 토글 핸들러 (TodoItem → TodoList → 여기)
   * - 즉시 화면에 반영(낙관적 업데이트)
   * - 서버 실패 시 이전 상태로 롤백
   */
  const onToggle = async (t: Todo) => {
    const snapshot = todos; // 롤백용 스냅샷
    // 1) 먼저 화면에 반영
    setTodos(prev => prev.map(x => (x.id === t.id ? { ...x, done: !x.done } : x)));
    try {
      // 2) 서버에 실제 반영
      const updated = await toggleTodo(t.id, !t.done);
      // 3) 서버가 돌려준 최종 객체로 동기화(혹시 서버 계산 필드가 있을 수 있음)
      setTodos(cur => cur.map(x => (x.id === t.id ? updated : x)));
    } catch (e: any) {
      // 4) 실패 시 롤백
      setTodos(snapshot);
      alert('토글 실패: ' + (e?.message ?? e));
    }
  };

  /** 로딩/에러 상태 UI */
  if (loading) {
    return <main style={{ padding: 16 }}>Loading…</main>;
  }
  if (err) {
    return (
      <main style={{ padding: 16 }}>
        <p style={{ color: 'tomato' }}>에러: {err}</p>
        <button onClick={load} style={{ marginTop: 8 }}>다시 시도</button>
      </main>
    );
  }

  /** 정상 렌더 */
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <h1 style={{ margin: '16px 0' }}>할 일 목록</h1>

      {/* 입력 & 추가 */}
      <TodoForm onCreate={onCreate} />

      <div style={{ height: 12 }} />

      {/* 진행/완료 분리 리스트 */}
      <TodoList todos={todos} onToggle={onToggle} />
    </main>
  );
}