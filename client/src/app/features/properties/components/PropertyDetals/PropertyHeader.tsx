import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import type { MouseEventHandler } from 'react';

interface Props {
  onBack: MouseEventHandler<HTMLButtonElement>;
}

export default function PropertyHeader({ onBack }: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <Button
        variant="ghost"
        className="gap-2 pl-0 hover:bg-transparent hover:text-blue-600"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад
      </Button>
      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="rounded-full">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Heart className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
