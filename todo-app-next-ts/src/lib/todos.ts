// 할 일 API 함수 모음
import { api } from "@/lib/api";
import type { Todo } from "@/types/todo";

// 서버 응답 타입 
type ServerTodo = {
  id: string;
  name: string;

  isCompleted: boolean;
  status?: "IN_PROGRESS" | "DONE";
  isDone?: boolean;

  memo?: string | null;
  imageUrl?: string | null;
};

// 서버 응답을 프론트에서 쓰는 Todo 타입으로 변환
export const fromServer = (s: ServerTodo): Todo => {
  let done = false;
  if (typeof s.status === "string") done = s.status === "DONE";
  else if (typeof s.isCompleted === "boolean") done = s.isCompleted;
  else if (typeof s.isDone === "boolean") done = s.isDone;

  return {
    id: String(s.id),
    name: s.name,
    done,
    memo: s.memo ?? "",
    imageUrl: s.imageUrl ?? "",
  };
};

// 프론트 응답을 서버에서 쓰는 Todo 타입으로 변경
export const toServerUpdate = (patch: Partial<Todo>) => {
    const p: Record<string, unknown> = {};
    if (typeof patch.name === "string") p.name = patch.done;
    if (typeof patch.done === "boolean") p.isCompleted = patch.done;
    if (typeof patch.memo === "string") p.memo = patch.memo;
    if (typeof patch.imageUrl === "string") p.imageUrl = patch.imageUrl;
    return p;
};

// 부분 수정 공용 업데이트 매핑
export async function updateTodo(id: string, patch: Partial<Todo>): Promise<Todo> {
  const updated = await api<ServerTodo>(`/items/${id}`, {
    method: "PATCH",
    body: JSON.stringify(toServerUpdate(patch)),
  });
  return fromServer(updated);
}

// 1) 전체 목록 가져오기
export async function getTodos(){
    const list = await api<ServerTodo[]>("/items", { method: "GET" });
    return list.map(fromServer); 
} 

// 2) 새로운 할 일 추가
export async function createTodo(name: string){
    // body는 JSON 문자열이어야하므로 JSON.stringify 사용
    const created = await api<ServerTodo>("/items", {
        method: "POST",
        body: JSON.stringify({ name }),
    });
    return fromServer(created); 
}

// 3) 완료 토글 (done 값을 반대로 바꿀 때)
export async function toggleTodo(id: string, nextDone: boolean): Promise<Todo> {
  return updateTodo(id, {done: nextDone});                   
}

// 4) 삭제
export async function deleteTodo(id: string): Promise<void> {
  await api<void>(`/items/${id}`, { method: "DELETE" });
}