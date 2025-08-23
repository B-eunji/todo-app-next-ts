'use client';

/**
 * 상세 페이지 전용 에러 바운더리
 * - 해당 세그먼트에서 발생한 에러를 잡아 사용자에게 안내
 * - reset() 호출 시 동일 경로를 재시도
 */
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main style={{ padding: 16 }}>
      <p style={{ color: 'tomato' }}>에러: {error.message}</p>
      <button onClick={reset} style={{ marginTop: 8 }}>다시 시도</button>
    </main>
  );
}