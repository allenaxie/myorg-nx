import { render } from '@testing-library/react';

import FabricjsEditor from './fabricjs-editor';

describe('FabricjsEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FabricjsEditor />);
    expect(baseElement).toBeTruthy();
  });
});
