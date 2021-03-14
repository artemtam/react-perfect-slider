import { renderHook } from '@testing-library/react-hooks/dom';

import useInterval from './useInterval';

jest.useFakeTimers();

describe('useInterval', () => {
  test('runs callback once in 1 second', () => {
    const callback = jest.fn();
    const delay = 1000;

    renderHook(() => useInterval(callback, delay));

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('runs callback 10 times in 10 seconds', () => {
    const callback = jest.fn();
    const delay = 1000;

    renderHook(() => useInterval(callback, delay));

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(delay * 10);

    expect(callback).toHaveBeenCalledTimes(10);
  });

  test('does not run a callback after unmount', () => {
    const callback = jest.fn();
    const delay = 1000;

    const { unmount } = renderHook(() => useInterval(callback, delay));

    jest.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
    jest.advanceTimersByTime(delay * 10);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not run a callback when delay is null', () => {
    const callback = jest.fn();
    let delay: number | null = 1000;

    const { rerender } = renderHook(() => useInterval(callback, delay));

    jest.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);

    delay = null;
    rerender();

    jest.advanceTimersByTime(10000);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
