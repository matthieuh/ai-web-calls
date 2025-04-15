import { createAPIFileRoute } from '@tanstack/react-start/api'

export const APIRoute = createAPIFileRoute('/api/__root')({
  // This is the root API route handler
  GET: async () => {
    return new Response('API is running', {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  },
})
