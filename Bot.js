const { generateWAMessage, getContentType, proto } = require("@queenanya/baileys");
const fs = require("fs");
const axios = require("axios");
const chalk = require("chalk");
const cron = require('node-cron');
const kirimPesanOtomatis = require('./index')

const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const today = new Date().getDay(); // Menghasilkan nilai antara 0 (Minggu) hingga 6 (Sabtu)
const todayFormatted = daysOfWeek[today];

console.log(`Hari ini: ${todayFormatted}`);

module.exports = ivan = async (client, m, chatUpdate, store) => {
  try {
    const body = m.mtype === "conversation" ? m.message.conversation : m.mtype == "imageMessage" ? m.message.imageMessage.caption : m.mtype == "videoMessage" ? m.message.videoMessage.caption : m.mtype == "extendedTextMessage" ? m.message.extendedTextMessage.text : m.mtype == "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId : m.mtype == "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId : m.mtype == "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId : m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : "";
    const pushname = m.pushName || "No Name";
    const itsMe = m.sender == client.decodeJid(client.user.id);
    const budy = typeof m.text == "string" ? m.text : "";
    const from = m.chat;
    const sender = m.sender;

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };
    if (body.startsWith("/")) {
      const args = body.slice(1).split(" ");
      const command = args[0].toLowerCase();
      const text = args.slice(1).join(" ");

      switch (command) {
        case "help":
        case "menu":
          m.reply(`*Whatsapp BOT*
            
*(ChatGPT)*
Cmd: /ai 
Tanyakan apa saja kepada AI.

*(Jadwal pelajaran)*
Cmd: /jadwal hari ini.
Tanyakan jadwal pelajarannya.

*(DALL-E)*
Cmd: /img
Membuat gambar dari teks.

*(Source Code Bot)*
Cmd: /sc
Menampilkan source code bot yang dipakai.`);
          break;

          case "@haribesok":
            await kirimPesanOtomatis()
            break
        // case "jadwal":
        //   if (text === "" || text === "hari ini") {
        //     hariIni();
        //   } else if (text === "senin" || text === "hari senin") {
        //     jadwal("Senin");
        //   } else if (text === "selasa" || text === "hari selasa") {
        //     jadwal("Selasa");
        //   } else if (text === "rabu" || text === "hari rabu") {
        //     jadwal("Rabu");
        //   } else if (text === "kamis" || text === "hari kamis") {
        //     jadwal("Kamis");
        //   } else if (text === "jumat" || text === "hari jumat") {
        //     jadwal("Jumat");
        //   } else if (text === "sabtu" || text === "hari sabtu") {
        //     jadwal("Sabtu");
        //   } else if (text === "minggu" || text === "hari minggu") {
        //     jadwal("Minggu");
        //   }
        //   break;

        // case "pr":
        //   m.reply("masukkan pr untuk hari apa?");
        //   break;

        // case "senin":
        //   m.reply("ok pr di set untuk hari senin");
        //   break;

        // case "owner":
        //   m.reply("Saya Ownernya Pake Nanya..");
        //   break;

        default: {
          if (args.length > 0) {
            console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(command, "turquoise"), color("tidak tersedia", "turquoise"));
          }
        }
      }
    }
  } catch (err) {
    m.reply(err.toString());
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
