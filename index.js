const Telegraf = require("telegraf");
const dotenv = require("dotenv");
const moment = require("moment");

const express = require("express");
const app = express();
const SOLUNAR_API_URL = "https://api.solunar.org/solunar/-21.13,55.24";

var request = require("request");

function getMoonInfo(callback) {
  request(SOLUNAR_API_URL + "," + moment().format("YYYYMMDD") + ",4", function(
    error,
    response,
    body
  ) {
    callback(null, JSON.parse(body));
  });
}

function formatHour(dateHour) {
  const [h, minutes] = dateHour.split(":");
  const hours = parseInt(h);
  if (hours > 23) {
    const newHours = hours - 24;
    return `${newHours < 10 ? "0" + newHours : newHours}h${minutes}`;
  }

  return `${hours}h${minutes}`;
}

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.start(ctx => ctx.reply("Bonjour, je suis Séléné"));
bot.hears(/pleine lune/, ctx => {
  getMoonInfo((err, moonData) => {
    if (err) {
      ctx.reply("Je ne peux pas recupérer l'information");
    } else {
      const { moonIllumination, moonRise, major2Stop, major2Start } = moonData;
      ctx.reply(
        `Aujourd'hui la lune sera présente dès ${formatHour(
          moonRise
        )}. Sa période culminante sera de ${formatHour(
          major2Start
        )} à ${formatHour(major2Stop)} et sa luminosité sera de ${Math.floor(
          moonIllumination * 100
        )}%`
      );
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
