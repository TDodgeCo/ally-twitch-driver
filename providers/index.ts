import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class TwitchDriverProvider {
  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const Ally = this.app.container.resolveBinding('Adonis/Addons/Ally')
    const { TwitchDriver } = await import('../src/TwitchDriver')

    Ally.extend('TwitchDriver', (_, __, config, ctx) => {
      return new TwitchDriver(ctx, config)
    })
  }
}
