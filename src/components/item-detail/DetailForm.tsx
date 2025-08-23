'use client';
import NameField from './fields/NameField';
import StatusField from './fields/StatusField';
import MemoField from './fields/MemoField';
import ImageField from './fields/ImageField';

console.log('MemoField import =>', MemoField, typeof MemoField);

export default function DetailForm(props: {
  name: string; setName: (v:string)=>void;
  done: boolean; setDone: (v:boolean)=>void;
  memo: string; setMemo: (v:string)=>void;
  imageUrl: string; onPickImage: (f:File)=>void;
  busy?: boolean; onSave: ()=>void; onDelete: ()=>void;
}) {
  const { name, setName, done, setDone, memo, setMemo, imageUrl, onPickImage, busy, onSave, onDelete } = props;
  return (
    <div style={{ display:'grid', gap:12, padding:16, background:'var(--panel)', border:'1px solid var(--border)', borderRadius:10 }}>
      <NameField value={name} onChange={setName} disabled={busy}/>
      <StatusField checked={done} onChange={setDone} disabled={busy}/>
      <MemoField value={memo} onChange={setMemo} disabled={busy}/>
      <ImageField imageUrl={imageUrl} onPick={onPickImage} disabled={busy}/>
      <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
        <button onClick={onDelete} disabled={busy}>삭제하기</button>
        <button onClick={onSave} disabled={busy} style={{ background:'var(--primary)', color:'#0b1410' }}>수정 완료</button>
      </div>
    </div>
  );
}