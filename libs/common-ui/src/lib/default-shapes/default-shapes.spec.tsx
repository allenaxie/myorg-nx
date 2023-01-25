import { render } from '@testing-library/react';

import DefaultShapes from './default-shapes';

describe('DefaultShapes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefaultShapes />);
    expect(baseElement).toBeTruthy();
  });
});
