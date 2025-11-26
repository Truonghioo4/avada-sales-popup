import {Firestore} from '@google-cloud/firestore';
import {presentDataFromDoc} from '@avada/firestore-utils';
const firestore = new Firestore();
const settingsRef = firestore.collection('settings');

/**
 * @param shopId
 * @returns {Promise<any|null>}
 */
export async function getByShopId(shopId) {
  const docs = await settingsRef.where('shopId', '==', shopId).get();
  if (docs.empty) return null;
  const doc = docs.docs[0];
  return presentDataFromDoc(doc);
}

/**
 * @param data
 * @returns {Promise<FirebaseFirestore.WriteResult>}
 */
export async function save(data) {
  return await settingsRef.doc(data.id).update({...data});
}

/**
 * @param shopId
 * @param data
 * @returns {Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>}
 */
export async function create(shopId, data) {
  return await settingsRef.add({shopId, ...data});
}

/**
 * @param shopId
 * @returns {Promise<boolean>}
 */
export async function findByShopId(shopId) {
  const snapshot = await settingsRef.where('shopId', '==', shopId).get();
  return !snapshot.empty;
}
