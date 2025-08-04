import clsx from "clsx";
import { ServerCrash } from "lucide-react";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function Error({
  message = "",
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, []);

  return (
    <div className={clsx(className, "")}>
      <ServerCrash className="w-10 h-10" />
      <Toaster richColors />
    </div>
  );
}
