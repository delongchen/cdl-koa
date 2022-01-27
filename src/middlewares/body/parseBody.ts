import {Context, Middleware} from "koa";
import {BodyParser, getBodyStr} from "./BodyParser";

export const parseBodyHelper = async <T> (ctx: Context, parser: BodyParser) => {
  const data = await getBodyStr(ctx)

  if (data.length === 0) return

  try {
    return <T>parser(data)
  } catch (e: any) {
    console.log(e)
    return
  }
}

export const parseBody: (parser: BodyParser) => Middleware =
  (parser: BodyParser) => async (context, next) => {
    const result = await parseBodyHelper(context, parser)
    if (result === undefined) {
      context.body = 'illegal body'
      return
    }

    context.state.data = result
    await next()
  }
