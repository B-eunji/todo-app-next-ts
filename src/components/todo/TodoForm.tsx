'use client';
import { useState } from 'react';
import { AddButton } from '@/components/common/Buttons';
import styles from './TodoForm.module.css';

/**
 * TodoForm
 * - 새 할 일을 입력받아 상위 컨테이너로 전달하는 '입력 폼' 컴포넌트
 * - 엔터/'추가하기' 버튼으로 제출 가능
 * - 빈 문자열 방지 + 중복 클릭 방지(busy)
 */

export default function TodoForm({
  onCreate,
  hasTodos,
}: {
  onCreate: (name: string) => void | Promise<void>;
  hasTodos: boolean; 
}) {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    const v = name.trim();
    if (!v || busy) return;
    setBusy(true);
    try {
      await onCreate(v);
      setName('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.row}>
        {/* 입력 캡슐 */}
    <div className={styles.capsule}>
      <div className={styles.front}>
        <input
          type="text"
          name="todo"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          placeholder="할 일을 입력해주세요"
          aria-label="할 일 입력"
          className={styles.input}
          disabled={busy}
        />
      </div>
    </div>

    {/* ‘추가하기’ 버튼은 입력 캡슐 바깥에 그대로 */}
    <AddButton
        active={hasTodos}  

        onClick={submit}
        disabled={busy}
      />
    </div>
  );
}