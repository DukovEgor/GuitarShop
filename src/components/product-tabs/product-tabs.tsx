import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IProductTabs } from '../../interfaces/product';
import { GuitarTypeVocabulary } from '../../utils/vocabularies';

export default function ProductTabs({
  vendorCode,
  type,
  stringCount,
  description,
}: IProductTabs) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('#characteristics', { replace: true });
  }, [navigate]);

  const { hash = '#characteristics' } = useLocation();

  return (
    <div className='tabs'>
      <Link
        className={`button button--medium tabs__button ${
          hash !== '#characteristics' && 'button--black-border'
        }`}
        to='#characteristics'
      >
        Характеристики
      </Link>
      <Link
        className={`button button--medium tabs__button ${
          hash !== '#description' && 'button--black-border'
        }`}
        to='#description'
      >
        Описание
      </Link>
      <div
        className={`tabs__content ${hash !== '#characteristics' && 'hiden'}`}
        id='characteristics'
      >
        {hash === '#characteristics' && (
          <table className='tabs__table'>
            <tbody>
              <tr className='tabs__table-row'>
                <td className='tabs__title'>Артикул:</td>
                <td className='tabs__value'>{vendorCode}</td>
              </tr>
              <tr className='tabs__table-row'>
                <td className='tabs__title'>Тип:</td>
                <td className='tabs__value'>{GuitarTypeVocabulary[type]}</td>
              </tr>
              <tr className='tabs__table-row'>
                <td className='tabs__title'>Количество струн:</td>
                <td className='tabs__value'>{stringCount} струнная</td>
              </tr>
            </tbody>
          </table>
        )}
        {hash === '#description' && (
          <p
            className={`tabs__product-description ${
              hash !== '#description' && 'hiden'
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
