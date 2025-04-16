'use server';
/**
 * @fileOverview A feedback loop to continuously improve model performance based on user feedback.
 *
 * - improveModelWithFeedback - A function that handles the model improvement process.
 * - ImproveModelWithFeedbackInput - The input type for the improveModelWithFeedback function.
 * - ImproveModelWithFeedbackOutput - The return type for the improveModelWithFeedback function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ImproveModelWithFeedbackInputSchema = z.object({
  prediction: z.string().describe('The model prediction to be evaluated.'),
  feedback: z.string().describe('User feedback on the model prediction.'),
  modelVersion: z.string().describe('The version of the model used to generate the prediction.'),
  inputData: z.string().describe('The input data used to generate the prediction.'),
});
export type ImproveModelWithFeedbackInput = z.infer<typeof ImproveModelWithFeedbackInputSchema>;

const ImproveModelWithFeedbackOutputSchema = z.object({
  improvementSuggestion: z.string().describe('Suggestions on how to improve the model based on the feedback.'),
});
export type ImproveModelWithFeedbackOutput = z.infer<typeof ImproveModelWithFeedbackOutputSchema>;

export async function improveModelWithFeedback(input: ImproveModelWithFeedbackInput): Promise<ImproveModelWithFeedbackOutput> {
  return improveModelWithFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveModelWithFeedbackPrompt',
  input: {
    schema: z.object({
      prediction: z.string().describe('The model prediction to be evaluated.'),
      feedback: z.string().describe('User feedback on the model prediction.'),
      modelVersion: z.string().describe('The version of the model used to generate the prediction.'),
      inputData: z.string().describe('The input data used to generate the prediction.'),
    }),
  },
  output: {
    schema: z.object({
      improvementSuggestion: z.string().describe('Suggestions on how to improve the model based on the feedback.'),
    }),
  },
  prompt: `You are an AI model improvement specialist. A user has provided feedback on a model's prediction.  Your job is to analyze the feedback and suggest concrete ways to improve the model.

Here's the model's prediction: {{{prediction}}}
Here's the user's feedback: {{{feedback}}}
Here's the model version: {{{modelVersion}}}
Here's the input data: {{{inputData}}}

Based on this information, what are some specific steps the model developers can take to improve the model's performance and accuracy in the future? Focus on concrete suggestions related to model architecture, training data, or feature engineering.
`,
});

const improveModelWithFeedbackFlow = ai.defineFlow<
  typeof ImproveModelWithFeedbackInputSchema,
  typeof ImproveModelWithFeedbackOutputSchema
>({
  name: 'improveModelWithFeedbackFlow',
  inputSchema: ImproveModelWithFeedbackInputSchema,
  outputSchema: ImproveModelWithFeedbackOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
