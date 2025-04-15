import { createAPIFileRoute } from '@tanstack/react-start/api'
import twilio from 'twilio'

export const APIRoute = createAPIFileRoute('/api/calls/response')({
  POST: async ({ request }) => {
    try {
      const contentType = request.headers.get('content-type') || ''
      let phoneNumber: string | null = null
      
      if (contentType.includes('application/json')) {
        const data = await request.json()
        phoneNumber = data.phoneNumber || data.To
      } else {
        const formData = await request.formData()
        phoneNumber = formData.get('To')?.toString() || ''
      }

      console.log('Phone number:', phoneNumber)
      
      const VoiceResponse = twilio.twiml.VoiceResponse
      const voice = new VoiceResponse()
      
      if (phoneNumber) {
        const dial = voice.dial({
          callerId: phoneNumber
        })
        dial.number(phoneNumber)
      } else {
        voice.say('No phone number specified. Goodbye.')
      }
      
      return new Response(voice.toString(), {
        headers: {
          'Content-Type': 'text/xml'
        }
      })
    } catch (error) {
      console.error('Error generating voice TwiML:', error)
      return new Response('Error generating voice TwiML', { status: 500 })
    }
  },
})
