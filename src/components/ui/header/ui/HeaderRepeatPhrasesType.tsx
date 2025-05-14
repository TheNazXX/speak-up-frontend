import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeaderRepeatPhrasesType = () => {
  return (
    <div className="flex items-center">
      <span className="text-[22px] text-blue-500">Get random phrases:</span>
      <Button className="ml-6 px-1.5 flex items-center gap-0.5">
        <Plus className="w-5 h-5" />
        <span className="text-[16px]">5</span>
      </Button>
      <Button className="ml-2 px-1.5 flex items-center gap-0.5">
        <Plus className="w-5 h-5" />
        <span className="text-[16px]">10</span>
      </Button>
      <Button className="ml-2 px-1.5 flex items-center gap-0.5">
        <Plus className="w-5 h-5" />
        <span className="text-[16px]">15</span>
      </Button>
    </div>
  );
};
