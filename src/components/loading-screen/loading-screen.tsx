import ReactLoading from 'react-loading';
import './loading-screen.css';

function LoadingScreen() {
  return (
    <div className='loading__screen'>
      <ReactLoading type={'spinningBubbles'} color={'#fff'} />
      <p className={'places__found'}>Загрузка...</p>
    </div>
  );
}

export default LoadingScreen;
