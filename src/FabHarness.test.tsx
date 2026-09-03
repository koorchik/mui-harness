import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import { FabHarness } from './FabHarness.js';

describe('FabHarness', () => {
  describe('selector', () => {
    it('matches only Fab, not Button', () => {
      render(
        <div>
          <Button>Plain</Button>
          <Fab aria-label="add">+</Fab>
        </div>
      );

      expect(FabHarness.all()).toHaveLength(1);
    });
  });

  describe('getByText / getByLabel', () => {
    it('finds by text', () => {
      render(<Fab variant="extended">Navigate</Fab>);

      expect(FabHarness.getByText('Navigate').getVariant()).toBe('extended');
    });

    it('finds by aria-label', () => {
      render(
        <div>
          <Fab aria-label="add">+</Fab>
          <Fab aria-label="edit">e</Fab>
        </div>
      );

      expect(FabHarness.getByLabel('edit').getText()).toBe('e');
      expect(FabHarness.getByLabel(/ad/).getLabel()).toBe('add');
    });
  });

  describe('isDisabled', () => {
    it('returns true when disabled', () => {
      render(<Fab disabled>x</Fab>);

      expect(FabHarness.first().isDisabled()).toBe(true);
    });

    it('returns false when enabled', () => {
      render(<Fab>x</Fab>);

      expect(FabHarness.first().isDisabled()).toBe(false);
    });

    it('returns true for a disabled fab rendered as a link', () => {
      render(<Fab href="/somewhere" disabled>x</Fab>);

      expect(FabHarness.first().isDisabled()).toBe(true);
    });
  });

  describe('getVariant', () => {
    it('defaults to circular', () => {
      render(<Fab>x</Fab>);

      expect(FabHarness.first().getVariant()).toBe('circular');
    });
  });

  describe('getSize', () => {
    it('defaults to large', () => {
      render(<Fab>x</Fab>);

      expect(FabHarness.first().getSize()).toBe('large');
    });

    it('detects small and medium', () => {
      render(
        <div>
          <Fab size="small">s</Fab>
          <Fab size="medium">m</Fab>
        </div>
      );

      const [small, medium] = FabHarness.all();
      expect(small.getSize()).toBe('small');
      expect(medium.getSize()).toBe('medium');
    });
  });

  describe('getColor', () => {
    it('defaults to default', () => {
      render(<Fab>x</Fab>);

      expect(FabHarness.first().getColor()).toBe('default');
    });

    it('detects primary, secondary and success', () => {
      render(
        <div>
          <Fab color="primary">p</Fab>
          <Fab color="secondary">s</Fab>
          <Fab color="success">ok</Fab>
        </div>
      );

      expect(FabHarness.all().map((f) => f.getColor())).toEqual(['primary', 'secondary', 'success']);
    });
  });

  describe('click', () => {
    it('triggers onClick', async () => {
      const handleClick = vi.fn();
      render(<Fab onClick={handleClick}>x</Fab>);

      await FabHarness.first().click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
