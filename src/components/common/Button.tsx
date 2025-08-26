// src/components/common/Button.tsx
'use client';

/* 버튼의 '뼈대' 컴포넌트 */
import { forwardRef, ReactNode } from 'react';

export type ButtonVariant =
  | 'add'          // 추가하기
  | 'toggle_done'  // 체크(할 일 완료/해제)
  | 'image_add'    // 이미지 추가
  | 'image_edit'   // 이미지 변경
  | 'complete'     // 수정 완료
  | 'delete';      // 삭제

type ButtonBaseProps = {
  children?: ReactNode;             // 버튼 텍스트(라벨)
  variant: ButtonVariant;                 // 버튼 역할
  iconLeft?: ReactNode;             // 아이콘 왼쪽 
  className?: string;               // 추가 클래스
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * 접근성 가이드
 * - 텍스트가 없는 아이콘 전용 버튼(.btn-icon)일 때는 반드시 aria-label을 넘겨주세요.
 * - disabled는 시각적 스타일뿐 아니라 실제 상호작용도 차단합니다.
 */
const Button = forwardRef<HTMLButtonElement, ButtonBaseProps>(function Button(
  { children, variant, iconLeft, className, type = 'button', disabled, ...rest },
  ref
) {
  const classes = [
    'btn',                 // 공통 뼈대
    `btn-${variant}`,      // 스타일 분기 (globals.css에서 정의)
    disabled ? 'is-disabled' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      {/* 왼쪽 아이콘 (있을 때만 렌더) */}
      {iconLeft && <span className="btn-icon-left">{iconLeft}</span>}

      {/* 라벨(텍스트) */}
      {children && <span className="btn-label">{children}</span>}
    </button>
  );
});

export default Button;