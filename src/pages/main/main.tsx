import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SvgSprite from '../../components/svg-sprite/svg-sprite';

export default function Main() {
  return (
    <div className='wrapper'>
      <SvgSprite />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
