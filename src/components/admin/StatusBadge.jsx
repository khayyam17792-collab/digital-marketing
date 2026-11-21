import { getStatusLabel } from "../../admin/adminApi"

const statusStyles = {
  new: "border-blue-400/20 bg-blue-400/10 text-blue-200",
  contacted: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
  in_discussion: "border-violet-400/20 bg-violet-400/10 text-violet-200",
  converted: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
  rejected: "border-rose-400/20 bg-rose-400/10 text-rose-200",
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium ${
        statusStyles[status] ?? "border-slate-400/20 bg-slate-400/10 text-slate-300"
      }`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {getStatusLabel(status)}
    </span>
  )
}
