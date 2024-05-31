import { Telegraf } from "telegraf"
import { listenNewsInserts } from "./listeners"

const bot = new Telegraf("7132227941:AAFxlfNPtQ4Pnjb8V2zBXWVZ8nH8UO_EQU4")

const RUSHNEWS_CHANNEL_CHAT_ID = -1002197105241

bot.launch()

console.log("Bot is running")

listenNewsInserts((item) => {
  console.log("listen", item)

  if (item.content) {
    bot.telegram.sendMessage(RUSHNEWS_CHANNEL_CHAT_ID, item.content)
  }
})
