// 프론트 공용 타입 정의 - Todo 데이터 
export type Todo = {
    id: string; //고유 ID
    name: string; //할 일 제목/내용
    done: boolean; //완료 여부 (T = 완료, F = 진행 중)
    memo?: string; //상세 메모 
    imageUrl: string; //이미지 주소
}
