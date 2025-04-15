import { createAPIFileRoute } from '@tanstack/react-start/api'
import twilio from 'twilio'
import { twilioEnv } from '~/utils/env'

const { accountSid, authToken, phoneNumber, baseUrl } = twilioEnv

export const APIRoute = createAPIFileRoute('/api/calls/make')({
  POST: async ({ request }) => {
    try {
      const data = await request.json()
      
      if (!data.to) {
        return Response.json(
          { success: false, error: 'Missing required parameter: to' },
          { status: 400 }
        )
      }
      
      const client = new twilio.Twilio(accountSid, authToken)
      
      const call = await client.calls.create({
        to: data.to,
        from: data.from || phoneNumber,
        url: `${baseUrl}/api/calls/response`,
      })
      
      return Response.json({
        success: true,
        callSid: call.sid
      })
    } catch (error) {
      console.error('Error making call:', error)
      return Response.json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 })
    }
  },
})
