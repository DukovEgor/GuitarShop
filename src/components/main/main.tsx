import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import SvgSprite from '../svg-sprite/svg-sprite';

function Main() {
  return (
    <div className='wrapper'>
      <SvgSprite />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main;
