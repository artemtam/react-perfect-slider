import React from 'react';

import '@testing-library/jest-dom';
import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Slider from './Slider';

jest.useFakeTimers();

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

  test('renders controls', () => {
    render(
      <Slider renderControls={(next, previous, goTo) => (
        <>
          <button onClick={previous} type="button">Previous</button>
          <button onClick={next} type="button">Next</button>
          <button onClick={() => goTo(2)} type="button">Go to the second slide</button>
        </>
      )}
      >
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Slider>,
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Go to the second slide')).toBeInTheDocument();
  });

  test('respects controls', () => {
    render(
      <Slider
        autoplay={false}
        renderControls={(next, previous, goTo, slide) => (
          <>
            <button onClick={previous} type="button">Previous</button>
            <button onClick={next} type="button">Next</button>
            <button onClick={() => goTo(2)} type="button">Go to the second slide</button>
            <span data-testid="slide">{slide}</span>
          </>
        )}
      >
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Slider>,
    );

    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');
    const goToSecondButton = screen.getByText('Go to the second slide');

    const currentSlide = screen.getByTestId('slide');

    expect(currentSlide).toHaveTextContent('0');

    act(() => {
      userEvent.click(nextButton);
      jest.runAllTimers();
    });

    expect(currentSlide).toHaveTextContent('1');

    act(() => {
      userEvent.click(nextButton);
      jest.runAllTimers();
    });

    expect(currentSlide).toHaveTextContent('2');

    act(() => {
      userEvent.click(previousButton);
      jest.runAllTimers();
    });

    expect(currentSlide).toHaveTextContent('1');

    act(() => {
      userEvent.click(previousButton);
      jest.runAllTimers();
    });

    expect(currentSlide).toHaveTextContent('0');

    act(() => {
      userEvent.click(goToSecondButton);
      jest.runAllTimers();
    });

    expect(currentSlide).toHaveTextContent('2');
  });

  test('changes slides regularly when autoplay is enabled', () => {
    render(
      <Slider
        autoplayDuration={5000}
        renderControls={(next, previous, goTo, slide) => (
          <span data-testid="slide">{slide}</span>
        )}
      >
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Slider>,
    );

    const currentSlide = screen.getByTestId('slide');
    expect(currentSlide).toHaveTextContent('0');

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(currentSlide).toHaveTextContent('0');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(currentSlide).toHaveTextContent('1');
  });
});
