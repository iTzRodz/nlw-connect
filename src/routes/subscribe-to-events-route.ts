import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { string, z } from 'zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Register some subscription',
        tags: ['subscription'],
        description: 'dsadsa',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: string(),
            email: string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      return reply.status(201).send({
        name,
        email,
      })
    }
  )
}
