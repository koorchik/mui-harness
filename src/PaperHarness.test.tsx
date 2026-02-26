import { render } from '@testing-library/react';
import Paper from '@mui/material/Paper';
import { PaperHarness } from './PaperHarness';

describe('PaperHarness', () => {
  it('finds Paper element', () => {
    render(<Paper>Content</Paper>);

    expect(PaperHarness.first()).toBeDefined();
  });

  it('root contains content', () => {
    render(<Paper>Paper content</Paper>);

    expect(PaperHarness.first().root.textContent).toBe('Paper content');
  });
});
