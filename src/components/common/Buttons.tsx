// src/components/common/Buttons.tsx
'use client';

import * as React from 'react';
import Image from 'next/image';
import Button from './Button';
import  ICON  from '@/design/icons';

/**
 * 최종 버튼 제공 
 */

/** 내부에서 반복 사용하는 아이콘 컴포넌트 */
function IconImg({
  src,
  alt,
  size = 16, // 아이콘 기본 16px 
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return <Image src={src} alt={alt} width={size} height={size} />;
}


/**
 * + 추가하기 버튼
 * - 입력값이 비었는지 여부(active)에 따라 아이콘 색상 변경
 */
export const AddButton = ({
  active = false,
  ...props
}: {
  active?: boolean;
} & Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft'>) => (
  <Button
    variant="add"
    iconLeft={
      <Image
        src={active ? ICON['plus-black'] : ICON['plus']}
        alt="추가"
        width={16}
        height={16}
      />
    }
    {...props}
  >
    추가하기
  </Button>
);

/* ------------------------------------------------------------------ */
/* 2) × 삭제하기                                                       */
/* ------------------------------------------------------------------ */
export function DeleteButton(
  props: Omit<
    React.ComponentProps<typeof Button>,
    'variant' | 'iconLeft' | 'children'
  >
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

/* ------------------------------------------------------------------ */
/* 3) ✓ 수정 완료                                                      */
/* ------------------------------------------------------------------ */
export function CompleteButton(
  props: Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft'>
) {
  return (
    <Button
      variant="complete"
      iconLeft={<IconImg src={ICON['check']} alt="수정 완료" />}
      {...props}
    >
      수정 완료
    </Button>
  );
} 

/* ------------------------------------------------------------------ */
/* 4) 체크(완료/해제 토글)                                             */
/* ------------------------------------------------------------------ */
export function ToggleDoneButton(
  props: Omit<
    React.ComponentProps<typeof Button>,
    'variant' | 'iconLeft'
  > & { done: boolean; label?: string }
) {
  const { done, label = done ? '완료됨' : '진행 중', ...rest } = props;
  const src = done ? ICON['check-box-done'] : ICON['check-box'];
  return (
    <Button
      variant="toggle_done"
      iconLeft={<IconImg src={src} alt={label} />}
      {...rest}
    >
      {label}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/* 5) 이미지 추가                                                       */
/* ------------------------------------------------------------------ */
export function ImageAddButton(
  props: Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft' | 'children'>
) {
  return (
    <Button
      variant="image_add"
      aria-label={props['aria-label'] ?? '이미지 추가'}
      iconLeft={<IconImg 
                  src={ICON['circle-button']} 
                  alt="이미지 추가"
                  size={64}
                  />}
      {...props}
    >
    </Button>
  );
}



/* ------------------------------------------------------------------ */
/* 6) 이미지 변경(편집)                                                */
/* ------------------------------------------------------------------ */
export function ImageEditButton(
  props: Omit<React.ComponentProps<typeof Button>, 'variant' | 'iconLeft' | 'children'>
) {
  return (
    <Button
      variant="image_edit"
      aria-label={props['aria-label'] ?? '이미지 변경'}
      iconLeft={<IconImg src={ICON['edit-circle-button']} alt="이미지 변경" size={64}/>}
      {...props}
    >
    </Button>
  );
}