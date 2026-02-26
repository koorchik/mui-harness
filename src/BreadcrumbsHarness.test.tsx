import { render } from '@testing-library/react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { BreadcrumbsHarness } from './BreadcrumbsHarness';

describe('BreadcrumbsHarness', () => {
  function renderBreadcrumbs() {
    return render(
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/users">Users</Link>
        <Typography>Current</Typography>
      </Breadcrumbs>
    );
  }

  describe('getItems', () => {
    it('returns all breadcrumb items', () => {
      renderBreadcrumbs();

      expect(BreadcrumbsHarness.first().getItems()).toEqual(['Home', 'Users', 'Current']);
    });
  });

  describe('getItemCount', () => {
    it('returns count of items', () => {
      renderBreadcrumbs();

      expect(BreadcrumbsHarness.first().getItemCount()).toBe(3);
    });
  });

  describe('getSeparator', () => {
    it('returns separator text', () => {
      renderBreadcrumbs();

      expect(BreadcrumbsHarness.first().getSeparator()).toBe('/');
    });

    it('returns custom separator', () => {
      render(
        <Breadcrumbs separator=">">
          <Link href="/">Home</Link>
          <Typography>Current</Typography>
        </Breadcrumbs>
      );

      expect(BreadcrumbsHarness.first().getSeparator()).toBe('>');
    });
  });
});
