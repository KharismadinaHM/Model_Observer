'use server';

/**
 * @fileOverview Detects data drift between current and historical data.
 *
 * - detectDataDrift - A function to detect data drift.
 * - DetectDataDriftInput - Input type for the detectDataDrift function.
 * - DetectDataDriftOutput - Return type for the detectDataDrift function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const DetectDataDriftInputSchema = z.object({
  currentData: z.string().describe('The current data as a JSON string.'),
  historicalData: z.string().describe('The historical data as a JSON string.'),
  modelDescription: z.string().optional().describe('Description of the ML model, including features.'),
});
export type DetectDataDriftInput = z.infer<typeof DetectDataDriftInputSchema>;

const DetectDataDriftOutputSchema = z.object({
  driftDetected: z.boolean().describe('Whether data drift is detected.'),
  driftReport: z.string().describe('A report summarizing the data drift analysis.'),
});
export type DetectDataDriftOutput = z.infer<typeof DetectDataDriftOutputSchema>;

export async function detectDataDrift(input: DetectDataDriftInput): Promise<DetectDataDriftOutput> {
  return detectDataDriftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectDataDriftPrompt',
  input: {
    schema: z.object({
      currentData: z.string().describe('The current data as a JSON string.'),
      historicalData: z.string().describe('The historical data as a JSON string.'),
      modelDescription: z.string().optional().describe('Description of the ML model, including features.'),
    }),
  },
  output: {
    schema: z.object({
      driftDetected: z.boolean().describe('Whether data drift is detected.'),
      driftReport: z.string().describe('A report summarizing the data drift analysis.'),
    }),
  },
  prompt: `You are an expert in data drift detection for machine learning models.

You are provided with current data and historical data. Your task is to analyze these datasets and determine if there is significant data drift.

Consider these factors when determining data drift:
- Changes in data distribution of key features
- Missing values or new features in the current data
- Statistical differences between the current and historical data
- Model Description: {{{modelDescription}}}

Based on your analysis, provide a concise drift report and indicate whether drift is detected.

Current Data: {{{currentData}}}
Historical Data: {{{historicalData}}}

Your output should conform to the schema provided.`,
});

const detectDataDriftFlow = ai.defineFlow<
  typeof DetectDataDriftInputSchema,
  typeof DetectDataDriftOutputSchema
>(
  {
    name: 'detectDataDriftFlow',
    inputSchema: DetectDataDriftInputSchema,
    outputSchema: DetectDataDriftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
