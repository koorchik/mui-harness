import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { ButtonHarness } from './ButtonHarness.js';
import { CollapseHarness } from './CollapseHarness.js';

describe('CollapseHarness', () => {
  describe('isExpanded / isHidden', () => {
    it('reports an open collapse as expanded', () => {
      render(
        <Collapse in>
          <div>Details</div>
        </Collapse>
      );

      const collapse = CollapseHarness.first();
      expect(collapse.isExpanded()).toBe(true);
      expect(collapse.isHidden()).toBe(false);
    });

    it('reports a closed collapse as hidden', () => {
      render(
        <Collapse in={false}>
          <div>Details</div>
        </Collapse>
      );

      const collapse = CollapseHarness.first();
      expect(collapse.isExpanded()).toBe(false);
      expect(collapse.isHidden()).toBe(true);
    });

    it('follows a toggle once the transition completes', async () => {
      function Toggle() {
        const [open, setOpen] = React.useState(false);
        return (
          <>
            <Button onClick={() => setOpen((o) => !o)}>Toggle</Button>
            <Collapse in={open} timeout={0}>
              <div>Details</div>
            </Collapse>
          </>
        );
      }
      render(<Toggle />);

      const collapse = CollapseHarness.first();
      expect(collapse.isHidden()).toBe(true);

      await ButtonHarness.getByText('Toggle').click();
      await waitFor(() => expect(collapse.isExpanded()).toBe(true));
      expect(collapse.isHidden()).toBe(false);

      await ButtonHarness.getByText('Toggle').click();
      await waitFor(() => expect(collapse.isHidden()).toBe(true));
      expect(collapse.isExpanded()).toBe(false);
    });
  });

  describe('getText', () => {
    it('returns the content text even while collapsed', () => {
      render(
        <Collapse in={false}>
          <div>Hidden details</div>
        </Collapse>
      );

      expect(CollapseHarness.first().getText()).toBe('Hidden details');
    });
  });
  describe('static getByText', () => {
    it('finds a collapse by its text', () => {
      render(
        <div>
          <Collapse in>
            <div>First panel</div>
          </Collapse>
          <Collapse in={false}>
            <div>Second panel</div>
          </Collapse>
        </div>
      );

      expect(CollapseHarness.getByText('Second panel').isHidden()).toBe(true);
      expect(CollapseHarness.getByText(/First/).isExpanded()).toBe(true);
    });

    it('throws when there is no such text', () => {
      render(
        <Collapse in>
          <div>First panel</div>
        </Collapse>
      );

      expect(() => CollapseHarness.getByText('Missing')).toThrow();
    });
  });
});
