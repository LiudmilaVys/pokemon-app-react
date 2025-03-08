import { fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/router';
import NavigateRootOnClickOurside from './NavigateRootOnClickOurside';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('NavigateRootOnClick', () => {
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should navigate to root when clicking outside', () => {
    render(
      <NavigateRootOnClickOurside>
        <div>Inside</div>
      </NavigateRootOnClickOurside>
    );

    fireEvent.mouseDown(document.body);
    expect(routerPushMock).toHaveBeenCalledWith('/');
  });

  it('should not navigate when clicking inside', () => {
    const { getByText } = render(
      <NavigateRootOnClickOurside>
        <div>Inside</div>
      </NavigateRootOnClickOurside>
    );

    fireEvent.mouseDown(getByText('Inside'));
    expect(routerPushMock).not.toHaveBeenCalled();
  });
});
