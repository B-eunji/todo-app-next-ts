'use client';

import Image from 'next/image';
import Button from './Button';
import ICON from '@/design/icons';

/** 반복 아이콘 컴포넌트 (width/height 지정) */
function IconImg({ src, alt, size = 16 }: { src: string; alt: string; size?: number }) {
  return <Image src={src} alt={alt} width={size} height={size} />;
}

/** 1) + 추가하기 (입력값에 따라 아이콘 색 전환) */
export function AddButton({
  active = false,
  ...props
}: {
  active?: boolean; // true면 plus-black, false면 plus-white
} & Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft'>) {
  return (
    <Button
      variant="add"
      iconLeft={<IconImg src={active ? ICON['plus-black'] : ICON['plus']} alt="추가" />}
      {...props}
    >
      추가하기
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
      size="lg"                            // 64px
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
      size="md"                               // 56px
      aria-label={props['aria-label'] ?? '이미지 변경'}
      iconLeft={<IconImg src={ICON['edit-circle-button']} alt="이미지 변경"/>}
      {...props}
    />
  );
}