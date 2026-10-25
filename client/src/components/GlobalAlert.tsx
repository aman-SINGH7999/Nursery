  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon, InfoIcon } from "lucide-react";
import { useAlert } from "@/context/alert-context";
import clsx from "clsx";

export default function GlobalAlert() {
  const { alert } = useAlert();

  if (!alert.open) return null;

  const iconMap = {
    success: <CheckCircle2Icon className="text-green-600" />,
    error: <AlertCircleIcon className="text-red-600" />,
    info: <InfoIcon className="text-blue-600" />,
  };

  const variantMap = {
    success: "default",
    info: "default",
    error: "destructive",
  } as const;

  const bgMap = {
    success: "bg-green-500/10 border-green-500/30",
    error: "bg-red-500/10 border-red-500/30",
    info: "bg-blue-500/10 border-blue-500/30",
  };

  return (
    <div className="fixed top-5 right-5 z-50 w-[360px] animate-in slide-in-from-top-2">
      <Alert
        variant={variantMap[alert.type]}
        className={clsx("backdrop-blur-md shadow-lg flex items-center gap-2", bgMap[alert.type])}
      >
        <div>{iconMap[alert.type]}</div>
        <div>
          {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert.description && (
            <AlertDescription className="text-xs">{alert.description}</AlertDescription>
          )}
        </div>
      </Alert>
    </div>
  );
}
