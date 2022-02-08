import {Context, Next} from "koa";

export type KoaInterceptor = (ctx: Context, next: Next) => Promise<void>

export interface KoaConfig {
  cors: boolean
  interceptor: KoaInterceptor
}
