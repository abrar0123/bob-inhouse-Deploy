import DefaultHeader from '@/components/common/DefaultHeader';

import MobileMenu from '@/components/common/mobile-menu';
import Listing from '@/components/listing/map-style/map/PropertyFilteringMapFive';

export const metadata = {
  title: 'Listing',
};

const MapV4 = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <Listing />
    </>
  );
};

export default MapV4;
