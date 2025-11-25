import { renderHook } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';

import useInterval from './use-interval';

vi.useFakeTimers();

describe('useInterval', () => {
  test('runs callback once in 1 second', () => {
    const callback = vi.fn();
    const delay = 1000;

    renderHook(() => useInterval(callback, delay));

    expect(callback).not.toBeCalled();

    vi.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('runs callback 10 times in 10 seconds', () => {
    const callback = vi.fn();
    const delay = 1000;

    renderHook(() => useInterval(callback, delay));

    expect(callback).not.toBeCalled();

    vi.advanceTimersByTime(delay * 10);

    expect(callback).toHaveBeenCalledTimes(10);
  });

  test('does not run a callback after unmount', () => {
    const callback = vi.fn();
    const delay = 1000;

    const { unmount } = renderHook(() => useInterval(callback, delay));

    vi.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
    vi.advanceTimersByTime(delay * 10);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not run a callback when delay is null', () => {
    const callback = vi.fn();
    let delay: number | null = 1000;

    const { rerender } = renderHook(() => useInterval(callback, delay));

    vi.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);

    delay = null;
    rerender();

    vi.advanceTimersByTime(10000);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
