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
    baju = "*OSIM LENGKAP* \n Kaos Kaki : *PUTIH*"
} else if (hariBesok == "Rabu") {
    baju = "*OLAHRAGA* , \n Jangan Lupa Bawa Baju Ganti *IDENTITAS* \n Kaos Kaki : *PUTIH*"
} else if (hariBesok == "Kamis") {
    baju = "*INDENTITAS* \n Kaos Kaki : *PUTIH*"
} else if (hariBesok == "Jumat" || hariBesok == "Sabtu") {
    baju = "*PRAMUKA LENGKAP* \n Kaos Kaki : *HITAM*"
}
const Seragam = `👔 Seragam Untuk Besok~ \n Baju: ${baju}`

const jadwal = async (day) => {
    const url = `http://localhost:3002/${day}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Membuat format teks WhatsApp dalam bentuk list
        const list = data.map(item => `*${item.subject}* (${item.time})`).join('\n');

        const message = `📖 *Daftar Jadwal Sekolah* 📖
        \n${list} \n 📘 *Note!* \n Buku Tidak Boleh Di Campur Dengan Mata Pelajaran Lainnya!`;
        
        return message;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return 'Terjadi kesalahan saat mengambil jadwal sekolah.';
    }
}

const PR = async () => {
    const hari = hariBesok.toLowerCase()
    console.log(hari);
    const url = `http://localhost:3002/pr/${hari}`
    try {
        const response = await axios.get(url)
        const data = await response.data;
        console.log(data);

        var mapel = {};

        // Meloopi objek data dan menambahkannya ke objek Mapel
        for (var key in data) {
          var mapelInfo = data[key];
          var mapelString = "Mapel: " + key + ", Ket: " + mapelInfo.ket;
          mapel[key] = mapelString;
        }
// Menggabungkan hasil dalam satu string
    const hasil = Object.values(mapel).join('\n ');

// Mengembalikan string hasil
    return hasil;
        
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return 'Terjadi kesalahan saat mengambil PR sekolah.';
    }
}
let jadwalPiket
if (hariBesok == "Senin") {
    jadwalPiket = "\n1.Agta Miski \n2.Fahrur Rozi \n3.Andelira Agami \n4.Dian Safitri \n5.Dina Rihadatul \n6.Diva Apriyani "
} else if(hariBesok == "Selasa") {
    jadwalPiket = "\n1.Difla Iqa \n2.EL Azhar \n3.Fatul Barri \n4.Griselda Belva \n5.Hayyu Surya \n6.Hervi Nur"
} else if(hariBesok == "Rabu") {
    jadwalPiket = "\n1.Brilliant \n2.Indah Febri \n3.Listia Barokah \n4.Lita \n5.Lutfi \n6.Zahra"
} else if(hariBesok == "Kamis") {
    jadwalPiket = "\n1.Miftahud Dini \n2.M rafi Fauzy \n3.M Ayis \n4.Nabila BalQ \n5.Naufal Hamam \n6.Fatimatu"
} else if(hariBesok == "Jumat") {
    jadwalPiket = "\n1.Purwati \n2.Reva Sadiah \n3.Reva Wardani \n4.Salma Atun \n5.Salwa Ira \n6.Satria Abiy"
} else if(hariBesok == "Sabtu") {
    jadwalPiket = "\n1.SiFat \n2.Taqi \n3.Triana kusuma \n4.Nurhalissa \n5.Vanda Veliana \n6.Yusup arif"
}


const Piket = `\n🧹🗑️ BESOK YANG PIKET HARI *${hariBesok}!* ${jadwalPiket} \n 📘 *Note!* \n Tidak Piket Maka denda Sebesar Rp.30.000. *PIKET PAGI SUNAH ,PIKET MAU PULANG WAJIB!*`
const information = `\n 📘 *Note!* \n _*(text ini di buat secara otomatis oleh system, jika ada kesalahan dalam jadwal mohon untuk di ralat.)*_`

const Pesan = async () => {
    if (hariBesok == "Minggu") {
        return `${tanggal}\n BESOK LIBOORR`
    } else {
        const Jadwal = await jadwal(hariBesok)
        const PRBesok = await PR()
        const DataPR = `\n *PR UNTUK BESOK~* \n ${PRBesok} \n 📘 *Note!* \n  _*pr ini muncul ketika anda mengisi nya di link berikut: https://isipr.vercel.app silahkan isi setiap kali ada pr baru!*_`
        return `${tanggal}\n \n${Seragam} \n ${Jadwal} \n${DataPR} \n ${Piket} \n${information}`
    }
};
module.exports = Pesan;