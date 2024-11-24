import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function Locations() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleForward = () => {
    if (window.history.length > 1) {
      router.forward();
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <button
        className="border border-blue-600 rounded-lg hover:bg-blue-700 transition-all"
        onClick={handleBack}
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <button
        className="border rounded-lg border-blue-600 hover:bg-blue-700 transition-all"
        onClick={handleForward}
        style={{ padding: "10px", fontSize: "16px" }}
      >
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
