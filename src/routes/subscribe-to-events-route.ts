import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { string, z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-events'

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
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })
      return reply.status(201).send({ subscriberId })
    }
  )
}
