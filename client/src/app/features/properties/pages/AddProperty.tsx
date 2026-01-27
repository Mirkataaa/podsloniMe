import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAddPropertyForm } from '../hooks/useAddPropertyForm';

import { LocationSectionComp } from '../components/PropertyForm/LocationSection';

import { ImageUploadSection } from '../components/PropertyForm/ImageUploadSection';
import { ExtrasSection } from '../components/PropertyForm/ExtrasSection';
import { PriceSection } from '../components/PropertyForm/PriceSection';
import { BasicInfoSection } from '../components/PropertyForm/BasicInfoSection';
import { DetailsSection } from '../components/PropertyForm/DetailsSection';

export default function AddProperty() {
  const { form, handler, state } = useAddPropertyForm();

  const { regions, municipalities, settlements, isLoading, isUploading } =
    state;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <Form {...form}>
        <form onSubmit={handler.submitHandler} className="space-y-8">
          <BasicInfoSection form={form} />
          <LocationSectionComp
            form={form}
            regions={regions}
            municipalities={municipalities}
            settlements={settlements}
          />
          <DetailsSection form={form} />
          <ImageUploadSection
            form={form}
            isUploading={isUploading}
            handleImageUpload={handler.handleImageUpload}
            handleRemoveImage={handler.handleRemoveImage}
            images={form.watch('images')}
          />
          <ExtrasSection control={form.control} />
          <PriceSection control={form.control} />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? 'Създаване...' : 'Създай имот'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
