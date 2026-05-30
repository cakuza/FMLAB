import type { LucideIcon } from "lucide-react";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  href?: string;
  status: "Active" | "Soon";
  icon: LucideIcon;
};

export function ToolCard({
  title,
  description,
  href,
  status,
  icon: Icon
}: ToolCardProps) {
  const content = (
    <div className="flex h-full flex-col justify-between rounded-lg border border-chalk/34 bg-chalk/92 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white">
      <div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-pitch text-chalk">
            <Icon aria-hidden="true" size={20} />
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-xs font-bold text-chalk">
            {status === "Active" ? (
              <ArrowRight aria-hidden="true" size={14} />
            ) : (
              <Clock aria-hidden="true" size={14} />
            )}
            {status}
          </span>
        </div>
        <h2 className="text-lg font-black text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-ink/68">{description}</p>
      </div>
    </div>
  );

  if (!href) {
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <Link href={href} className="focus:outline-none focus:ring-4 focus:ring-signal/45">
      {content}
    </Link>
  );
}
