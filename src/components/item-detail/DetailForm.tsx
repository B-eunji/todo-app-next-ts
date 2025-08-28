'use client';

import Image from 'next/image';
import styles from '@/components/detail/DetailPage.module.css';
import {
  CompleteButton,
  DeleteButton,
  ImageAddButton,
  ImageEditButton,
} from '@/components/common/Buttons';

export default function DetailForm(props: {
  name: string; setName: (v: string) => void;
  done: boolean; setDone: (v: boolean) => void;
  memo: string; setMemo: (v: string) => void;
  imageUrl: string; onPickImage: (f: File) => void;
  busy?: boolean; onSave: () => void; onDelete: () => void;
}) {
  const {
    name, setName, done, setDone, memo, setMemo,
    imageUrl, onPickImage, busy, onSave, onDelete,
  } = props;

  const pickFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const f = input.files?.[0];
      if (f) onPickImage(f);
    };
    input.click();
  };

  return (
    <section className={styles.form}>
      {/* 제목 캡슐 (64px) */}
      <div className={styles.titleCapsule}>
        <button
          type="button"
          className={styles.status}
          aria-pressed={done}
          onClick={() => setDone(!done)}
          disabled={busy}
        >
          {/* 32px 원 */}
          <span className={styles.statusDot} />
          <span className="sr-only">{done ? '완료됨' : '진행 중'}</span>
        </button>

        <input
          className={styles.titleInput}
          type="text"
          placeholder="할 일을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={busy}
        />
      </div>

      {/* 본문 2열(데스크톱) / 1열(태블릿/모바일) */}
      <div className={styles.bodyGrid}>
        {/* 이미지 카드 */}
        <div className={styles.imageCard}>
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt="첨부 이미지"
                fill
                className={styles.image}
              />
              <button
                type="button"
                className={styles.imageEditFab}
                onClick={pickFile}
                aria-label="이미지 변경"
                disabled={busy}
              >
                {/* 연필 아이콘은 자산과 연결되어 있으면 넣어도 됨 */}
                <span className={styles.fabInner}>✎</span>
              </button>
            </>
          ) : (
            <>
              <div className={styles.dropHint}>
                <span className={styles.dropIcon}>🖼️</span>
              </div>
              <button
                type="button"
                className={styles.imageAddFab}
                onClick={pickFile}
                aria-label="이미지 추가"
                disabled={busy}
              >
                <span className={styles.fabInner}>＋</span>
              </button>
            </>
          )}
        </div>

        {/* 메모 카드 (노트 배경) */}
        <div className={styles.memoCard}>
          <div className={styles.memoHead}>Memo</div>
          <textarea
            className={styles.memoTextarea}
            placeholder="메모를 입력하세요"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            disabled={busy}
          />
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className={styles.actions}>
        <CompleteButton hasImage={!!imageUrl} onClick={onSave} disabled={busy} />
        <DeleteButton onClick={onDelete} disabled={busy} />
      </div>
    </section>
  );
}