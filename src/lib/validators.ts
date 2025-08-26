//파일명 용량 등 공용 검증 로직
// src/lib/validators.ts

export const isValidFilename = (n: string) => /^[A-Za-z0-9._-]+$/.test(n);
export const isUnder5MB = (bytes: number) => bytes <= 5 * 1024 * 1024;

export function ensureImageFile(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드할 수 있어요.");
  }
  if (!isValidFilename(file.name)) {
    throw new Error("파일명은 영문/숫자/._- 만 사용할 수 있어요.");
  }
  if (!isUnder5MB(file.size)) {
    throw new Error("파일 크기는 5MB 이하여야 합니다.");
  }
}

//파일 -> Data URL 변환(서버 업로드 엔드포인트 없을 때 대안)
export const fileToDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader(); 
    r.onload = () => resolve(String(r.result));
    r.onerror = reject; 
    r.readAsDataURL(file);
  });