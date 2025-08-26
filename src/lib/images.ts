// src/lib/images.ts
// 이미지 업로드 전용 API 래퍼

const BASE = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "NIA_17";

/** 서버로 이미지 업로드하고, 업로드된 이미지 URL을 반환 */
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("image", file); // 서버 필드명 'image'라고 가정 (다르면 바꿔야 함)

  const res = await fetch(`${BASE}/${TENANT_ID}/images/upload`, {
    method: "POST",
    body: fd,                // FormData
    cache: "no-store",
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(msg || `HTTP ${res.status}`);
  }

  // 서버 응답 형태에 맞게 파싱
  // 예: { url: "https://..." } 혹은 { imageUrl: "https://..." }
  const data = await res.json().catch(() => ({} as any));
  const url = data.url || data.imageUrl;
  if (!url) throw new Error("업로드 응답에 URL이 없습니다.");
  return url;
}