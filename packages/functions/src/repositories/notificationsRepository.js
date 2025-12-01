import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';
import {getOrderBy, paginateQuery} from '@functions/repositories/helper';

const firestore = new Firestore();
const notificationsRef = firestore.collection('notifications');

/**
 * @param shopId
 * @param query
 * @returns {Promise<{data: *[], total?: number, pageInfo: {hasNext: boolean, hasPre: boolean, totalPage?: number}}>}
 */
export async function getNotifications(shopId, query = {}) {
  const {sortField, direction} = getOrderBy(query?.sort);
  const queriedRef = notificationsRef.where('shopId', '==', shopId)?.orderBy(sortField, direction);
  return paginateQuery(queriedRef, notificationsRef, query);
}

/**
 * @param shopifyDomain
 * @returns {Promise<any[]|null>}
 */
export async function getAllByDomain(shopifyDomain) {
  const querySnapshot = await notificationsRef.where('shopifyDomain', '==', shopifyDomain).get();
  if (querySnapshot.empty) return null;
  return querySnapshot.docs.map(doc => presentDataAndFormatDate(doc));
}

/**
 * @param data
 * @returns {Promise<any>}
 */
export async function add(data) {
  if (Array.isArray(data)) {
    const batch = firestore.batch();
    data.forEach(item => {
      const docRef = notificationsRef.doc();
      batch.set(docRef, item);
    });
    return await batch.commit();
  }
  return await notificationsRef.add(data);
}

/**
 * @param id
 * @returns {Promise<void>}
 */
export async function remove(id) {
  await notificationsRef.doc(id).delete();
}

/**
 * @param shopId
 * @returns {Promise<null>}
 */
export async function removeByShopId(shopId) {
  const querySnapshot = await notificationsRef.where('shopId', '==', shopId).get();
  if (querySnapshot.empty) return null;
  const batch = firestore.batch();
  querySnapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();
}
