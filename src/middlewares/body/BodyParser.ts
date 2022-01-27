import {Context} from "koa";

export type BodyParser = (data: string) => any

export async function getBodyStr(ctx: Context) {
  const bufs: Buffer[] = []

  for await (const chunk of ctx.req) {
    bufs.push(chunk)
  }

  return Buffer.concat(bufs).toString()
}
