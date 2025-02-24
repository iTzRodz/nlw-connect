import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { string, z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'
import { getSubscriberInvitesCount } from '../functions/get-subscripber-invites-count'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscriber ranking invite count',
          tags: ['referral'],
          description: 'dsadsa',
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params
        const { count } = await getSubscriberInvitesCount({ subscriberId })
        return { count }
      }
    )
  }
