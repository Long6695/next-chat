import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const isPayloadWithErrorMessage = (
  action: unknown,
): action is { payload: { error: string } } => {
  return (
    typeof action === 'object' &&
    action !== null &&
    'payload' in action &&
    typeof (action as any).payload.error === 'string'
  )
}

const isPayloadWithDataMessage = (
  action: unknown,
): action is { payload: { data: { message: string } } } => {
  return (
    typeof action === 'object' &&
    action !== null &&
    'payload' in action &&
    typeof (action as any).payload.data.message === 'string'
  )
}

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (isPayloadWithErrorMessage(action)) {
        toast.warn(action.payload.error)
      }
      if (isPayloadWithDataMessage(action)) {
        toast.warn(action.payload.data.message)
      }
    }
    return next(action)
  }
