# Adonis Ally Twitch Driver

[![NPM version](https://img.shields.io/npm/v/adonis-ally-twitch.svg)](https://www.npmjs.com/package/adonis-ally-twitch)

A [Twitch](https://twitch.tv/) driver for [AdonisJS Ally](https://docs.adonisjs.com/guides/auth/social)

## Getting started

### 1. Install the package

Install the package from your command line.

```bash
npm install --save adonis-ally-twitch
```

or

```bash
yarn add adonis-ally-twitch
```

### 2. Configure the package

```bash
node ace configure adonis-ally-twitch
```

### 3. Validate environment variables

```ts
TWITCH_CLIENT_ID: Env.schema.string(),
TWITCH_CLIENT_SECRET: Env.schema.string(),
TWITCH_CALLBACK_URL: Env.schema.string(),
```

### 4. Add variables to your ally configuration

```ts
const allyConfig: AllyConfig = {
  // ... other drivers
  twitch: {
    driver: 'twitch',
    clientId: Env.get('TWITCH_CLIENT_ID'),
    clientSecret: Env.get('TWITCH_CLIENT_SECRET'),
    callbackUrl: Env.get('TWITCH_CALLBACK_URL'),
  },
}
```

## Scopes

You can pass an string of scopes in your configuration, for example `['user:read:email', 'user:read:follows']`. You have a full list of scopes in the [Twitch Oauth documentation](https://dev.twitch.tv/docs/authentication#scopes)

## How it works

You can learn more about [AdonisJS Ally](https://docs.adonisjs.com/guides/auth/social) in the documentation. And learn about the implementation in the [ally-driver-boilerplate](https://github.com/adonisjs-community/ally-driver-boilerplate) repository.

## Contributing

1. Fork the repo
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'feat: Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT](LICENSE)
