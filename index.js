const Telegraf = require("telegraf");
const dotenv = require("dotenv");

const express = require("express");
const app = express();

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.start(ctx => ctx.reply("Welcome!"));
bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));
bot.launch();

app.listen(3000);

app.get("/", function(req, res) {
  return res.json({
    success: true
  });
});
