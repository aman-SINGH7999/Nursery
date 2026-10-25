import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type LucideIcon } from "lucide-react";
import { type IconType } from "react-icons";

type StatCardProps = {
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

export function StatCard({
  title,
  value,
  subtitle,
  badgeText,
  badgeIcon: BadgeIcon,
  badgeColorClass = "text-green-600",
  backgroundIcon: BgIcon,
  titleColor,
  valueColor,
  subtitleColor
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <p className={`text-sm text-slate-500 ${titleColor}`}>{title}</p>

        <div className="mt-2 flex flex-wrap items-center justify-between">
          <h2 className={`text-3xl font-bold ${valueColor}`}>{value}</h2>

          {badgeText && (
            <Badge
              variant="secondary"
              className={`flex items-center gap-1 ${badgeColorClass}`}
            >
              {BadgeIcon && <BadgeIcon className="h-4 w-4" />}
              {badgeText}
            </Badge>
          )}
        </div>

        {subtitle && (
          <p className={`mt-1 text-sm text-muted-foreground ${subtitleColor}`}>
            {subtitle}
          </p>
        )}

        {/* background icon */}
        <BgIcon className="absolute right-4 top-4 h-20 w-20 text-muted/10" />
      </CardContent>
    </Card>
  );
}
