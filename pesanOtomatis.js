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
    const url = `https://api-sekolah.arul251.repl.co/${day}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Membuat format teks WhatsApp dalam bentuk list
        const list = data.map(item => `*${item.subject} (${item.time})*`).join('\n');

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
    const url = `https://api-sekolah.arul251.repl.co/pr/${hari}`
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

// Array berisi beberapa fakta dunia
const facts = [
    "Bumi adalah planet ketiga dari matahari.",
    "Samudera Pasifik adalah samudera terluas di dunia.",
    "Gunung Everest adalah gunung tertinggi di dunia.",
    "Rata-rata suhu terpanas di dunia pernah tercatat di Death Valley, AS.",
    "Antartika adalah benua terdingin di dunia.",
    "Amazon Rainforest adalah hutan hujan terbesar di dunia.",
    "Great Barrier Reef di Australia adalah terumbu karang terbesar di dunia.",
    "Burj Khalifa di Dubai adalah gedung tertinggi di dunia.",
    "Puncak Kilimanjaro di Tanzania adalah gunung tertinggi di benua Afrika.",
    "Arah mata angin utara, selatan, timur, dan barat disebut sebagai utara, selatan, timur, dan barat.",
    "Australia adalah satu-satunya benua yang juga merupakan sebuah negara.",
    "Benua Eropa terdiri dari lebih dari 40 negara, dan Uni Eropa adalah aliansi politik dan ekonomi di wilayah ini.",
    "Danau Baikal di Rusia adalah danau terdalam di dunia.",
    "Jepang terletak di Cincin Api Pasifik, wilayah dengan banyak gempa bumi dan letusan gunung berapi.",
    "Taj Mahal di India adalah monumen cinta yang megah dan menjadi salah satu keajaiban dunia.",
    "Pulau Pasifik Kepulauan Marshall adalah negara dengan jumlah koridor penerbangan terbanyak di dunia.",
    "Selat Bering di antara Alaska dan Rusia adalah salah satu titik terdekat antara Amerika Utara dan Asia.",
    "Sistem Terusan Panama menghubungkan Samudera Atlantik dan Pasifik.",
    "Danau Victoria di Afrika adalah danau terbesar di benua ini.",
    "Benua Amerika terdiri dari dua benua besar: Amerika Utara dan Amerika Selatan.",
    "Pegunungan Rocky di Amerika Utara membentang sepanjang lebih dari 4.800 kilometer.",
    "Pegunungan Andes di Amerika Selatan adalah rangkaian pegunungan terpanjang di dunia.",
    "Pegunungan Ural di Rusia memisahkan Eropa dari Asia.",
    "Sungai Thames mengalir melalui kota London di Inggris.",
    "Selat Malaka di Asia Tenggara adalah jalur pelayaran tersibuk di dunia.",
    "Piramida Giza di Mesir adalah satu-satunya dari Tujuh Keajaiban Dunia kuno yang masih berdiri.",
    "Matahari adalah bintang pusat dari tata surya kita.",
    "Jumlah populasi dunia saat ini diperkirakan melebihi 7,9 miliar orang.",
    "Khatulistiwa adalah garis lintang di Bumi di mana matahari berada tepat di atas kepala pada titik tertentu sepanjang tahun.",
    "Benua terbesar di dunia adalah Asia, sementara Antartika adalah benua terdingin dan benua beku.",
    "Samudera Pasifik adalah samudera terluas di dunia.",
    "Bumi memiliki lebih dari 1.300.000 kilometer kubik air di bentuk lautan.",
    "Gunung Everest, yang terletak di Pegunungan Himalaya, adalah gunung tertinggi di dunia.",
    "Amazon Rainforest di Amerika Selatan adalah hutan hujan terbesar di dunia.",
    "Great Barrier Reef di Australia adalah terumbu karang terbesar di dunia.",
    "Burj Khalifa di Dubai adalah gedung tertinggi di dunia dengan ketinggian lebih dari 828 meter.",
    "Nil adalah sungai terpanjang di dunia, mengalir sepanjang lebih dari 6.650 kilometer.",
    "Sahara adalah gurun terluas di dunia, mencakup sebagian besar Afrika Utara.",
    "Selat Gibraltar memisahkan Afrika dan Eropa hanya dengan lebar sekitar 14 kilometer di titik terkecilnya.",
    "Bahasa Mandarin adalah bahasa yang paling banyak digunakan di dunia berdasarkan jumlah penutur aslinya.",
    "Spanyol merayakan 'La Tomatina', sebuah festival di mana peserta saling melempar tomat.",
    "Sungai Amazon di Amerika Selatan adalah sungai terpanjang di dunia.",
    "Kawah Ijen di Indonesia memiliki danau asam sulfur yang unik.",
    "Gurun Atacama di Chili dianggap sebagai salah satu gurun paling kering di dunia.",
    "Danau Titicaca di perbatasan Bolivia dan Peru adalah danau tertinggi di dunia yang dapat dilayari kapal besar.",
    "Salto Angel di Venezuela adalah air terjun tertinggi di dunia.",
    "Sahara mengalami badai pasir yang sering menghantam dan membawa pasir jauh ke udara.",
    "Reruntuhan Machu Picchu di Peru adalah situs arkeologi kuno yang indah.",
    "Pulau Easter di Samudera Pasifik terkenal dengan patung batu raksasa Moai.",
    "Sungai Thames di London memiliki lebih dari 200 spesies ikan.",
    "Kawah Yellowstone di Amerika Serikat adalah area geotermal terbesar di dunia.",
    "Sungai Nile di Mesir memiliki sejarah panjang dan dianggap sebagai 'sumber kehidupan'.",
    "Pulau Bora Bora di Polinesia Prancis dikenal dengan lagunanya yang indah.",
    "Jeju Island di Korea Selatan terkenal dengan alamnya yang menakjubkan dan Gunung Hallasan yang bersalju.",
    "Salar de Uyuni di Bolivia adalah padang garam terbesar di dunia.",
    "Gunung Fuji di Jepang adalah gunung tertinggi di negara tersebut.",
    "Taman Nasional Yellowstone adalah taman nasional pertama di dunia.",
    "Pantai Pink di Kepulauan Bahama memiliki pasir yang berwarna pink alami.",
    "Reruntuhan Acropolis di Athena, Yunani, adalah situs bersejarah yang penting.",
    "Jembatan Akashi Kaikyō di Jepang adalah jembatan gantung terpanjang di dunia.",
    "Sungai Mekong di Asia Tenggara adalah salah satu sungai terpanjang di dunia.",
    "Danau Baikal di Rusia adalah danau air tawar terdalam di dunia.",
    "Pulau Victoria di Kanada adalah pulau terbesar kedua di dunia.",
    "Sungai Yangtze di Cina adalah sungai terpanjang di Asia dan ketiga terpanjang di dunia.",
    "Benua Australia adalah satu-satunya benua yang tidak memiliki gunung berapi aktif.",
    "Tornado Alley di Amerika Serikat dikenal sebagai wilayah dengan aktivitas tornado yang tinggi.",
    "Kawah Deception di Antartika adalah salah satu kawah paling dalam di dunia.",
    "Sungai Thames di London memiliki lebih dari 200 spesies ikan.",
    "Pegunungan Alps membentang melalui delapan negara di Eropa.",
    "Sungai Niger di Afrika Barat adalah salah satu sungai terpanjang di benua tersebut.",
    "Sungai Danube adalah sungai terpanjang kedua di Eropa.",
    "Pulau Greenland adalah pulau terbesar di dunia.",
    "Bentang Alam Grand Canyon di Amerika Serikat terbentuk oleh Sungai Colorado.",
    "Gurun Kalahari di Afrika adalah salah satu gurun pasir terbesar di dunia.",
    "Gunung Kilimanjaro di Tanzania memiliki puncak salju meskipun terletak di khatulistiwa.",
    "Pantai Great Ocean di Australia terkenal dengan formasi batu karang The Twelve Apostles.",
    "Sungai Indus di Asia Selatan adalah sungai terpanjang kedua di Pakistan.",
    "Danau Tanganyika di Afrika adalah danau terdalam kedua di dunia.",
    "Pulau Socotra di Yaman adalah rumah bagi sejumlah tumbuhan dan hewan langka.",
    "Taman Nasional Serengeti di Tanzania terkenal dengan migrasi besar-besaran hewan liar.",
    "Pulau Fiji di Pasifik terkenal dengan terumbu karangnya yang indah."

  ];
  
  // Fungsi untuk mengambil fakta acak dari array
  function generateRandomFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
  }


const Piket = `\n🧹🗑️ BESOK YANG PIKET HARI *${hariBesok}!* ${jadwalPiket} \n 📘 *Note!* \n Tidak Piket Maka denda Sebesar Rp.30.000.`
const information = `\n 📘 *Note!* \n _*(text ini di buat secara otomatis oleh system, jika ada kesalahan dalam jadwal mohon untuk di ralat.)*_`

const Pesan = async () => {
    if (hariBesok == "Minggu") {
        return `${tanggal}\n BESOK LIBOORR`
    } else {
        const Jadwal = await jadwal(hariBesok)
        const PRBesok = await PR()
        const randomFact = generateRandomFact();
        console.log(randomFact);
        const Fact = `\n *Fakta Menarik!* \n Apakah Kamu Tahu? ${randomFact}`
        const DataPR = `\n *PR UNTUK BESOK~* \n ${PRBesok} \n 📘 *Note!* \n  _*pr ini muncul ketika anda mengisi nya di link berikut: https://isipr.vercel.app silahkan isi setiap kali ada pr baru!*_`
        return `${tanggal}\n \n${Seragam} \n ${Jadwal} \n${DataPR} \n ${Piket} \n${Fact} \n${information}`
    }
};
module.exports = Pesan;