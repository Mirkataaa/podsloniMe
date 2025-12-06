import type { Control } from 'react-hook-form';
import type { CreatePropertyDto } from '../../schema/create-property.schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { currencies } from '@/app/shared/types/property.types';

interface PriceSectionProps {
  control: Control<CreatePropertyDto>;
}

export function PriceSection({ control }: PriceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Цена</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PRICE INPUT */}
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? 0 : Number(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CURRENCY SELECT */}
        <FormField
          control={control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Валута</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="EUR" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="pricePerSqm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена на кв.м. (Автоматично)</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-slate-100" />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
