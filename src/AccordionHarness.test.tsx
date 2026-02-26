import { render } from '@testing-library/react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { AccordionHarness } from './AccordionHarness';

describe('AccordionHarness', () => {
  describe('isExpanded', () => {
    it('returns true when expanded', () => {
      render(
        <Accordion expanded>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );

      expect(AccordionHarness.first().isExpanded()).toBe(true);
    });

    it('returns false when collapsed', () => {
      render(
        <Accordion expanded={false}>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );

      expect(AccordionHarness.first().isExpanded()).toBe(false);
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled accordion', () => {
      render(
        <Accordion disabled>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );

      expect(AccordionHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled accordion', () => {
      render(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );

      expect(AccordionHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('getSummaryText', () => {
    it('returns summary text', () => {
      render(
        <Accordion>
          <AccordionSummary>Section 1</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );

      expect(AccordionHarness.first().getSummaryText()).toBe('Section 1');
    });
  });

  describe('toggle', () => {
    it('expands collapsed accordion', async () => {
      render(
        <Accordion>
          <AccordionSummary>Summary</AccordionSummary>
          <AccordionDetails>Details</AccordionDetails>
        </Accordion>
      );

      const accordion = AccordionHarness.first();
      expect(accordion.isExpanded()).toBe(false);

      await accordion.toggle();

      expect(AccordionHarness.first().isExpanded()).toBe(true);
    });
  });
});
