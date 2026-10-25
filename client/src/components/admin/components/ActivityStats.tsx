import { type LucideIcon } from "lucide-react";
import { type IconType } from "react-icons";

import { StatCard } from "./StatCard";

type StatConfig = {
  title: string;
  value: string | number;
  subtitle?: string;
  badgeText?: string;
  badgeIcon?: LucideIcon | IconType;
  badgeColorClass?: string;
  backgroundIcon: LucideIcon | IconType;
  titleColor?: string;
  valueColor?: string;
  subtitleColor?: string;
};

export default function ActivityStats({
  stats,
}: {
  stats: StatConfig[];
}) {
  return (
    <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
