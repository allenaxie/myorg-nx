import { render } from '@testing-library/react';

import FabricjsCanvas from './fabricjs-canvas';

describe('FabricjsCanvas', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FabricjsCanvas />);
    expect(baseElement).toBeTruthy();
  });
});
