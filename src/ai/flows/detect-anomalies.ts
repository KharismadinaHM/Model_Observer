'use server';
/**
 * @fileOverview An anomaly detection AI agent for model performance metrics.
 *
 * - detectAnomalies - A function that handles the anomaly detection process.
 * - DetectAnomaliesInput - The input type for the detectAnomalies function.
 * - DetectAnomaliesOutput - The return type for the detectAnomalies function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const DetectAnomaliesInputSchema = z.object({
  metricName: z.string().describe('The name of the model performance metric (e.g., accuracy, latency).'),
  historicalData: z.string().describe('Historical data for the metric, formatted as a JSON string.'),
  currentValue: z.number().describe('The current value of the metric.'),
});
export type DetectAnomaliesInput = z.infer<typeof DetectAnomaliesInputSchema>;

const DetectAnomaliesOutputSchema = z.object({
  isAnomaly: z.boolean().describe('Whether or not the current value is an anomaly.'),
  explanation: z.string().describe('An explanation of why the current value is (or is not) an anomaly.'),
});
export type DetectAnomaliesOutput = z.infer<typeof DetectAnomaliesOutputSchema>;

export async function detectAnomalies(input: DetectAnomaliesInput): Promise<DetectAnomaliesOutput> {
  return detectAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectAnomaliesPrompt',
  input: {
    schema: z.object({
      metricName: z.string().describe('The name of the model performance metric (e.g., accuracy, latency).'),
      historicalData: z.string().describe('Historical data for the metric, formatted as a JSON string.'),
      currentValue: z.number().describe('The current value of the metric.'),
    }),
  },
  output: {
    schema: z.object({
      isAnomaly: z.boolean().describe('Whether or not the current value is an anomaly.'),
      explanation: z.string().describe('An explanation of why the current value is (or is not) an anomaly.'),
    }),
  },
  prompt: `You are an expert in statistical analysis and anomaly detection.

You are provided with historical data for a model performance metric and the current value of that metric. Your task is to determine if the current value is an anomaly based on the historical data.

Metric Name: {{{metricName}}}
Historical Data: {{{historicalData}}}
Current Value: {{{currentValue}}}

Consider factors such as trends, seasonality, and outliers in the historical data when making your determination. Explain your reasoning in the explanation field.
`,
});

const detectAnomaliesFlow = ai.defineFlow<
  typeof DetectAnomaliesInputSchema,
  typeof DetectAnomaliesOutputSchema
>(
  {
    name: 'detectAnomaliesFlow',
    inputSchema: DetectAnomaliesInputSchema,
    outputSchema: DetectAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
