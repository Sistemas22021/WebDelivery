

import { getFirestore, collection, getDocs, getCount,where, query } from 'firebase/firestore/lite';
import {firebase} from "../../../../firebase"
import { IncomingFirebaseOrder } from '../interfaces/IncomingFirebaseOrder.interface';
import MapOrderDoc from '../mappers/FirebaseDocs.mapper';

export function getDB(){
    return getFirestore(firebase);
}

export function getCollection(coll: string) {
    const db = getDB();
    const docs = collection(db,coll);
    return docs
}

export default async function getOrders(status?: string): Promise<IncomingFirebaseOrder[]> {
    const collection = getCollection('order');
    //const filter = where('status','==',status||'');
    //const actual_query = query(collection,filter)
    const orders = await getDocs(collection);
    return orders.docs.map(order => MapOrderDoc(order.data()));
}

export async function getOrdersCount(type: string): Promise<number> {
    const collection = getCollection('order');
    const filter = where('status','==',type);
    const actual_query  = query(collection,filter);
    const snapshot = await getCount(actual_query);
    return snapshot.data().count;

}