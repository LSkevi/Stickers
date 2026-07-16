interface ChipProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  color?: string
}

export function Chip({ active, onClick, children, color }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] font-bold transition active:scale-95 ${
        active ? 'text-black' : 'border-[var(--line)] bg-white/5 text-[var(--muted)]'
      }`}
      style={active ? { background: color ?? 'var(--accent)', borderColor: 'transparent' } : undefined}
    >
      {children}
    </button>
  )
}

interface SegmentedProps<T extends string> {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}

export function Segmented<T extends string>({ options, value, onChange }: SegmentedProps<T>) {
  return (
    <div className="flex rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`flex-1 rounded-full px-3 py-1.5 text-[13px] font-bold transition ${
            value === o.value ? 'bg-[var(--accent)] text-black' : 'text-[var(--muted)]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function EmptyState({ icon, title, note }: { icon: React.ReactNode; title: string; note: string }) {
  return (
    <div className="mx-auto max-w-xs py-16 text-center">
      <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-[var(--muted)]">
        {icon}
      </div>
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{note}</p>
    </div>
  )
}
