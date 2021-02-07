import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Slider from './Slider';

describe('Slider', () => {
  test('renders', () => {
    render(
      <Slider>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Slider>,
    );
  });
});
