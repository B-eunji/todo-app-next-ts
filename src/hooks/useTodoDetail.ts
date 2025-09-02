// src/hooks/useTodoDetail.ts
import { useEffect, useMemo, useState } from 'react';
import { getTodo, updateTodo, deleteTodo } from '@/lib/todos';
import type { Todo } from '@/types/todo';
import { ensureImageFile } from '@/lib/validators';
import { uploadImage } from "@/lib/images";

/* 상세 페이지 전용 상태 + 액션 */
export function useTodoDetail(id: string | undefined) {
  const [item, setItem] = useState<Todo | null>(null);
  const [name, setName] = useState('');
  const [done, setDone] = useState(false);
  const [memo, setMemo] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

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
        setItem(data); setName(data.name ?? ''); 
        setDone(!!data.done);
        setMemo(data.memo ?? ''); 
        setImageUrl(data.imageUrl ?? undefined);
      } catch (e: any) { setErr(e?.message ?? String(e)); }
      finally { setLoading(false); }
    })();
  }, [id]);

  //파일 선택 -> 검증 -> detaUrl로 변환 -> 상태 반영
  const pickImage = async (file: File) => {
    ensureImageFile(file);      // ❗ 사전 검증
    setBusy(true);
    try {
      const url = await uploadImage(file);        // 1) 업로드
      if (url) setImageUrl(url);                           // 2) 화면 즉시 반영
      const updated = await updateTodo(id, { imageUrl: url ?? undefined }); // 3) 서버 동기화
      // 4) 서버 계산필드 동기화
      setName(updated.name);
      setDone(updated.done);
      setMemo(updated.memo ?? "");
      setImageUrl(updated.imageUrl ?? url ?? undefined);
    } finally {
      setBusy(false);
    }
  };

  // 저장(PATCH)
  const save = async () => {
    if (!item) return;
    const v = name.trim(); if (!v) throw new Error('이름을 입력하세요.');
    setBusy(true);
    try {
      await updateTodo(item.id, { name: v, done, memo, imageUrl });
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