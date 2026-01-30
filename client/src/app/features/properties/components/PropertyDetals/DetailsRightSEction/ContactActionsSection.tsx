import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';

type Props = {
  phone?: string | null;
  onInquiryOpen: () => void;
};

export default function ContactActionsSection({ phone, onInquiryOpen }: Props) {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <div className="space-y-3">
      {!showPhone ? (
        <Button
          onClick={() => setShowPhone(true)}
          className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
        >
          <Phone className="w-4 h-4 mr-2" />
          Обади се
        </Button>
      ) : (
        <div className="w-full border rounded-lg p-3 text-center bg-blue-50">
          <p className="text-sm text-gray-500 mb-1">Телефон</p>
          <p className="text-lg font-bold text-blue-700">
            {phone ?? 'Няма наличен телефон'}
          </p>

          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-white bg-blue-600 hover:bg-blue-700 hover:text-white"
            onClick={() => setShowPhone(false)}
          >
            Скрий
          </Button>
        </div>
      )}

      <Button
        onClick={onInquiryOpen}
        variant="outline"
        className="w-full h-12 text-lg"
      >
        <Mail className="w-4 h-4 mr-2" />
        Изпрати запитване
      </Button>
    </div>
  );
}
