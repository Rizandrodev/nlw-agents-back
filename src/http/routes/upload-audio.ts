import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { transcribeAudio } from '../services/gemini.ts';

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/rooms/:roomId/audio', {
    schema: {
      params: z.object({
        roomId: z.string(),
      }),
      // Nenhum body em JSON aqui, pois estamos lidando com multipart/form-data
    },
  }, async (request, reply) => {
    const { roomId } = request.params
    const audio = await request.file();

    if (!audio) {
     throw new Error("Audio is required ")
    }

    const AudioBuffer=await audio.toBuffer()
    const audioAsBase64=AudioBuffer.toString('base64')

    const transcription = await transcribeAudio(
      audioAsBase64,
      audio.mimetype
    )
    return {transcription }
    
  });
};
