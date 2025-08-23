'use client';
export default function MemoField({
  value, onChange, disabled,
}: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span>메모</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="상세 메모를 입력하세요"
        rows={5}
        aria-label="메모 입력"
        disabled={disabled}
        style={{
          padding: 10, background: 'transparent',
          border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', resize: 'vertical'
        }}
      />
    </label>
  );
}