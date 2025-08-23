'use client';
import { useParams, useRouter } from 'next/navigation';
import { useTodoDetail } from '@/hooks/useTodoDetail';
import DetailForm from '@/components/item-detail/DetailForm';

/** /items/{id} 상세 페이지: 데이터 준비 + 라우팅만 담당 */
export default function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const s = useTodoDetail(id);

  if (s.loading) return <main style={{ padding: 16 }}>Loading…</main>;
  if (s.err)     return <main style={{ padding: 16, color: 'tomato' }}>에러: {s.err}</main>;
  if (!s.item)   return <main style={{ padding: 16 }}>데이터가 없습니다.</main>;

  const onSave = async () => { try { await s.save(); router.push('/'); } catch(e:any){ alert(e?.message ?? e); } };
  const onDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try { await s.remove(); router.push('/'); } catch(e:any){ alert(e?.message ?? e); }
  };

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
      <h1 style={{ margin: '16px 0' }}>할 일 상세</h1>
      <DetailForm
        name={s.name} setName={s.setName}
        done={s.done} setDone={s.setDone}
        memo={s.memo} setMemo={s.setMemo}
        imageUrl={s.imageUrl} onPickImage={s.pickImage}
        busy={s.busy} onSave={onSave} onDelete={onDelete}
      />
    </main>
  );
}