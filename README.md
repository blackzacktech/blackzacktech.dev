![Portfolio header](https://api.yurna.info/assets/7ac6321c-aba6-4c3a-a391-916e4afb9805)

<p align="center">
 <a href="https://yurna.info/server"><img src="https://img.shields.io/discord/605270655058968576?color=%234552ef&logo=discord&label=Discord&style=flat&logoColor=fff" alt="Discord" /></a>
 <a href="https://wakapi.blackzacktech.dev"><img src="https://wakapi.blackzacktech.dev/api/badge/blackzacktech/interval:any/project:blackzacktech.dev?style=flat-square&&color=%234552ef&label=yurna.info" alt="wakapi" /></a>
 <a href="https://www.npmjs.com/package/discord.js"><img src="https://img.shields.io/badge/Discord.js-v14-%234552ef?style=flat&logo=npm&logoColor=fff" alt="Discord.js" /></a>
 <a aria-label="Version" href="https://github.com/blackzacktech/blaczack.dev/releases"><img src="https://img.shields.io/github/v/release/blackzacktech/blaczack.dev?color=%234552ef&logo=github&style=flat-square&label=Version"></a>
 <a href="https://yurna.info"><img src="https://img.shields.io/github/license/blackzacktech/blackzacktech.dev?style=flat&;logo=github&label=License&color=%234552ef" alt="GitHub License" /></a>
</p>

---

<!-- prettier-ignore-start -->
> [!IMPORTANT]
> **Remember to change pre-defined values in `config.js`** file (like `name`, `description`, `socials` etc.) before deploying your website! Change them in your forked repository.
<!-- prettier-ignore-end -->

## 🔩 Self Hosting

1. Clone [this repository](https://github.com/blackzacktech/blackzacktech.dev) `git clone https://github.com/blackzacktech/blackzacktech.dev.git`
2. Run `pnpm i` to install all dependencies,
3. Copy `.env.example` file and rename it to `.env`
4. In `.env` file set this values:
   - `GITHUB_ACCESS_TOKEN` - Your GitHub access token with public repositories permission
   - `DISCORD_WEBHOOK_URL` - Discord Webhook URL for contact form
5. Edit pre-defined values in `config.js` file (like `name`, `description`, `socials` etc.)
6. Run `pnpm build` to build the project or `pnpm dev` to run the project in development mode.

> [!NOTE]
> You can also use `npm` or `yarn` instead of `pnpm`

## 📝 `.env` configuration

| Variable              | Description                                                      | Required |
| --------------------- | ---------------------------------------------------------------- | -------- |
| `GITHUB_ACCESS_TOKEN` | Your GitHub access token with public repositories permission     | `☑️ Yes` |
| `DISCORD_WEBHOOK_URL` | Discord Webhook URL for contact form                             | `☑️ Yes` |
| `HOTJAR_ID`           | Your [Hotjar](https://www.hotjar.com) website ID (for analytics) | `❌ No`  |

> [!NOTE]
> You can set these **optional** values:
>
> - `HOTJAR_ID` - Your [Hotjar](https://www.hotjar.com) website ID (for analytics)

## ⁉️ Issues

If you have any issues with the page please create [new issue here](https://github.com/blackzacktech/blackzacktech.dev/issues)

## 📥 Pull Requests

When submitting a pull request:

- Clone the repository `git clone https://github.com/blackzacktech/blaczack.dev`
- Create a branch off of master and give it a meaningful name (e.g. my-awesome-new-feature).
- Open a [pull request](https://github.com/blackzacktech/blackzacktech.dev/pulls) on [GitHub](https://github.com) and describe the feature or fix.

## 📋 License

This project is licensed under the MIT. See the [LICENSE](https://github.com/blackzacktech/blackzacktech.dev/blob/master/license.md) file for details
