import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import type { CreatePropertyDto } from '../../schema/create-property.schema';
import type { Control } from 'react-hook-form';

const extrasConfig: { key: keyof CreatePropertyDto; label: string }[] = [
  { key: 'furnished', label: 'Обзаведен' },
  { key: 'hasParking', label: 'Паркинг' },
  { key: 'hasGarage', label: 'Гараж' },
  { key: 'hasElevator', label: 'Асансьор' },
  { key: 'act16', label: 'Акт 16' },
  { key: 'hasSecurity', label: 'Охрана' },
  { key: 'hasVideoSurveillance', label: 'Видео наблюдение' },
  { key: 'internetReady', label: 'Интернет' },
];

interface ExtrasSectionProps {
  control: Control<CreatePropertyDto>;
}

export function ExtrasSection({ control }: ExtrasSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Екстри</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {extrasConfig.map(({ key, label }) => (
          <FormField
            key={key}
            control={control}
            name={key}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm hover:bg-slate-50 transition">
                <FormControl>
                  <Checkbox
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer font-normal">
                    {label}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
}
