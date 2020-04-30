import React from 'react';
import Slider from 'react-perfect-slider';

import 'react-perfect-slider/dist/react-perfect-slider.css';

import styles from './App.module.scss';

const App = () => (
    <div className={styles.container}>
        <Slider renderControls={(next, previous, goTo, slide, total) => [
            <button onClick={previous}>Previous</button>,
            <button onClick={next}>Next</button>,
            <div>Current slide: {slide}</div>,
            <div>Total slides: {total}</div>,
        ]}>
            <div className={styles.slide}>Slide 1</div>
            <div className={styles.slide}>Slide 2</div>
            <div className={styles.slide}>Slide 3</div>
            <div className={styles.slide}>Slide 4</div>
            <div className={styles.slide}>Slide 5</div>
        </Slider>
    </div>
);

export default App;
