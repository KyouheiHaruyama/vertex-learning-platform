import type { ReactNode } from "react";
import {
  CheckCircleIcon,
  LockIcon,
  PlayCircleFilledIcon,
  SpinnerIcon,
} from "@/components/icons";
import { cn } from "@/lib/cn";

export type Status = "in-progress" | "completed" | "now-playing" | "locked";

const config: Record<
  Status,
  { icon: typeof SpinnerIcon; tone: string; label: string }
> = {
  "in-progress": {
    icon: SpinnerIcon,
    tone: "text-primary-500",
    label: "In Progress",
  },
  completed: {
    icon: CheckCircleIcon,
    tone: "text-success",
    label: "Completed",
  },
  "now-playing": {
    icon: PlayCircleFilledIcon,
    tone: "text-primary-500",
    label: "Now Playing",
  },
  locked: { icon: LockIcon, tone: "text-neutral-900", label: "Locked" },
};

export interface StatusIndicatorProps {
  status: Status;
  children?: ReactNode;
  className?: string;
}

/* 10 STATUS / INDICATORS */
export function StatusIndicator({
  status,
  children,
  className,
}: StatusIndicatorProps) {
  const { icon: Icon, tone, label } = config[status];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Icon size={18} className={tone} />
      <span className="text-body text-neutral-700">{children ?? label}</span>
    </span>
  );
}
