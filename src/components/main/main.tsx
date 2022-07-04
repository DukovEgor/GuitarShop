import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import ModalAdd from '../modal-add/modal-add';
import SvgSprite from '../svg-sprite/svg-sprite';
import { useAppSelector } from '../../hooks';
import ModalDelete from '../modal-delete/modal-delete';

function Main() {
  const { showModalAdd, showModalSuccess, showModalDelete } = useAppSelector(({ cart }) => cart);
  return (
    <div className='wrapper'>
      <SvgSprite />
      <Header />
      <Outlet />
      <Footer />
      {showModalAdd && <ModalAdd />}
      {showModalSuccess && <ModalSuccessAdd />}
      {showModalDelete && <ModalDelete />}
    </div>
  );
}

export default Main;
