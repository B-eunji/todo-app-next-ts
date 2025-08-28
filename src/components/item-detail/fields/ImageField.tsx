'use client';
import { useCallback, useState, useId } from 'react';
import styles from './ImageField.module.css';
import ICON from '@/design/icons';

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
  const inputId = useId();

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
    <div className={styles.wrap}>
      {/* 실제 파일 입력은 숨김 */}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={onChange}
        disabled={disabled}
        className={styles.inputFile}
      />

      {/* 콘텐츠 슬롯: 이미지 있으면 채우기, 없으면 플레이스홀더 */}
      {!imageUrl ? (
        <label htmlFor={inputId} className={`${styles.box} ${styles.emptyBox}`} aria-label="이미지 추가">
          <img src={ICON['image-empty']} alt="이미지 없음" width={64} height={64} />
          <span className={styles.help}>이미지를 추가하세요 (영문 파일명, 5MB 이하)</span>
        </label>
      ) : (
        <div className={`${styles.box} ${styles.imageBox}`}>
          {/* 원격 도메인 이슈 회피를 위해 <img> 사용 */}
          <img src={imageUrl} alt="미리보기" className={styles.fillImg} />
          {/* 우하단 편집버튼: 라벨로 파일선택 트리거 */}
          <label htmlFor={inputId} className={styles.fab} aria-label="이미지 변경">
            <img src={ICON['edit-circle-button']} alt="" width={64} height={64} />
          </label>
        </div>
      )}

      {/* 파일명 안내(선택 시만 노출) */}
      <small className={styles.caption}>
        {fileName ? `선택됨: ${fileName}` : '\u00A0'}
      </small>
    </div>
  );
}