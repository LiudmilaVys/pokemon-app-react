import { fireEvent, render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import NavigateRootOnClickOurside from './NavigateRootOnClickOurside';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('NavigateRootOnClick', () => {
  let navigateMock: jest.Mock;

  beforeEach(() => {
    navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it('should navigate to root when clicking outside', () => {
    render(
      <NavigateRootOnClickOurside>
        <div>Inside</div>
      </NavigateRootOnClickOurside>
    );

    fireEvent.mouseDown(document.body);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('should not navigate when clicking inside', () => {
    const { getByText } = render(
      <NavigateRootOnClickOurside>
        <div>Inside</div>
      </NavigateRootOnClickOurside>
    );

    fireEvent.mouseDown(getByText('Inside'));
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
