'use client';
import { useCallback, useState } from 'react';

export default function ImageField({
  imageUrl,
  onPick,
  disabled,
}: {
  imageUrl: string;
  onPick: (f: File) => Promise<void> | void;
  disabled?: boolean;
}) {
  const [fileName, setFileName] = useState(''); // 직접 표시할 파일명

  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(async (e) => {
    const input = e.currentTarget;             // 비동기 전에 참조 저장
    const f = input.files?.[0];
    if (!f) return;

    // 업로드 전 간단 검증
    if (!/^[\w\-.]+$/.test(f.name)) {
      alert('파일명은 영문/숫자/._- 만 사용하세요.');
      input.value = '';
      setFileName('');
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      alert('파일은 5MB 이하여야 합니다.');
      input.value = '';
      setFileName('');
      return;
    }

    setFileName(f.name);                       // 화면 표시용 파일명 저장
    try {
      await onPick(f);
    } catch (err: any) {
      alert(err?.message ?? err);
      setFileName('');                        // 실패 시 표시도 초기화
    } finally {
      input.value = '';                       // 같은 파일 재선택 허용을 위해 초기화
    }
  }, [onPick]);

  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label htmlFor="image-input">이미지 (영문 파일명, 5MB 이하)</label>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        onChange={onChange}
        disabled={disabled}
      />
      {/* 기본 input 라벨 대신 파일명을 직접 보여줌 */}
      <small style={{ color: 'var(--muted)' }}>
        {fileName ? `선택됨: ${fileName}` : '선택된 파일 없음'}
      </small>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="미리보기"
          style={{ maxWidth: '100%', borderRadius: 8 }}
        />
      )}
    </div>
  );
}