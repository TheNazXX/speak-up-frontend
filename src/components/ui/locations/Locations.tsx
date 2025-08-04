import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Locations() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleForward = () => {
    if (window.history.length > 1) {
      router.forward();
    } else {
      router.push('/');
    }
  };

  return (
    <div>
      <button
        className="border border-primaryLight rounded-sm hover:bg-primaryLight transition-all"
        onClick={handleBack}
        style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <button
        className="border rounded-sm border-primary hover:bg-primaryLight transition-all"
        onClick={handleForward}
        style={{ padding: '10px', fontSize: '16px' }}
      >
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
