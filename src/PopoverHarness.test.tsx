import { render } from '@testing-library/react';
import Popover from '@mui/material/Popover';
import { PopoverHarness } from './PopoverHarness';

describe('PopoverHarness', () => {
  describe('getPaper', () => {
    it('returns PaperHarness', () => {
      render(
        <Popover open anchorReference="anchorPosition" anchorPosition={{ top: 0, left: 0 }}>
          <div>Popover content</div>
        </Popover>
      );

      const paper = PopoverHarness.first().getPaper();
      expect(paper).toBeDefined();
      expect(paper.root.textContent).toBe('Popover content');
    });
  });
});
