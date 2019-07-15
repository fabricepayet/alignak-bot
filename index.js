const Telegraf = require("telegraf");
const dotenv = require("dotenv");

const express = require("express");
const app = express();

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.start(ctx => ctx.reply("Salut !"));
bot.help(ctx => ctx.reply("Envoi moi un sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears(/lune/, ctx => ctx.reply("La pleine lune est pour bientôt"));
bot.launch();

app.listen(process.env.PORT || 3000);

app.get("/", function(req, res) {
  return res.json({
    success: true
  });
});
