import image1 from '../../images/cookingimage1.jpg';
import image2 from '../../images/cookingimage2.jpg';
import image3 from '../../images/cookingimage3.jpg';
const Carousel = () => {
  return (
    <div className={'col d-none d-md-block glasspanel p-2'}>
      <div
        className={'carousel slide d-flex align-items-center'}
        data-bs-ride="carousel"
        data-bs-interval="10000"
      >
        <div className={'carousel-inner h-100'}>
          <div className={'carousel-item active'}>
            <img
              className={'card'}
              style={{ height: '426px', margin: 'auto' }}
              src={image1}
              alt="cooking"
            />
          </div>
          <div className={'carousel-item'}>
            <img
              className={'card'}
              style={{ height: '426px', margin: 'auto' }}
              src={image2}
              alt="cooking"
            />
          </div>
          <div className={'carousel-item'}>
            <img
              className={'card'}
              style={{ height: '426px', margin: 'auto' }}
              src={image3}
              alt="cooking"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Carousel;
