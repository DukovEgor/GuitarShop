import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import ModalAdd from '../modal-add/modal-add';
import SvgSprite from '../svg-sprite/svg-sprite';

function Main() {
  return (
    <div className='wrapper'>
      <SvgSprite />
      <Header />
      <Outlet />
      <Footer />
      <ModalAdd />
      <ModalSuccessAdd />
    </div>
  );
}

export default Main;
