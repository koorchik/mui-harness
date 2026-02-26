import { render } from '@testing-library/react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { ButtonGroupHarness } from './ButtonGroupHarness';

describe('ButtonGroupHarness', () => {
  describe('getButtons', () => {
    it('returns all buttons', () => {
      render(
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      );

      expect(ButtonGroupHarness.first().getButtons()).toHaveLength(3);
    });
  });

  describe('getVariant', () => {
    it('returns outlined by default', () => {
      render(
        <ButtonGroup>
          <Button>One</Button>
        </ButtonGroup>
      );

      expect(ButtonGroupHarness.first().getVariant()).toBe('outlined');
    });

    it('returns contained variant', () => {
      render(
        <ButtonGroup variant="contained">
          <Button>One</Button>
        </ButtonGroup>
      );

      expect(ButtonGroupHarness.first().getVariant()).toBe('contained');
    });

    it('returns text variant', () => {
      render(
        <ButtonGroup variant="text">
          <Button>One</Button>
        </ButtonGroup>
      );

      expect(ButtonGroupHarness.first().getVariant()).toBe('text');
    });
  });

  describe('getOrientation', () => {
    it('returns horizontal by default', () => {
      render(
        <ButtonGroup>
          <Button>One</Button>
        </ButtonGroup>
      );

      expect(ButtonGroupHarness.first().getOrientation()).toBe('horizontal');
    });

    it('returns vertical orientation', () => {
      render(
        <ButtonGroup orientation="vertical">
          <Button>One</Button>
        </ButtonGroup>
      );

      expect(ButtonGroupHarness.first().getOrientation()).toBe('vertical');
    });
  });
});
