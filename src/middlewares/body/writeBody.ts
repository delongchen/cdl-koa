import {Middleware} from "koa";

type BodyWriter = (data: any) => string

export const writeBody = (writer: BodyWriter): Middleware => (async (context, next) => {
  const data = context.state.data

  if (data) {
    try {
      context.body = Buffer.from(writer(data))
      return
    } catch (e: any) {
      context.body = {
        info: 'write err',
        e
      }
    }
  }

  context.status = 503
})
