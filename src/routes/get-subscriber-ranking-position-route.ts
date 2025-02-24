import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { string, z } from 'zod'
import { getSubscriberRankingPosition } from '../functions/get-subscripber-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscriber ranking position',
          tags: ['referral'],
          description: 'dsadsa',
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              position: z.number().nullable(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params
        const { position } = await getSubscriberRankingPosition({
          subscriberId,
        })
        return { position }
      }
    )
  }
