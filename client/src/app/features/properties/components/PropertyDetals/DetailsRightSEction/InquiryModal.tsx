import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  open: boolean;
  onClose: () => void;
  propertyTitle: string;
  agentName: string;
  agentEmail: string;
};

export default function InquiryModal({
  open,
  onClose,
  propertyTitle,
  agentName,
  agentEmail,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-bold">Запитване за имот</h3>

          <div className="text-sm text-gray-500">
            <p>
              Обява: <span className="font-medium">{propertyTitle}</span>
            </p>
            <p>Агент: {agentName}</p>
            <p>Email: {agentEmail}</p>
          </div>

          <textarea
            className="w-full border rounded-md p-2 text-sm"
            rows={4}
            placeholder="Напишете вашето запитване..."
          />

          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={onClose}>
              Отказ
            </Button>
            <Button>Изпрати</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
