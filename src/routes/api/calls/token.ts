import { createAPIFileRoute } from '@tanstack/react-start/api'
import twilio from 'twilio'
import { twilioEnv } from '~/utils/env'

const { accountSid, apiKey, apiSecret, twimlAppSid } = twilioEnv

export const APIRoute = createAPIFileRoute('/api/calls/token')({
  GET: async () => {
    try {
      const AccessToken = twilio.jwt.AccessToken
      const VoiceGrant = AccessToken.VoiceGrant

      const token = new AccessToken(accountSid, apiKey, apiSecret, {
        identity: 'user-' + Math.random().toString(36).substring(2, 15)
      })
      
      const grant = new VoiceGrant({
        outgoingApplicationSid: twimlAppSid,
        incomingAllow: true,
      })
      token.addGrant(grant)
      
      return Response.json({
        token: token.toJwt()
      })
    } catch (error) {
      console.error('Error generating token:', error)
      return new Response('Error generating token', { status: 500 })
    }
  },
})
