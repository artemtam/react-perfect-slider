import { vi, describe, test, expect } from 'vitest';
import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import Slider from './slider';

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

  test('respects controls', async () => {
    render(
      <Slider
        autoplay={false}
        transitionDuration={0}
        renderControls={(next, previous, goTo, slide) => {
          return (
            <>
              <button onClick={previous} type="button">Previous</button>
              <button onClick={next} type="button">Next</button>
              <button onClick={() => goTo(2)} type="button">Go to the second slide</button>
              <span data-testid="slide">{slide}</span>
            </>
          );
        }
        }
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

    await userEvent.click(nextButton);
    expect(currentSlide).toHaveTextContent('1');

    await userEvent.click(nextButton);
    expect(currentSlide).toHaveTextContent('2');

    await userEvent.click(previousButton);
    expect(currentSlide).toHaveTextContent('1');

    await userEvent.click(previousButton);
    expect(currentSlide).toHaveTextContent('0');

    await userEvent.click(goToSecondButton);
    expect(currentSlide).toHaveTextContent('2');
  });

  test('changes slides regularly when autoplay is enabled', () => {
    vi.useFakeTimers();

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
      vi.advanceTimersByTime(4000);
    });

    expect(currentSlide).toHaveTextContent('0');

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(currentSlide).toHaveTextContent('1');
  });

  vi.useRealTimers();
});
