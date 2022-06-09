import { memo } from 'react';
import ContentLoader from 'react-content-loader';

function ProductItemLoader() {
  return (
    <ContentLoader speed={1} width={220} height={310} viewBox='0 0 220 310' backgroundColor='#f3f3f3' foregroundColor='#dedede'>
      <rect x='9' y='15' rx='0' ry='0' width='200' height='190' />
      <rect x='9' y='235' rx='0' ry='0' width='115' height='18' />
      <rect x='138' y='235' rx='0' ry='0' width='70' height='18' />
      <rect x='109' y='275' rx='0' ry='0' width='99' height='25' />
      <rect x='9' y='275' rx='0' ry='0' width='91' height='25' />
      <circle cx='15' cy='220' r='6' />
      <circle cx='31' cy='220' r='6' />
      <circle cx='46' cy='220' r='6' />
      <circle cx='61' cy='220' r='6' />
      <circle cx='76' cy='220' r='6' />
    </ContentLoader>
  );
}

export default memo(ProductItemLoader);
