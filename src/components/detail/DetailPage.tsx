'use client';

import Image from 'next/image';
import styles from './DetailPage.module.css';

/** 상세 페이지 프레젠테이션 컴포넌트
 * - props.imageUrl 유무로 "이미지 없음/있음" 상태 전환
 * - 상단 제목 캡슐, 좌: 이미지 카드, 우: 메모 카드, 하단: 액션 버튼
 */
export default function DetailPage({
  title,
  memo,
  imageUrl,
  onAddImage,
  onEditImage,
  onComplete,
  onDelete,
}: {
  title: string;
  memo: string;
  imageUrl?: string | null;
  onAddImage?: () => void;
  onEditImage?: () => void;
  onComplete?: () => void;
  onDelete?: () => void;
}) {
  const hasImage = !!imageUrl;

  return (
    <main className={styles.page}>
      {/* 상단 제목 캡슐 */}
      <section className={styles.titleWrap} aria-label="상세 제목">
        <div className={styles.titleCapsule}>
          <div className={styles.titleInner}>
            <span className={styles.checkIcon} aria-hidden="true" />
            <span className={styles.titleText}>{title}</span>
          </div>
        </div>
      </section>

      {/* 본문: 좌우 2열 (모바일은 1열 스택) */}
      <section className={styles.body}>
        {/* 좌측: 이미지 카드 */}
        <div
          className={`${styles.imageCard} ${hasImage ? styles.imageCardHasImage : ''}`}
        >
          {/* 이미지 or 플레이스홀더 */}
          <div className={styles.imageStage}>
            {hasImage ? (
              <Image
                src={imageUrl as string}
                alt="첨부 이미지"
                fill
                sizes="(max-width: 743px) 100vw, 384px"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className={styles.imagePlaceholder} aria-hidden="true" />
            )}
          </div>

          {/* 이미지 추가/수정 버튼 (오버레이) */}
          {!hasImage ? (
            <button
              type="button"
              className={styles.imageAddBtn}
              onClick={onAddImage}
              aria-label="이미지 추가"
            />
          ) : (
            <button
              type="button"
              className={styles.imageEditBtn}
              onClick={onEditImage}
              aria-label="이미지 변경"
            />
          )}
        </div>

        {/* 우측: 메모 카드 */}
        <div className={styles.memoCard}>
          <div className={styles.memoBadge}>Memo</div>
          <div className={styles.memoPaper}>
            <div className={styles.memoRuling} aria-hidden="true" />
            <p className={styles.memoText}>{memo}</p>
          </div>
        </div>
      </section>

      {/* 하단 액션 버튼 */}
      <section className={styles.actions}>
        <button type="button" className="btn btn--complete" onClick={onComplete}>
          <span className="btn-icon-left" aria-hidden="true">✓</span>
          <span className="btn-label">수정 완료</span>
        </button>

        <button type="button" className="btn btn--delete" onClick={onDelete}>
          <span className="btn-icon-left" aria-hidden="true">×</span>
          <span className="btn-label">삭제하기</span>
        </button>
      </section>
    </main>
  );
}