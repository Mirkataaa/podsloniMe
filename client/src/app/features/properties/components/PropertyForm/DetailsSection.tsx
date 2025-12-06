import {
  buildingStages,
  constructionTypes,
  heatingTypes,
  LABELS,
} from '@/app/shared/types/property.types';
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
import type { UseFormReturn } from 'react-hook-form';
import type { CreatePropertyDto } from '../../schema/create-property.schema';

interface DetailsSectionProp {
  form: UseFormReturn<CreatePropertyDto>;
}

export function DetailsSection({ form }: DetailsSectionProp) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Детайли</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Area */}
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Площ (кв.м.)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yardArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Площ на двора (кв.м.)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bedrooms */}
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Спални</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* bathrooms */}
        <FormField
          control={form.control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Бани</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* floor */}
        <FormField
          control={form.control}
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Етаж</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* total floors */}
        <FormField
          control={form.control}
          name="totalFloors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ОБщо етажи</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* year build */}
        <FormField
          control={form.control}
          name="yearBuilt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Година</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maintenanceFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Поддръжка на месец</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Construction Type */}
        <FormField
          control={form.control}
          name="constructionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Строителство</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {constructionTypes.map((t, index) => (
                    <SelectItem key={`${t}-${index}`} value={t}>
                      {
                        LABELS.constructionTypes[
                          t as keyof typeof LABELS.constructionTypes
                        ]
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="heating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отопление</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {heatingTypes.map((t, index) => (
                    <SelectItem key={`${t}-${index}`} value={t}>
                      {
                        LABELS.heatingTypes[
                          t as keyof typeof LABELS.heatingTypes
                        ]
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buildingStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Етап на строеж</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {buildingStages.map((t, index) => (
                    <SelectItem key={`${t}-${index}`} value={t}>
                      {
                        LABELS.buildingStages[
                          t as keyof typeof LABELS.buildingStages
                        ]
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
