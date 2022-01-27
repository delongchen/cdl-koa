import {Middleware} from "koa";


type HeaderField = { [p: string]: string | string[] }

export const setHeader = (field: HeaderField): Middleware =>
  async (context, next) => {
    context.set(field)
    await next()
  }
