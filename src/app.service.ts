import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // Firestore'dan kullanıcıları çekme
  async getUsers() {
    const snapshot = await admin.firestore().collection('users').get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // Firestore'dan rezervasyonları çekme
  async getReservations() {
    const snapshot = await admin.firestore().collection('reservations').get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
}
