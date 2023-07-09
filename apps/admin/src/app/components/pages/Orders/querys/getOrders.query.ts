

import { getFirestore, collection, getDocs, getCount } from 'firebase/firestore/lite';
import {firebase} from "../../../../firebase"
import { IncomingFirebaseOrder } from '../interfaces/IncomingFirebaseOrder.interface';
import MapOrderDoc from '../mappers/FirebaseDocs.mapper';

function getCollection(coll: string) {
    const db = getFirestore(firebase);
    const docs = collection(db,coll);
    return docs
}

export default async function getOrders(): Promise<IncomingFirebaseOrder[]> {
    const orders_collection = getCollection('order');
    const orders = await getDocs(orders_collection);
    return orders.docs.map(order => MapOrderDoc(order.data()));
}

export async function getOrdersCount(type: string) {
    const collection = getCollection('order');
    const snapshot = await getCount(collection);
    return snapshot.data();

}