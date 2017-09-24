import React from 'react';
import ReactDOM from 'react-dom';

// 引入UI库
import {
  Carousel,
} from '../src';

const App = () => (
  <Carousel>
    <Carousel.Item>
      <img width={900} height={500} alt="900x500" src="http://www.fotor.com/images2/features/photo_effects/e_bw.jpg"/>
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('app'));
