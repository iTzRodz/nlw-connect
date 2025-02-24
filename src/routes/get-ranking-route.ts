import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { string, z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
import { getRanking } from '../functions/get-ranking'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'
import { getSubscriberInvitesCount } from '../functions/get-subscripber-invites-count'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        tags: ['referral'],
        description: 'dsadsa',
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { rankingWithScore } = await getRanking()
      return { ranking: rankingWithScore }
    }
  )
}
