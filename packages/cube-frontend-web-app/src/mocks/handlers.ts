import type { RequestHandler } from 'msw'

// No handler is registered, so every request goes to the real API.
// The GPU mocks in `./gpu` stay available. Add them back here when you need
// them.
export const handlers: RequestHandler[] = []
