// src/components/common/Button.tsx
'use client';

import { forwardRef, ReactNode } from 'react';

/**
 * 버튼 역할(시각 톤 분기 기준)
 * - add / toggle_done → primary 톤(보라)
 * - complete         → complete 톤(라임)
 * - secondary        → secondary 톤(연회색)
 * - delete           → delete 톤(로즈)
 * - image_*          → 아이콘 전용(이미지 자체가 버튼을 표현)
 */
export type ButtonVariant =
  | 'add'          // 추가하기
  | 'toggle_done'  // 체크(할 일 완료/해제)
  | 'image_add'    // 이미지 추가 (아이콘-only)
  | 'image_edit'   // 이미지 변경 (아이콘-only)
  | 'complete'     // 수정 완료(라임)
  | 'secondary'    // 수정 완료(연회색)
  | 'delete';      // 삭제

/** 아이콘-only 버튼 지름 프리셋 (globals.css에 대응) */
type IconOnlySize = 'sm' | 'md' | 'lg';

type ButtonBaseProps = {
  /** 버튼 라벨(텍스트). 아이콘-only 버튼이면 생략 가능 */
  children?: ReactNode;
  /** 버튼의 기능/의미(시각 톤 분기용) */
  variant: ButtonVariant;
  /** 왼쪽 아이콘. 텍스트 버튼에서 사용 */
  iconLeft?: ReactNode;
  /** 아이콘-only 버튼 여부 (이미지가 버튼 모양을 대신하는 케이스) */
  iconOnly?: boolean;
  /** 아이콘-only 버튼 지름. sm=32, md=56, lg=64 */
  size?: IconOnlySize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/** variant → 시각 톤(배경/글자) 매핑 */
function toneOf(variant: ButtonVariant) {
  switch (variant) {
    // 보라 톤(텍스트 버튼)
    case 'add':
    case 'toggle_done':
      return 'primary';
    // 라임 톤(텍스트 버튼)
    case 'complete':
      return 'complete';
    // 로즈 톤(텍스트 버튼)
    case 'delete':
      return 'delete';
    // 그 외는 연회색 톤(텍스트 버튼)로 처리. 
    // 단, iconOnly=true인 경우에는 배경/테두리 적용하지 않음.
    case 'image_add':
    case 'image_edit':
    default:
      return 'secondary';
  }
}

/**
 * Button 뼈대
 * - 스타일은 전부 globals.css의 .btn* 클래스에 위임한다.
 * - 텍스트 버튼과 아이콘-only 버튼을 하나로 처리(공용 Props 유지).
 * - 접근성: 아이콘-only 버튼은 aria-label 필수(라벨 텍스트가 없기 때문).
 */
const Button = forwardRef<HTMLButtonElement, ButtonBaseProps>(function Button(
  {
    children,
    variant,
    iconLeft,
    iconOnly = false,
    size = 'md',
    className,
    type = 'button', // 기본 동작은 'submit'이 아님. 폼 안에서 의도치 않은 submit 방지
    disabled,
    ...rest
  },
  ref
) {
  const tone = toneOf(variant);

  // NOTE:
  // - 위에서 iconOnly/size 등을 구조 분해 했기 때문에 rest에는 이미 제외됨 → DOM으로 누수되지 않음(경고 방지).
  // - 클래스 구성은 globals.css의 .btn, .btn--{tone}, .btn--icon, .btn--icon-{size}와 1:1 매핑.
  const classes = [
    'btn',                                // 공통 뼈대
    iconOnly ? 'btn--icon' : `btn--${tone}`, // 아이콘-only면 배경/테두리 미적용, 텍스트 버튼이면 톤 적용
    iconOnly ? `btn--icon-${size}` : '',  // 아이콘-only 지름 프리셋
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
      // 접근성 주의:
      // - 아이콘-only 버튼의 경우 children이 없으므로 반드시 aria-label 제공 필요.
      // - 이 컴포넌트에서 강제하지는 않고, 호출 측(Buttons.tsx)에서 보장하도록 한다.
      {...rest}
    >
      {/* 텍스트 버튼: 아이콘이 있으면 좌측에 배치 */}
      {iconLeft && !iconOnly && <span className="btn-icon-left">{iconLeft}</span>}

      {/* 라벨(아이콘-only 버튼은 라벨 없음) */}
      {children && !iconOnly && <span className="btn-label">{children}</span>}

      {/* 아이콘-only 버튼: 이미지를 버튼 중앙에 그대로 렌더 */}
      {iconOnly && iconLeft}
    </button>
  );
});

export default Button;