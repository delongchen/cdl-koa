import {Middleware} from "koa";


type HeaderValue = string | string[]
type HeaderField = { [p: string]: HeaderValue }

class HeaderBuilder {
  private readonly header: HeaderField

  constructor() {
    this.header = Object.create(null)
  }

  add(kv: [string, HeaderValue]) {
    const [k, v] = kv
    this.header[k] = v
  }

  build() { return this.header }

  mid() { return setHeader(this.header) }
}

export const setHeader = (field: HeaderField): Middleware =>
  async (context, next) => {
    context.set(field)
    await next()
  }
