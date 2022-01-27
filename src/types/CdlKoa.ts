import Koa, {Middleware} from "koa";
import {KoaConfig} from "./KoaConfig";
import KoaRouter from 'koa-router'
import { createServer, RequestListener } from "http";

export class CdlKoa {
  private readonly koa: Koa
  private readonly router: KoaRouter
  private cb: RequestListener | null = null

  constructor(config: KoaConfig = {}) {
    this.koa = new Koa
    this.router = new KoaRouter
  }

  getServer() {
    const { router, koa, cb } = this
    if (cb) return cb

    koa.use(router.allowedMethods())
      .use(router.routes())

    return (this.cb = koa.callback())
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
