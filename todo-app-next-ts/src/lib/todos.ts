// 할 일 API 함수 모음
import { api } from "@/lib/api";
import type { Todo } from "@/types/todo";

// 1) 전체 목록 가져오기
export async function getTodos(){
    // 반환 타입: Promise<Todo[]>
    return api<Todo[]>("/items", {method: "GET"});
} 

// 2) 새로운 할 일 추가
export async function createTodo(name: string){
    // 반환 타입: Promise<Todo[]>
    // body는 JSON 문자열이어야하므로 JSON.stringify 사용
    return api<Todo>("/items", {
        method: "POST",
        body: JSON.stringify({ name }),
    });
}

// 3) 완료 토글 (done 값을 반대로 바꿀 때)
export async function toggleTodo(id: string, nextDone: boolean){
    // 서버에서 부분 업데이트로 done만 바꾼다고 가정
    return api<Todo>(`/items/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ done:nextDone }),
    });
}

// 4) 삭제
export async function deleteTodo(id: string){
    //삭제는 성공 시 보통 본문이 없기 때문에 void로 처리
    return api<void>(`/items/${id}`, {
        method: "DELETE",
    });
}