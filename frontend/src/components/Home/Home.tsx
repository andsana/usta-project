import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__banner">
          <div className="home__banner-container">
            <div className="home__banner__content">
              <div className="home__banner__сontent-col">
                <h1>Инновационные решения для устойчивого будущего</h1>
                <button className="home__banner__сontent-button">Подробнее</button>
              </div>
            </div>
            <div className="home__banner__links">
              <a className="home__banner__link"></a>
              <a className="home__banner__link"></a>
              <a className="home__banner__link"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;