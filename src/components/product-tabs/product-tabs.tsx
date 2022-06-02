import { Link, useParams } from 'react-router-dom';
import { IProductTabs } from '../../interfaces/product';
import { AppRoutes } from '../../utils/const';
import ProductCharacteristics from '../product-characteristics/product-characteristics';

function ProductTabs({ vendorCode, type, stringCount, description }: IProductTabs) {
  const { tab, id } = useParams();

  return (
    <div className='tabs'>
      <Link
        className={`button button--medium tabs__button  ${tab === 'description' && 'button--black-border'}`}
        data-testid='tabs-link-characteristics'
        to={`/${AppRoutes.Product}/${id}/${AppRoutes.Characteristics}`}
      >
        Характеристики
      </Link>
      <Link
        className={`button button--medium tabs__button ${tab === AppRoutes.Characteristics && 'button--black-border'}`}
        data-testid='tabs-link-description'
        to={`/${AppRoutes.Product}/${id}/${AppRoutes.Description}`}
      >
        Описание
      </Link>
      <div className={'tabs__content'} id='characteristics'>
        {tab === AppRoutes.Characteristics && <ProductCharacteristics vendorCode={vendorCode} type={type} description={''} stringCount={stringCount} />}
        {tab === AppRoutes.Description && <p className='tabs__product-description'>{description}</p>}
      </div>
    </div>
  );
}

export default ProductTabs;
