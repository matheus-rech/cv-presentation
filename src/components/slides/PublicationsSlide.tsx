import { InteractivePublications } from '@/components/InteractivePublications';

export const PublicationsSlide = () => {
  return (
    <div className="h-full flex flex-col py-3">
      <InteractivePublications 
        title="Peer-Reviewed Articles"
        showAbstracts={false}
      />
    </div>
  );
};