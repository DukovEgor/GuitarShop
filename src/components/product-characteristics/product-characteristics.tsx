import { IProductTabs } from '../../interfaces/product';
import { capitalize } from '../../utils/utils';
import { GuitarTypeVocabulary } from '../../utils/vocabularies';

function ProductCharacteristics({ vendorCode, type, stringCount }: IProductTabs) {
  return (
    <table className='tabs__table'>
      <tbody>
        <tr className='tabs__table-row'>
          <td className='tabs__title'>Артикул:</td>
          <td className='tabs__value'>{vendorCode}</td>
        </tr>
        <tr className='tabs__table-row'>
          <td className='tabs__title'>Тип:</td>
          <td className='tabs__value'>{GuitarTypeVocabulary[capitalize(type)]}</td>
        </tr>
        <tr className='tabs__table-row'>
          <td className='tabs__title'>Количество струн:</td>
          <td className='tabs__value'>{stringCount} струнная</td>
        </tr>
      </tbody>
    </table>
  );
}
export default ProductCharacteristics;
