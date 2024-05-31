import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import { Telegraf } from "telegraf"
import axios from "axios"

// Замените 'YOUR_BOT_TOKEN' на токен вашего бота
const bot = new Telegraf("YOUR_BOT_TOKEN")
// Замените 'YOUR_CHANNEL_ID' на ID вашего канала
const channelId = "@your_channel_id"

const app = express()
app.use(bodyParser.json())

app.post("/webhook", async (req: Request, res: Response) => {
  const { type, table, record, old_record } = req.body

  if (table === "news" && (type === "INSERT" || type === "UPDATE")) {
    const message = `
      📰 Новость обновлена:
      *Заголовок:* ${record.title}
      *Содержание:* ${record.content}
      *Дата публикации:* ${record.created_at}
    `

    try {
      await bot.telegram.sendMessage(channelId, message, {
        parse_mode: "Markdown",
      })
      res.status(200).send("Message sent to Telegram channel")
    } catch (error) {
      console.error("Error sending message to Telegram:", error)
      res.status(500).send("Error sending message to Telegram")
    }
  } else {
    res.status(200).send("No action taken")
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
