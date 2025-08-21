// src/app/page.tsx
'use client';

// 임시 테스트 페이지
// - 페이지 진입 시 목록을 콘솔에 출력
// - 버튼으로 create/toggle/delete 를 바로 호출해 동작 검증
// - 실제 과제 UI 만들기 전에 "백엔드 연결이 정상인지"를 확실히 확인하는 단계

import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";
import { getTodos, createTodo, toggleTodo, deleteTodo } from "@/lib/todos";

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // ✅ 페이지 접속 시 한 번 목록 가져와서 상태에 저장 + 콘솔 출력
  useEffect(() => {
    (async () => {
      try {
        const list = await getTodos();
        console.log("[TEST] getTodos result:", list); // 네트워크 응답 확인
        setTodos(list);
      } catch (e: any) {
        console.error("[TEST] getTodos error:", e?.message ?? e);
        alert("목록 불러오기 실패: " + (e?.message ?? e));
      }
    })();
  }, []);

  // ✅ 새 항목 추가 테스트
  const onCreate = async () => {
    const v = text.trim();
    if (!v) return alert("텍스트를 입력하세요");
    try {
      const created = await createTodo(v);
      console.log("[TEST] createTodo result:", created);
      // 새 항목을 맨 위에 붙여서 화면에서도 바로 보이게
      setTodos(prev => [created, ...prev]);
      setText("");
    } catch (e: any) {
      console.error("[TEST] createTodo error:", e?.message ?? e);
      alert("추가 실패: " + (e?.message ?? e));
    }
  };

  // ✅ 토글 테스트(첫 번째 항목을 토글해보기)
  const onToggleFirst = async () => {
    if (todos.length === 0) return alert("토글할 항목이 없습니다");
    const t = todos[0];
    try {
      const updated = await toggleTodo(t.id, !t.done);
      console.log("[TEST] toggleTodo result:", updated);
      setTodos(prev => prev.map(x => (x.id === t.id ? updated : x)));
    } catch (e: any) {
      console.error("[TEST] toggleTodo error:", e?.message ?? e);
      alert("토글 실패: " + (e?.message ?? e));
    }
  };

  // ✅ 삭제 테스트(첫 번째 항목 삭제)
  const onDeleteFirst = async () => {
    if (todos.length === 0) return alert("삭제할 항목이 없습니다");
    const t = todos[0];
    try {
      await deleteTodo(t.id);
      console.log("[TEST] deleteTodo result: success");
      setTodos(prev => prev.filter(x => x.id !== t.id));
    } catch (e: any) {
      console.error("[TEST] deleteTodo error:", e?.message ?? e);
      alert("삭제 실패: " + (e?.message ?? e));
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>API 통신 테스트 (임시)</h1>

      {/* 입력 + 생성 버튼 */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="새 할 일 입력"
          onKeyDown={e => { if (e.key === "Enter") onCreate(); }}
          aria-label="할 일 입력"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={onCreate}>추가 테스트</button>
      </div>

      {/* 토글/삭제 테스트: 첫 번째 항목만 대상으로 간단히 */}
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={onToggleFirst}>첫 항목 토글</button>
        <button onClick={onDeleteFirst}>첫 항목 삭제</button>
      </div>

      {/* 화면에서도 목록 확인 */}
      <section style={{ marginTop: 16 }}>
        <h2>목록 미리보기</h2>
        <ul>
          {todos.map(t => (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.done}
                readOnly
                style={{ marginRight: 6 }}
              />
              {t.name}
            </li>
          ))}
        </ul>
      </section>

      <p style={{ marginTop: 12, color: "#666" }}>
        개발자도구(브라우저 콘솔)를 열고 [TEST] 로그를 확인하세요.
      </p>
    </main>
  );
}