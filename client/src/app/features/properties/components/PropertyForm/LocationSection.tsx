import { CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UseFormReturn } from 'react-hook-form';
import type { CreatePropertyDto } from '../../schema/create-property.schema';
import { MapPicker } from '../MapPicker';
import { Input } from '@/components/ui/input';
import { memo } from 'react';

type LocationItem = {
  name: string;
  ekatte?: string;
};

interface LocationSectionProps {
  form: UseFormReturn<CreatePropertyDto>;
  regions: LocationItem[];
  municipalities: LocationItem[];
  settlements: LocationItem[];
}

function LocationSection({
  form,
  regions,
  municipalities,
  settlements,
}: LocationSectionProps) {
  const { control, setValue, watch } = form;

  const lat = (watch('latitude') as number) || 42.7339;
  const lng = (watch('longitude') as number) || 25.4858;
  const address = watch('address');
  const region = watch('region');
  const municipality = watch('municipality');
  const settlement = watch('settlement');

  return (
    <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="space-y-4">
        {/* region */}
        <FormField
          control={control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Област</FormLabel>
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  // set value is working becouse of the props
                  setValue('municipality', '');
                  setValue('settlement', '');
                  setValue('district', '');
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Избери област" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regions
                    ?.filter((r) => r && r.name)
                    .map((r) => (
                      <SelectItem key={r.name} value={r.name}>
                        {r.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Municipality */}
        {region && (
          <FormField
            control={control}
            name="municipality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Община</FormLabel>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                    setValue('settlement', '');
                    setValue('district', '');
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Избери община" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {municipalities.map((m, index) => (
                      <SelectItem key={`${m.name}-${index}`} value={m.name}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Settlement */}
        {municipality && (
          <FormField
            control={control}
            name="settlement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Населено място</FormLabel>
                <Select
                  onValueChange={(val) => {
                    field.onChange(val);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Избери нас. място" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {settlements.map((s, index) => (
                      <SelectItem
                        key={`${s.ekatte || s.name}-${index}`}
                        value={s.name}
                      >
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* District */}
        {settlement && (
          <FormField
            control={control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Квартал</FormLabel>
                <FormControl>
                  <Input placeholder="Напр. Център, Изток..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* 5. Address */}
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес (Улица и номер)</FormLabel>
              <FormControl>
                <Input placeholder="ул. Витоша 10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* MAP PICKER */}
      <div className="h-full min-h-[300px] rounded-md overflow-hidden border">
        <MapPicker
          value={{ lat, lng, address }}
          onChange={({ lat, lng, address, district }) => {
            setValue('latitude', lat);
            setValue('longitude', lng);
            if (address) setValue('address', address);
            if (district) setValue('district', district);
          }}
        />
      </div>
    </CardContent>
  );
}

export const LocationSectionComp = memo(LocationSection);
