The package has been configured successfully!

Make sure to first define the mapping inside the `contracts/ally.ts` file as follows.

```ts
import { TwitchDriver, TwitchDriverConfig } from 'adonis-ally-twitch/build/src/TwitchDriver'

declare module '@ioc:Adonis/Addons/Ally' {
  interface SocialProviders {
    // ... other mappings
    twitchDriver: {
      config: TwitchDriverConfig
      implementation: TwitchDriver
    }
  }
}
```
