'use client';
export default function ImageField({
  imageUrl, onPick, disabled,
}: { imageUrl: string; onPick: (f: File) => void; disabled?: boolean }) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    try { await onPick(f); } catch (err:any) { alert(err?.message ?? err); e.currentTarget.value=''; }
  };
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label htmlFor="image-input">이미지 (영문 파일명, 5MB 이하)</label>
      <input id="image-input" type="file" accept="image/*" onChange={onChange} disabled={disabled}/>
      {/* {imageUrl && <img src={imageUrl} alt="미리보기" style={{ maxWidth:'100%', borderRadius:8 }} />} */}
    </div>
  );
}