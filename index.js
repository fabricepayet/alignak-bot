const Telegraf = require("telegraf");
const dotenv = require("dotenv");
const moment = require("moment");

const express = require("express");
const app = express();
const SOLUNAR_API_URL = "https://api.solunar.org/solunar/-21.13,55.24";

var request = require("request");

function getMoonInfo(callback) {
  request(SOLUNAR_API_URL + "," + moment().format(YYYYMMDD) + ",4", function(
    error,
    response,
    body
  ) {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the HTML for the Google homepage.
    callback(null, body);
  });
}

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.start(ctx => ctx.reply("Salut !"));
bot.help(ctx => ctx.reply("Envoi moi un sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears(/pleine une/, ctx => {
  getMoonInfo((err, moonData) => {
    if (err) {
      ctx.reply("Je ne peux pas recupérer l'information");
    } else {
      const { moonIllumination } = moonData;
      ctx.reply(`L'illumination sera de ${moonIllumination} aujourd'hui`);
    }
  });
});
bot.launch();

app.listen(process.env.PORT || 3000);

app.get("/", function(req, res) {
  return res.json({
    success: true
  });
});
