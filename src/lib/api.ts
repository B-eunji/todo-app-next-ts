// 공통 API 호출 함수
// - BASE: API 서버 기본 주소
// - TENANT_ID: NIA_17
// 모든 형태 경로가 /api/{NIA_17}/...형태

const BASE = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "NIA_17";

// <T>: 호출 시마다 응답 타입을 지정할 수 있게 함
export async function api<T>(path: string, init?: RequestInit ): Promise<T>{
    const res = await fetch(`${BASE}/${TENANT_ID}${path}`, {
        cache: "no-store", //항상 최신 데이터 요청
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
    });

    if (!res.ok){
        const msg = await res.text().catch(()=> res.statusText);
        throw new Error(msg || `HTTP ${res.status}` );
    }
    return res.json() as Promise<T>;
};