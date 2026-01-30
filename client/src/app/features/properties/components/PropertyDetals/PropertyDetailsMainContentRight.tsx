import type { Property } from '@/app/shared/types/property.types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-select';
import { useState } from 'react';
import { PriceSection } from './DetailsRightSEction/PriceSection';
import AgentInfoSenction from './DetailsRightSEction/AgentInfoSection';
import ContactActionsSection from './DetailsRightSEction/ContactActionsSection';
import InquiryModal from './DetailsRightSEction/InquiryModal';

interface Props {
  property: Property;
}

export default function PropertyDetailsMainContentRight({ property }: Props) {
  const [showInquiryOpen, setShowInquiryOpen] = useState(false);

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-6">
        {/* Price & Contact Card */}
        <Card className="shadow-lg border-gray-200">
          <CardContent className="p-6">
            <PriceSection
              price={property.price}
              area={property.area}
              currency={property.currency}
            />

            {/* <Separator className="my-6" /> */}

            {/* Agent Info */}
            <AgentInfoSenction user={property.createdBy} />

            {/* Actions */}
            <ContactActionsSection
              phone={property.createdBy.agency?.phone}
              onInquiryOpen={() => setShowInquiryOpen(true)}
            />

            <InquiryModal
              open={showInquiryOpen}
              onClose={() => setShowInquiryOpen(false)}
              propertyTitle={property.title}
              agentName={property.createdBy.username}
              agentEmail={property.createdBy.email}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
