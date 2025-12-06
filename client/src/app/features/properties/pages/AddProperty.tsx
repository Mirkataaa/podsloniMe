import { Form } from '@/components/ui/form';
import { useAddPropertyForm } from '../hooks/useAddPropertyForm';
import { BasicInfoSection } from '../components/PropertyForm/BasicInfoSection';

export default function AddProperty() {
  const { form, handler, state } = useAddPropertyForm();

  const { regions, municipalities, settlements, isLoading, isUploading } =
    state;

  const onError = (errors: any) => {
    console.log('Form Errors;', errors);
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <Form {...form}>
        <form onSubmit={(handler.submitHandler, onError)} className="space-y-8">
          <BasicInfoSection form={form} />
        </form>
      </Form>
    </div>
  );
}
