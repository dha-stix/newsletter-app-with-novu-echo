## Newsletter App with Novu Echo, Firebase, and React Email

## Prerequisites
1. [Firebase project](https://console.firebase.google.com/u/0/) with an active Firestore Database, and enabled Google, [GitHub](https://console.firebase.google.com/u/0), and Email & Password authentication methods.
2. Access your [GitHub developer account.](https://github.com/settings/developers)
3. [Novu account with an API Key](https://web.novu.co/).
4. [Novu Echo](https://docs.novu.co/echo/quickstart#try-it-now)

## Getting Started

1. Clone the repository
2. Install the project dependences
```bash
npm install
```
3. Create a Firebase project and activate the Google, GitHub, and Email & Password authentication methods.
4. You can get your GitHub client ID and secret ID [here](https://github.com/settings/developers).
5. Activate Firestore Database for the Firebase project.
6. Copy your Firebase configuration code into the `firebase.ts` file.
   ```ts
    const firebaseConfig = {
     apiKey: "",
     authDomain: "",
     projectId: "",
     storageBucket: "",
     messagingSenderId: "52130823024",
     appId: "",
     measurementId: ""
   };
   ```
8. Create an `.env.local` file and copy your Novu API key into the file.
   ```.env
    NOVU_API_KEY=<YOUR_NOVU_API_KEY>
    NEXT_PUBLIC_NOVU_API_KEY=<YOUR_NOVU_API_KEY>
   ```
9. Start the development server by running the code snippet below.
   ```bash.
    npm run dev
   ```
10. Set up [Novu Echo](https://docs.novu.co/echo/quickstart#try-it-now) and the workflow URL is `<your_unique_url>/api/email`
     ```bash
     npx novu-labs@latest echo
    ```
11. Ensure, you have set up an Email service provider on your Novu dashboard

    
