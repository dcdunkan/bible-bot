<h1 align="center">Bible Bot v4</h1>

### Try the running bot here: [Scripture Bot](https://telegram.me/scripturbot)

A simple Bible Bot, for reading the whole Bible in 80+ translations inside
Telegram. You can read the bible, request a passage by sending the reference and
customise your experience. This is a complete re-write and modified version of
the previous version: 3, which you can find here:
[dcdunkan/bible-bot-v3](https://github.com/dcdunkan/bible-bot-v3).

Re-writed in [TypeScript](https://typescriptlang.org) and
[grammY](https://grammy.dev/) and now it runs on [Deno](https://deno.land/).

- [Built Using](#built-using)
- [🦕 Features](#-features)
- [⚙️ Setup](#️-setup)
- [License](#license)
- [Contributing](#contributing)

## Built Using

Thanks to these tools and libraries.

1. _[GetBible.net API](https://getbible.net/api)_ — A simple API used for
   fetching the Scripture data.
2. _[grammY](https://grammy.dev)_ - The Telegram Bot Framework.
3. _[Deta.sh Base](https://deta.sh)_ - Free and unlimited Cloud Database
   service.

## 🦕 Features

- **Read the whole Bible in 80+ translations** (Does not require any manual
  updating by this bot, it should update as the GetBible API data updates). Use
  the `/translations` or `/read` command in chat.
- **Request a passage by sending the reference**. You can find the accepted book
  names and formats by sending `/valid_references` in chat.
- Set a default translation. You don't have to do `/translations` every time and
  choose one. You can set a default one using `/default`. And this will be used
  when using `/read` command and requesting passages.
- **Bookmarks**. Click on the 🔖 button to bookmark a page and ❌🔖 to remove it.
  Use `/bookmarks` to list all of your bookmarks.
- **Customize your experience** with the limited options (You can suggest
  something new by opening an issue or by contributing) in the `/settings` menu.
- **I was reading ABC last day.** Ah, use `/last` to get back to the last read
  page.

I really want to add more features like, using _inline to share verses_, or
something like a _verse image generator_, maybe? **Maybe** sometime in future.

## ⚙️ Setup

### Running Locally

Make sure you have installed [Deno](https://deno.land/).

- Clone the repository.
  ```bash
  git clone https://github.com/dcdunkan/bible-bot.git
  ```
- Change directory (`cd`) to the cloned repository.
- Create a `.env` file and set [environment variables](#environment-variables)
  like in [`.env.example`](.env.example). Make sure you have set `LOCALLY` to
  `1`.
- Run the bot using the command below.
  ```bash
  deno run --allow-net --allow-env --allow-read --allow-write mod.ts
  ```

  **Required permissions**
  - `--allow-net` - To communicate with Telegram servers and recieve updates.
  - `--allow-env` - To access environment variables.
  - `--allow-read` - To read cached files.
  - `--allow-write` - To cache files.

If everything is done correct, you should see "(Username) started" in your
console.

### Deploy

The working bot, [@scripturbot](https://telegram.me/scripturbot) is currently
deployed on **[Deno Deploy](https://deno.com/deploy) (Beta 3)**. Even though I
have implemented a fine getbible.net API call caching system, it's not being
used since Deno Deploy currently does not provide file system writing access. If
you're deploying to Heroku or some other, you should be able to enable caching
by providing a `USE_CACHE=1` in [environment variables](#environment-variables).

Click the button to deploy to [Deno Deploy](https://deno.com/deploy).

[![Deploy to Deno Deploy](https://user-images.githubusercontent.com/23035000/116934239-b0d4a400-ac32-11eb-83f6-0c4119d59fa8.png)](https://dash.deno.com/new?url=https://raw.githubusercontent.com/dcdunkan/bible-bot/main/mod.ts&env=BOT_TOKEN,DETA_KEY)

<sub>Or
<a href="https://dash.deno.com/new?url=https://raw.githubusercontent.com/dcdunkan/bible-bot/main/mod.ts&env=BOT_TOKEN,DETA_KEY">click
here</a></sub>

After deploying you will get a link to your application, in the format
`https://<appname>.deno.dev/`.

Open browser and go to link below

- Replace the `<BOT_TOKEN>` with your `BOT_TOKEN`
- Replace `<APP_URL>` with the link to your application.

`https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<APP_URL>`

This will set the bot's webhook to the deployed application, so it will be able
to handle updates.

### Environment Variables

| Variable      | Required? | Description                                                                      |
| ------------- | --------- | -------------------------------------------------------------------------------- |
| `BOT_TOKEN`   | **Yes.**  | The API token of the Bot. Chat with https://t.me/BotFather to get one.           |
| `DETA_KEY`    | **Yes.**  | Project Key of Deta.sh Project. Sign up and create a project at https://deta.sh. |
| `LOG_CHAT_ID` | No.       | The Chat's ID to log. (Bot should have message sending permissions).             |
| `LOCALLY`     | No.       | Set this to any value to run the bot locally.                                    |
| `USE_CACHE`   | No.       | Set the value to 1 if you want caching to work.                                  |

## License

[MIT License](LICENSE). Copyright (c) 2022 dcdunkan (Dunkan)

## Contributing

Feel free to contribute! And if you are having issues or if you want suggest
something, please open an issue here:
[dcdunkan/bible-bot/issues](https://github.com/dcdunkan/bible-bot/issues). Or,
open a [PQ](https://telegram.me/grammyjs/34358)!

---

_In loving memory of my friend Shamil._

**Made with ❤️ and ☕**
