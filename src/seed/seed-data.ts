import * as admin from 'firebase-admin';
import * as path from 'path';

// Firebase'i başlatmak
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, 'firebase', 'firebase-service-account.json')),  // JSON dosyasının doğru yolu
    databaseURL: 'https://lumin-947a2.firebaseio.com',  // Firebase database URL'si
  });
} else {
  admin.app(); // Var olan Firebase app'ı kullan
}

// Kullanıcı ve rezervasyon verisi
const users = [
  { username: "admin", password: "hashed_admin_password", role: "admin" },
  ...Array.from({ length: 9 }).map((_, i) => ({
    username: `staff${i + 1}`,
    password: "hashed_staff_password",
    role: "staff",
  })),
];

const reservations = Array.from({ length: 1000 }).map((_, i) => ({
  date: new Date().toISOString(),
  type: i % 2 === 0 ? "flight" : "hotel",
  guests: Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(() => ({
    name: `Guest ${Math.random().toString(36).substring(7)}`,
    age: Math.floor(Math.random() * 50) + 18,
  })),
}));

// Firestore'a veri ekleme fonksiyonu
async function seedFirestore() {
  const db = admin.firestore();

  // Kullanıcıları ekle
  for (const user of users) {
    try {
      await db.collection('users').add(user);
      console.log(`Kullanıcı eklendi: ${user.username}`);
    } catch (error) {
      console.error(`Hata: Kullanıcı eklenemedi - ${user.username}`, error);
    }
  }

  // Rezervasyonları ekle
  for (const reservation of reservations) {
    try {
      await db.collection('reservations').add(reservation);
      console.log(`Rezervasyon eklendi: ${reservation.type}`);
    } catch (error) {
      console.error('Hata: Rezervasyon eklenemedi', error);
    }
  }

  console.log("Veriler başarıyla eklendi.");
}

// Veritabanı işlemini başlat
seedFirestore().catch(console.error);
