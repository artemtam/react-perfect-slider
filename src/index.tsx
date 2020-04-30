import React, { useEffect, useState } from 'react';

import useInterval from './useInterval';

import styles from './Slider.module.scss';

interface SliderProps {
  children: React.ReactNodeArray;
  transitionDuration?: number;
  transitionFunction?: string;
  autoplay?: boolean;
  autoplayDuration?: number;
  renderControls?: (
    next: () => void,
    previous: () => void,
    goTo: (slide: number) => void,
    slide: number,
    total: number,
  ) => React.ReactNode | React.ReactNodeArray;
}

const Slider: React.FC<SliderProps> = ({
  children,
  autoplay = true,
  transitionDuration = 1000,
  transitionFunction = 'ease',
  autoplayDuration = 5000,
  renderControls = (): void => { /* placeholder */ },
}) => {
  // current slide
  const [current, setCurrent] = useState(0);

  // slide we want transit to (could be [-1; length])
  const [wanted, setWanted] = useState(0);

  // slide we actually want to show (real slide number: [0, length-1])
  const [realWanted, setRealWanted] = useState(0);

  const { length } = children;

  const goTo = (slide: number): void => {
    if (wanted === current) {
      if (slide === length) setRealWanted(0);
      else if (slide === -1) setRealWanted(length - 1);
      else setRealWanted(slide);

      setWanted(slide);
    }
  };

  const next = (): void => goTo((current + 1) % (length + 1));
  const previous = (): void => goTo((current - 1) % length);

  useInterval(() => {
    next();
  }, autoplay ? autoplayDuration : null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrent(realWanted);
      setWanted(realWanted);
    }, transitionDuration);

    return (): void => clearTimeout(timeout);
  }, [transitionDuration, realWanted]);

  return (
    <div className={styles.container}>
      <div
        className={styles.slider}
        style={{
          width: `${(length + 2) * 100}%`,
          transitionTimingFunction: transitionFunction,
          transitionDuration: wanted !== current ? `${transitionDuration}ms` : '0ms',
          transform: `translateX(-${((wanted + 1) / (length + 2)) * 100}%)`,
        }}
      >
        <div className={styles.slide}>
          {children[length - 1]}
        </div>
        {children.map((slide, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={styles.slide} key={index}>
            {slide}
          </div>
        ))}
        <div className={styles.slide}>
          {children[0]}
        </div>
      </div>

      {renderControls(next, previous, goTo, realWanted, length)}
    </div>
  );
};

export default Slider;
