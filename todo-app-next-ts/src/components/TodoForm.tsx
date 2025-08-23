'use client';
import { useState } from 'react';

/**
 * TodoForm
 * - 새 할 일을 입력받아 상위 컨테이너로 전달하는 '입력 폼' 컴포넌트
 * - 엔터/'추가하기' 버튼으로 제출 가능
 * - 빈 문자열 방지 + 중복 클릭 방지(busy)
 *
 * Props
 * - onCreate(name): 상위에서 실제 API(createTodo) 호출 및 상태 업데이트 담당
 */

export default function TodoForm({
    onCreate,
}: {
    onCreate: (name: string) => void | Promise<void>;
}) {
    const [name, setName] = useState('');
    const [busy, setBusy] = useState(false);

    /** 제출 핸들러
   * - 트림 후 빈 값이면 리턴
   * - 중복 제출 방지(busy)로 연타 방어
   * - 성공 시 입력창 리셋
   */
  const submit = async () => {
    const v = name.trim();
    if (!v || busy) return;
    setBusy(true);
    try{
        await onCreate(v); //실제 생성은 상위에서 수행
        setName('');
    } finally{
        setBusy(false);
    }
  };

  return (
    <div 
        style={{
            display: 'flex',
            gap: 0,
            padding: 8,
            background: 'var(--panel)',
            border: `1px solid var(--border)`,
            borderRadius: 10,
        }}
    >
        {/*입력창: 엔터로도 submit 되도록 onKeyDown 처리 */}
        <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {if (e.key==='Enter') submit(); }}
            placeholder = "할 일을 입력해주세요"
            aria-label = "할 일 입력"
            style={{
                flex: 1,
                padding: 10,
                background: 'transparent',
                border: `1px solid var(--border)`,
                borderRadius: 8,
                color: 'var(--text)',
            }}
            disabled={busy}
        />
        {/* 버튼: 중복 클릭 방지 */}
        <button 
            onClick={submit}
            disabled={busy}
            style={{
                padding: '10px 14px',
                borderRadius: 0,
                border: `1px solid var(--border)`,
                background: 'var(--primary)',
                color: '#0b1410',
                fontWeight: 600,
            }}
            aria-disabled={busy}
        >
            + 추가하기
        </button>
    </div>
  );

}