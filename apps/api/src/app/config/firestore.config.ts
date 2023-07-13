import { FireormSettings } from "nestjs-fireorm";


export default  (): FireormSettings => ({
    fireormSettings: {validateModels: true},
    firestoreSettings: {
        projectId: process.env.FIRESTORE_PROJECT_ID,
        credentials: {
            client_email: process.env.FIRESTORE_CLIENT_EMAIL,
            private_key:  process.env.FIRESTORE_PRIVATE_KEY.split(String.raw`\n`).join("\n")
        }
    }
})