import { GoogleGenAI } from '@google/genai';
import { env } from '../../env.ts';

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-1.5-flash'; // Modelo válido atual

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: 'Transcreva o áudio para o português de forma precisa e natural. Mantenha a pontuação correta e divida o texto em parágrafos quando apropriado.',
          },
          {
            inlineData: {
              mimeType,
              data: audioAsBase64,
            },
          },
        ],
      },
    ],
  });
  const result = await response.text;
  if(!result){
    throw new Error('Nao foi possivel converter o Audio')
  }  
  return result;
}
