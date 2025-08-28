'use client';

import Image from 'next/image';
import Button from './Button';
import type { ButtonVariant } from './Button';
import ICON from '@/design/icons';

/** 반복 아이콘 컴포넌트 (width/height 지정) */
function IconImg({ src, alt, size = 16 }: { src: string; alt: string; size?: number }) {
  return <Image src={src} alt={alt} width={size} height={size} />;
}

/** 1) + 추가하기 (입력값에 따라 아이콘 색 전환) */
export function AddButton({
  active = false, // true면 보라(primary), false면 회색(secondary)
  className,
  ...props
}: {
  active?: boolean;
} & Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft'>) {
  // 역할 이름으로 넘겨야 함. 'primary' 같은 톤 문자열 금지
  const variant: ButtonVariant = active ? 'add' : 'secondary';

  // 아이콘도 상태에 맞춰 교체
  const iconSrc = active ? ICON['plus'] : ICON['plus-black'];

  return (
    <Button
      variant={variant}
      className={['btn--add', className].filter(Boolean).join(' ')}
      iconLeft={<Image src={iconSrc} alt="추가" width={16} height={16} />}
      {...props}
    >
       <span className="btn-label">추가하기</span>
    </Button>
  );
}

/** 2) ✓ 수정 완료 (라임 톤 + 그림자) */
export function CompleteButton({
  hasImage = false,
  ...props
}: {
  hasImage?: boolean; // true → 연회색, false → 라임색
} & Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft'>) {
  const variant = hasImage ? 'complete': 'secondary';

  return (
    <Button
      variant={variant}
      iconLeft={<IconImg src={ICON['check']} alt="수정 완료" />}
      {...props}
    >
      수정 완료
    </Button>
  );
  
}

/** 3) × 삭제하기 (로즈 톤 + 그림자) */
export function DeleteButton(
  props: Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft'>
) {
  return (
    <Button
      variant="delete"
      iconLeft={<IconImg src={ICON['x']} alt="삭제" />}
      {...props}
    >
      삭제하기
    </Button>
  );
}

/** 4) 완료 토글 (아이콘만 바뀜) */
export function ToggleDoneButton(
  props: Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft'> & {
    done: boolean;
    label?: string;
  }
) {
  const { done, label = done ? '완료됨' : '진행 중', ...rest } = props;
  const icon = done ? ICON['check-box-done'] : ICON['check-box'];
  return (
    <Button
      variant="toggle_done"
      iconLeft={<IconImg src={icon} alt={label} />}
      {...rest}
    >
      {label}
    </Button>
  );
}

/** 5) 이미지 추가 (아이콘 전용, 64px) */
export function ImageAddButton(
  props: Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft' | 'children'>
) {
  return (
    <Button
      variant="image_add"
      iconOnly
      size="xl"                            // 64px
      aria-label={props['aria-label'] ?? '이미지 추가'}
      iconLeft={<IconImg src={ICON['circle-button']} alt="이미지 추가" />}
      {...props}
    />
  );
}

/** 6) 이미지 변경 (아이콘 전용, 56px) */
export function ImageEditButton(
  props: Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft' | 'children'>
) {
  return (
    <Button
      variant="image_edit"
      iconOnly
      size="xl" 
      aria-label={props['aria-label'] ?? '이미지 변경'}
      iconLeft={<IconImg src={ICON['edit-circle-button']} alt="이미지 변경"/>}
      {...props}
    />
  );
}