const moment = require('moment-timezone');

// Tetapkan zona waktu ke Asia/Jakarta
moment.tz.setDefault('Asia/Jakarta');

// Dapatkan tanggal besok dalam format "Hari, DD - MMMM - YYYY"
const Today = moment().locale('id').format('dddd');

const MengisiPR = async () => {
    const Text = `       *PEMBERITAHUAN !*\n
Untuk yang _*hari ini piket*_ di mohon jika saat pelajaran tadi terdapat *Tugas / PR* untuk mengisi nya di link berikut:\n *https://isipr.vercel.app*
    \n Agar tidak lupa di kemudian hari
    \n *sekian terimakasih*🙏`


    if (Today == "Minggu") {
        console.log("libur");
    } else {
        return Text
    }
}

module.exports = MengisiPR;