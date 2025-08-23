// src/hooks/useTodoDetail.ts
import { useEffect, useMemo, useState } from 'react';
import { getTodo, updateTodo, deleteTodo } from '@/lib/todos';
import type { Todo } from '@/types/todo';
import { isValidFilename, isUnder5MB, fileToDataURL } from '@/lib/validators';

/* 상세 페이지 전용 상태 + 액션 */
export function useTodoDetail(id: string | undefined) {
  const [item, setItem] = useState<Todo | null>(null);
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const [memo, setMemo] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  //초기 로드
  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true); setErr(null);
      try {
        const data = await getTodo(id);
        setItem(data); setName(data.name ?? ''); setDone(!!data.done);
        setMemo(data.memo ?? ''); setImageUrl(data.imageUrl ?? '');
      } catch (e: any) { setErr(e?.message ?? String(e)); }
      finally { setLoading(false); }
    })();
  }, [id]);

  //파일 선택 -> 검증 -> detaUrl로 변환 -> 상태 반영
  const pickImage = async (f: File) => {
    if (!isValidFilename(f.name)) throw new Error('영문/숫자/._- 만 허용');
    if (!isUnder5MB(f.size)) throw new Error('5MB 이하만 허용');
    const dataUrl = await fileToDataURL(f);
    setImageUrl(dataUrl);
  };

  // 저장(PATCH)
  const save = async () => {
    if (!item) return;
    const v = name.trim(); if (!v) throw new Error('이름을 입력하세요.');
    setBusy(true);
    try {
      await updateTodo(item.id, { name: v, done, memo, imageUrl: imageUrl || undefined });
    } finally { setBusy(false); }
  };

  // 삭제(DELETE)
  const remove = async () => {
    if (!item) return;
    setBusy(true);
    try { await deleteTodo(item.id); }
    finally { setBusy(false); }
  };

  return { item, name, setName, done, setDone, memo, setMemo, imageUrl, setImageUrl,
           loading, busy, err, pickImage, save, remove };
}