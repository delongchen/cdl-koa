import Koa, {Context, Middleware} from "koa";
import {KoaConfig} from "./KoaConfig";
import KoaRouter from 'koa-router'
import { createServer, RequestListener } from "http";
const KoaCors = require('@koa/cors')

const defConfig: KoaConfig = {
  cors: false,
  async interceptor(ctx, next) {
    await next()
  }
}

export class CdlKoa {
  private readonly koa: Koa
  private readonly router: KoaRouter
  private cb: RequestListener | null = null
  private config: KoaConfig

  constructor(config: KoaConfig = defConfig) {
    this.config = config
    this.koa = new Koa
    this.router = new KoaRouter
  }

  getServer() {
    const { router, koa, cb, config } = this
    if (cb) return cb

    koa.use(async (context, next) => {
      await config.interceptor(context, next)
    })

    if (config.cors) koa.use(KoaCors())

    koa.use(router.allowedMethods())
      .use(router.routes())

    return (this.cb = koa.callback())
  }

  getRouter() {
    return this.router
  }

  getKoa() {
    return this.koa
  }

  start(port: number) {
    return new Promise<void>(resolve => {
      const server = createServer(this.getServer())
      server.listen(port, resolve)
    })
  }

  get(path: string, middlewares: Middleware[]) {
    this.router.get(path, ...middlewares)
    return this
  }

  post(path: string, middlewares: Middleware[]) {
    this.router.post(path, ...middlewares)
    return this
  }
}
