//파일명 용량 등 공용 검증 로직
// src/lib/validators.ts

// 파일명: 영문/숫자/._- 만 허용
export const isValidFilename = (n: string) => /^[A-Za-z0-9._-]+$/.test(n);

//파일 용량 5MB 이하만 허용
export const isUnder5MB = (bytes: number) => bytes <= 5 * 1024 * 1024;

//파일 -> Data URL 변환(서버 업로드 엔드포인트 없을 때 대안)
export const fileToDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader(); 
    r.onload = () => resolve(String(r.result));
    r.onerror = reject; 
    r.readAsDataURL(file);
  });