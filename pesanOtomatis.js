const moment = require('moment-timezone');
const axios = require("axios");

// Tetapkan zona waktu ke Asia/Jakarta
moment.tz.setDefault('Asia/Jakarta');

// Dapatkan tanggal besok dalam format "Hari, DD - MMMM - YYYY"
const hariBesok = moment().add(1, 'days').locale('id').format('dddd');
const tanggalBesok = moment().add(1, 'days').locale('id').format('dddd, DD - MMMM - YYYY.');
console.log('Hari besok:', tanggalBesok);

const tanggal = `✨ Jangan Lupa Besok Hari *${tanggalBesok}* ✨`

let baju
if (hariBesok == "Senin" || hariBesok == "Selasa") {
    baju = "*OSIM LENGKAP*\n Kaos Kaki : *PUTIH*"
} else if (hariBesok == "Rabu") {
    baju = "*OLAHRAGA* , \n Jangan Lupa Bawa Baju Ganti *IDENTITAS* \n Kaos Kaki : *PUTIH*"
} else if (hariBesok == "Kamis") {
    baju = "*INDENTITAS* \n Kaos Kaki : *PUTIH*"
} else if (hariBesok == "Jumat" || hariBesok == "Sabtu") {
    baju = "*PRAMUKA LENGKAP*"
}
const Seragam = `👔 Seragam Untuk Besok~ \n ${baju}`

const jadwal = async (day) => {
    const url = `https://api-sekolah.arul251.repl.co/${day}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Membuat format teks WhatsApp dalam bentuk list
        const list = data.map(item => `*${item.subject} (${item.time})*`).join('\n');

        const message = `📖 *Daftar Jadwal Sekolah* 📖\n
        _*jadwal untuk hari ${day}*_
        \n${list}`;
        
        return message;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return 'Terjadi kesalahan saat mengambil jadwal sekolah.';
    }
}

const Pesan = async () => {
    if (hariBesok == "Minggu") {
        return `${tanggal}\n BESOK LIBOORR`
    } else {
        const Jadwal = await jadwal(hariBesok)
        return `${tanggal}\n \n${Seragam} \n ${Jadwal}`
    }
};
module.exports = Pesan;