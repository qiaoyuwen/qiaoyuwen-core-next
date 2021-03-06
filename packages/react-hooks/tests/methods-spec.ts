import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useMethodsNative, useMethodsExtensionNative } from '../src';

describe('useMethodsNative', () => {
  test('valid return type', () => {
    const methods = {
      inc(value: number) {
        return value + 1;
      },
    };
    const { result } = renderHook(() => useMethodsNative(methods, 0));
    const [state, { inc }, setState] = result.current;
    expect(state).toBe(0);
    expect(typeof inc).toBe('function');
    expect(typeof setState).toBe('function');
  });

  test('factory initial value', () => {
    const { result } = renderHook(() => useMethodsNative({}, () => 0));
    const [state] = result.current;
    expect(state).toBe(0);
  });

  test('method call', () => {
    const methods = {
      inc(value: number) {
        return value + 1;
      },
    };
    const { result } = renderHook(() => useMethodsNative(methods, 0));
    act(() => result.current[1].inc());
    expect(result.current[0]).toBe(1);
  });

  test('set state', () => {
    const { result } = renderHook(() => useMethodsNative({}, { value: 0 }));
    act(() => result.current[2]({ value: 1 }));
    expect(result.current[0].value).toBe(1);
  });
});

describe('useMethodsExtensionNative', () => {
  test('with builtin state', () => {
    const { result: resultState } = renderHook(() => useState({ foo: 1 }));
    const methods = {
      inc(state: { foo: number }, value: number) {
        return {
          ...state,
          foo: state.foo + value,
        };
      },
    };
    const { result: extension } = renderHook(() => useMethodsExtensionNative(methods, resultState.current[1]));
    act(() => extension.current.inc(3));
    expect(resultState.current[0]).toEqual({ foo: 4 });
  });
});
