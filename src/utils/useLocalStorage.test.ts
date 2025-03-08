import { act, renderHook } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with the provided initial value if no value exists in localStorage', () => {
    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'defaultValue')
    );
    expect(result.current[0]).toBe('defaultValue');
  });

  it('should initialize with the value from localStorage if it exists', () => {
    localStorage.setItem('testKey', 'storedValue');
    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'defaultValue')
    );
    expect(result.current[0]).toBe('storedValue');
  });

  it('should update localStorage when state changes', () => {
    const { result } = renderHook(() =>
      useLocalStorage('testKey', 'defaultValue')
    );

    act(() => {
      result.current[1]('newValue');
    });

    expect(localStorage.getItem('testKey')).toBe('newValue');
    expect(result.current[0]).toBe('newValue');
  });
});
