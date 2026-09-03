import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Rating from '@mui/material/Rating';
import { RatingHarness } from './RatingHarness.js';

describe('RatingHarness', () => {
  describe('getValue', () => {
    it('returns the selected value', () => {
      render(<Rating name="score" value={3} />);

      expect(RatingHarness.first().getValue()).toBe(3);
    });

    it('returns null when nothing is selected', () => {
      render(<Rating name="score" value={null} />);

      expect(RatingHarness.first().getValue()).toBeNull();
    });

    it('returns the value of a read-only rating', () => {
      render(<Rating name="score" value={2.5} precision={0.5} readOnly />);

      expect(RatingHarness.first().getValue()).toBe(2.5);
    });

    it('returns null for an empty read-only rating', () => {
      render(<Rating name="score" value={null} readOnly />);

      expect(RatingHarness.first().getValue()).toBeNull();
    });

    it('does not depend on the accessible label text', () => {
      render(<Rating name="score" value={3} readOnly getLabelText={(v) => `Rated ${v}`} />);

      expect(RatingHarness.first().getValue()).toBe(3);
    });
  });

  describe('getMax', () => {
    it('returns the default max of 5', () => {
      render(<Rating name="score" value={1} />);

      expect(RatingHarness.first().getMax()).toBe(5);
    });

    it('returns a custom max', () => {
      render(<Rating name="score" value={1} max={10} />);

      expect(RatingHarness.first().getMax()).toBe(10);
    });

    it('returns the number of icons, not steps, for a fractional precision', () => {
      render(<Rating name="score" value={2.5} precision={0.5} />);

      const rating = RatingHarness.first();
      expect(rating.getMax()).toBe(5);
      expect(rating.getValue()).toBe(2.5);
    });

    it('returns max for a read-only rating', () => {
      render(<Rating name="score" value={1} max={7} readOnly />);

      expect(RatingHarness.first().getMax()).toBe(7);
    });
  });

  describe('isReadOnly / isDisabled', () => {
    it('detects read-only', () => {
      render(<Rating name="score" value={1} readOnly />);

      expect(RatingHarness.first().isReadOnly()).toBe(true);
    });

    it('detects disabled', () => {
      render(<Rating name="score" value={1} disabled />);

      expect(RatingHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for an interactive rating', () => {
      render(<Rating name="score" value={1} />);

      expect(RatingHarness.first().isReadOnly()).toBe(false);
      expect(RatingHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('setValue', () => {
    it('selects a value and calls onChange', async () => {
      const handleChange = vi.fn();
      function Controlled() {
        const [value, setValue] = React.useState<number | null>(1);
        return (
          <Rating
            name="score"
            value={value}
            onChange={(e, v) => {
              handleChange(v);
              setValue(v);
            }}
          />
        );
      }
      render(<Controlled />);

      const rating = RatingHarness.first();
      await rating.setValue(4);

      expect(handleChange).toHaveBeenCalledWith(4);
      expect(rating.getValue()).toBe(4);
    });

    it('throws for a value outside the range', async () => {
      render(<Rating name="score" value={1} />);

      await expect(RatingHarness.first().setValue(9)).rejects.toThrow(/not found/);
    });
  });

  describe('getByName', () => {
    it('finds a rating by input name', () => {
      render(
        <div>
          <Rating name="quality" value={2} />
          <Rating name="price" value={4} />
        </div>
      );

      expect(RatingHarness.getByName('price').getValue()).toBe(4);
    });
  });
});
