import httpApi from '@/config/api'
import API_ENDPOINTS from '@/services/endpoints'

export const getPublicKey = async () => {
  const {data} = await httpApi.get<{publicKey: string}>(API_ENDPOINTS.SUBSCRIPTIONS.PUBLIC_KEY)
  return data
}

export const subscribeToPushNotification = async (subscription: PushSubscription) => {
  const {data} = await httpApi.post<{publicKey: string}>(API_ENDPOINTS.SUBSCRIPTIONS.SUBSCRIBE, {
    subscription,
  })
  return data
}
