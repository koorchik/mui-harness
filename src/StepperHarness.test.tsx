import React from 'react';
import { render } from '@testing-library/react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import { StepperHarness } from './StepperHarness.js';
import { StepHarness } from './StepHarness.js';

function renderStepper(activeStep = 1, orientation: 'horizontal' | 'vertical' = 'horizontal') {
  return render(
    <Stepper activeStep={activeStep} orientation={orientation}>
      <Step completed>
        <StepLabel>Account</StepLabel>
      </Step>
      <Step>
        <StepLabel error>Address</StepLabel>
      </Step>
      <Step disabled>
        <StepLabel>Review</StepLabel>
      </Step>
    </Stepper>
  );
}

describe('StepperHarness', () => {
  describe('getSteps / getStepLabels', () => {
    it('returns all steps with their labels', () => {
      renderStepper();

      const stepper = StepperHarness.first();
      expect(stepper.getSteps()).toHaveLength(3);
      expect(stepper.getStepLabels()).toEqual(['Account', 'Address', 'Review']);
    });
  });

  describe('getStep', () => {
    it('returns the step at the given index', () => {
      renderStepper();

      expect(StepperHarness.first().getStep(2).getLabel()).toBe('Review');
    });

    it('throws when the index is out of bounds', () => {
      renderStepper();

      expect(() => StepperHarness.first().getStep(5)).toThrow(/not found/);
    });
  });

  describe('getActiveIndex / getActiveLabel', () => {
    it('returns the active step', () => {
      renderStepper(1);

      const stepper = StepperHarness.first();
      expect(stepper.getActiveIndex()).toBe(1);
      expect(stepper.getActiveLabel()).toBe('Address');
    });

    it('returns -1 and null when no step is active', () => {
      renderStepper(-1);

      const stepper = StepperHarness.first();
      expect(stepper.getActiveIndex()).toBe(-1);
      expect(stepper.getActiveLabel()).toBeNull();
    });
  });

  describe('getOrientation', () => {
    it('defaults to horizontal', () => {
      renderStepper();

      expect(StepperHarness.first().getOrientation()).toBe('horizontal');
    });

    it('detects vertical', () => {
      renderStepper(0, 'vertical');

      expect(StepperHarness.first().getOrientation()).toBe('vertical');
    });
  });
});

describe('StepHarness', () => {
  describe('state', () => {
    it('reports completed, active, error and disabled states', () => {
      renderStepper(1);

      const [account, address, review] = StepperHarness.first().getSteps();

      expect(account.isCompleted()).toBe(true);
      expect(account.isActive()).toBe(false);

      expect(address.isActive()).toBe(true);
      expect(address.hasError()).toBe(true);
      expect(address.isCompleted()).toBe(false);

      expect(review.isDisabled()).toBe(true);
      expect(review.isActive()).toBe(false);
    });
  });

  describe('getByLabel', () => {
    it('finds a step by its label', () => {
      renderStepper();

      expect(StepHarness.getByLabel('Address').hasError()).toBe(true);
      expect(StepHarness.getByLabel(/rev/i).getLabel()).toBe('Review');
    });
  });

  describe('click', () => {
    it('clicks a StepButton and activates the step', async () => {
      function Controlled() {
        const [active, setActive] = React.useState(0);
        return (
          <Stepper nonLinear activeStep={active}>
            {['One', 'Two', 'Three'].map((label, index) => (
              <Step key={label}>
                <StepButton onClick={() => setActive(index)}>{label}</StepButton>
              </Step>
            ))}
          </Stepper>
        );
      }
      render(<Controlled />);

      const stepper = StepperHarness.first();
      expect(stepper.getStep(1).isClickable()).toBe(true);

      await stepper.getStep(1).click();

      expect(stepper.getActiveIndex()).toBe(1);
    });

    it('throws when the step has no StepButton', async () => {
      renderStepper();

      const step = StepperHarness.first().getStep(0);
      expect(step.isClickable()).toBe(false);
      await expect(step.click()).rejects.toThrow(/no StepButton/);
    });
  });
});
