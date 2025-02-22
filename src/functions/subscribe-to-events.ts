import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscription'

interface subscribeToEventParams {
  name: string
  email: string
}

export async function subscribeToEvent({
  email,
  name,
}: subscribeToEventParams) {
  const result = await db
    .insert(subscriptions)
    .values({
      email,
      name,
    })
    .returning()

  const subscriber = result[0]

  return { subscriberId: subscriber.id }
}
