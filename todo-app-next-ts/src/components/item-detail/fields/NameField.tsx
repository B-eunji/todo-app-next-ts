'use client';
export default function NameField({
  value, onChange, disabled,
}: { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span>이름</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="할 일 제목"
        aria-label="할 일 이름"
        disabled={disabled}
        style={{
          padding: 10, background: 'transparent',
          border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)'
        }}
      />
    </label>
  );
}