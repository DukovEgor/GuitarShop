import ReactLoading from 'react-loading';

export default function LoadingScreen() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#c8975a',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'Arial',
        fontWeight: 700,
        fontSize: '24px',
        fontStyle: 'italic',
      }}
    >
      <ReactLoading type={'spinningBubbles'} color={'#fff'} />
      <p className={'places__found'}>Загрузка...</p>
    </div>
  );
}
