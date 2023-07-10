import { getFirestore } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { firebase } from "../../../../firebase"
import { NOTIFIER } from "../classes/OrdersNotifier.class";
import MapOrderDoc from "../mappers/FirebaseDocs.mapper";
import MapIncomingFbOrder from "../mappers/MapIncomingFbOrder.mapper";
export default function OnSnapShotNotify() {
    const db = getFirestore(firebase);
    const dbRef = collection(db,'order');
    onSnapshot(dbRef,{ includeMetadataChanges: true } ,(snapshot) => {

        const InComingOrders = snapshot.docs.map(element => MapOrderDoc(element.data()));
        const Orders = InComingOrders.map(order => MapIncomingFbOrder(order))
        NOTIFIER.notify(Orders);
    });
}