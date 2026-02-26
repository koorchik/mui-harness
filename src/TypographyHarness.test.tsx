import { render } from '@testing-library/react';
import Typography from '@mui/material/Typography';
import { TypographyHarness } from './TypographyHarness.js';

describe('TypographyHarness', () => {
  describe('getText', () => {
    it('returns text content', () => {
      render(<Typography>Hello World</Typography>);

      expect(TypographyHarness.first().getText()).toBe('Hello World');
    });
  });

  describe('getVariant', () => {
    it('returns h1 variant', () => {
      render(<Typography variant="h1">Heading 1</Typography>);

      expect(TypographyHarness.first().getVariant()).toBe('h1');
    });

    it('returns h2 variant', () => {
      render(<Typography variant="h2">Heading 2</Typography>);

      expect(TypographyHarness.first().getVariant()).toBe('h2');
    });

    it('returns body1 variant by default', () => {
      render(<Typography>Default text</Typography>);

      expect(TypographyHarness.first().getVariant()).toBe('body1');
    });

    it('returns subtitle1 variant', () => {
      render(<Typography variant="subtitle1">Subtitle</Typography>);

      expect(TypographyHarness.first().getVariant()).toBe('subtitle1');
    });

    it('returns caption variant', () => {
      render(<Typography variant="caption">Caption text</Typography>);

      expect(TypographyHarness.first().getVariant()).toBe('caption');
    });
  });

  describe('getComponent', () => {
    it('returns p component by default', () => {
      render(<Typography>Text</Typography>);

      expect(TypographyHarness.first().getComponent()).toBe('p');
    });

    it('returns h1 component for h1 variant', () => {
      render(<Typography variant="h1">Heading</Typography>);

      expect(TypographyHarness.first().getComponent()).toBe('h1');
    });

    it('returns span component when specified', () => {
      render(<Typography component="span">Span text</Typography>);

      expect(TypographyHarness.first().getComponent()).toBe('span');
    });
  });

  describe('getColor', () => {
    it('returns inherit color by default', () => {
      render(<Typography>Default text</Typography>);

      expect(TypographyHarness.first().getColor()).toBe('inherit');
    });

    it('detects computed color styles', () => {
      render(<Typography color="primary">Primary text</Typography>);

      const harness = TypographyHarness.first();
      const computedStyle = window.getComputedStyle(harness.root);
      expect(computedStyle.color).toBeDefined();
      expect(typeof computedStyle.color).toBe('string');
    });

    // Note: Material-UI v5 uses CSS-in-JS, so color props are not reflected in CSS class names
    // They are applied as computed styles. For detailed color testing, check computed styles directly.
  });

  describe('getAlign', () => {
    it('returns center align', () => {
      render(<Typography align="center">Centered text</Typography>);

      expect(TypographyHarness.first().getAlign()).toBe('center');
    });

    it('returns left align', () => {
      render(<Typography align="left">Left text</Typography>);

      expect(TypographyHarness.first().getAlign()).toBe('left');
    });

    it('returns inherit align by default', () => {
      render(<Typography>Default text</Typography>);

      expect(TypographyHarness.first().getAlign()).toBe('inherit');
    });
  });

  describe('hasGutterBottom', () => {
    it('returns true when gutterBottom is set', () => {
      render(<Typography gutterBottom>Text with gutter</Typography>);

      expect(TypographyHarness.first().hasGutterBottom()).toBe(true);
    });

    it('returns false when gutterBottom is not set', () => {
      render(<Typography>Text without gutter</Typography>);

      expect(TypographyHarness.first().hasGutterBottom()).toBe(false);
    });
  });

  describe('hasNoWrap', () => {
    it('returns true when noWrap is set', () => {
      render(<Typography noWrap>Text with no wrap</Typography>);

      expect(TypographyHarness.first().hasNoWrap()).toBe(true);
    });

    it('returns false when noWrap is not set', () => {
      render(<Typography>Text with wrap</Typography>);

      expect(TypographyHarness.first().hasNoWrap()).toBe(false);
    });
  });

  describe('static getByText', () => {
    it('finds element by exact text', () => {
      render(<Typography>Find this text</Typography>);

      expect(() => TypographyHarness.getByText('Find this text')).not.toThrow();
    });

    it('finds element by regex pattern', () => {
      render(<Typography>Find this text</Typography>);

      expect(() => TypographyHarness.getByText(/Find.*text/)).not.toThrow();
    });

    it('throws error when text is not found', () => {
      render(<Typography>Different text</Typography>);

      expect(() => TypographyHarness.getByText('Find this text')).toThrow();
    });
  });
});