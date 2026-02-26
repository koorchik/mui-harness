import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Link from '@mui/material/Link';
import { LinkHarness } from './LinkHarness';

describe('LinkHarness', () => {
  describe('getText', () => {
    it('returns link text', () => {
      render(<Link href="#">Click me</Link>);

      expect(LinkHarness.first().getText()).toBe('Click me');
    });
  });

  describe('getHref', () => {
    it('returns href attribute', () => {
      render(<Link href="https://example.com">Example</Link>);

      expect(LinkHarness.first().getHref()).toBe('https://example.com');
    });

    it('returns empty string when no href', () => {
      render(<Link component="button">Button link</Link>);

      expect(LinkHarness.first().getHref()).toBe('');
    });
  });

  describe('click', () => {
    it('triggers onClick when clicked', async () => {
      const handleClick = vi.fn((e) => e.preventDefault());
      render(<Link href="#" onClick={handleClick}>Click me</Link>);

      await LinkHarness.first().click();

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
