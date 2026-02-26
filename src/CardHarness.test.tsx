import { render } from '@testing-library/react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardHarness } from './CardHarness.js';

describe('CardHarness', () => {
  describe('getHeaderText', () => {
    it('returns card header title', () => {
      render(
        <Card>
          <CardHeader title="Card Title" />
        </Card>
      );

      expect(CardHarness.first().getHeaderText()).toBe('Card Title');
    });

    it('returns empty string when no header', () => {
      render(
        <Card>
          <CardContent>Content</CardContent>
        </Card>
      );

      expect(CardHarness.first().getHeaderText()).toBe('');
    });
  });

  describe('getSubheaderText', () => {
    it('returns card header subheader', () => {
      render(
        <Card>
          <CardHeader title="Title" subheader="Subtitle" />
        </Card>
      );

      expect(CardHarness.first().getSubheaderText()).toBe('Subtitle');
    });

    it('returns empty string when no subheader', () => {
      render(
        <Card>
          <CardHeader title="Title" />
        </Card>
      );

      expect(CardHarness.first().getSubheaderText()).toBe('');
    });
  });

  describe('getContentElement', () => {
    it('returns content element when present', () => {
      render(
        <Card>
          <CardContent>Some content</CardContent>
        </Card>
      );

      expect(CardHarness.first().getContentElement()).not.toBeNull();
    });

    it('returns null when no content', () => {
      render(
        <Card>
          <CardHeader title="Title" />
        </Card>
      );

      expect(CardHarness.first().getContentElement()).toBeNull();
    });
  });

  describe('getActionsElement', () => {
    it('returns actions element when present', () => {
      render(
        <Card>
          <CardActions>
            <Button>Action</Button>
          </CardActions>
        </Card>
      );

      expect(CardHarness.first().getActionsElement()).not.toBeNull();
    });

    it('returns null when no actions', () => {
      render(
        <Card>
          <CardContent>Content</CardContent>
        </Card>
      );

      expect(CardHarness.first().getActionsElement()).toBeNull();
    });
  });
});
