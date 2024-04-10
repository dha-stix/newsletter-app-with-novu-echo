import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection, getDocs, where, query } from "firebase/firestore";

export type SubscribersData = {
  subscriberId: string,
  firstName: string,
  lastName: string,
  email: string,
  id: string
}


//👇🏻 Split full name into first name and last name
export const splitFullName = (fullName: string): [string, string] => {
	const [firstName, ...lastNamePart] = fullName.split(" ");
  return [firstName, lastNamePart.join(" ")];
};

//👇🏻 Handle Sign in with Google and Github
export const handleSignIn = (provider: any, authProvider: any) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = authProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            if (token) {
              const user = result.user;
              const [first_name, last_name] = splitFullName(user.displayName!);
              createNovuSubscriber(first_name, last_name, user.email!)
            }
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({errorCode, errorMessage})
        alert(`An error occurred, ${errorMessage}`)
      });
};

//👇🏻 Uses the user's credentials to create a Novu subscriber
const createNovuSubscriber = async (first_name: string, last_name: string, email:string) => {
  try {
    const request = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, _email: email })
    });
    const response = await request.json();
    saveToFirebase(response.data)

  } catch (err) {
    console.error(err)
  
  }

}

//👇🏻 Save the subscriber data to Firebase
const saveToFirebase = async (subscriberData: SubscribersData) => { 
    try {
      const querySnapshot = await getDocs(collection(db, "subscribers"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email === subscriberData.email) {
          window.location.href = "/subscribe" 
          return;
        }
      });

      const docRef = await addDoc(collection(db, "subscribers"), subscriberData);
      if (docRef.id) {
        window.location.href = "/subscribe"
       }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

//👇🏻 Admin Firebase Sign Up Function

export const adminSignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user) {
      saveAdmin(email, user.uid)
    }
  } catch (e) {
    console.error(e)
    alert("Encountered an error, please try again")
  }
}
 
//👇🏻 Admin Firebase Login Function
export const adminLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user) {
      const q = query(collection(db, "admins"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q)
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      });
      if (data.length) {
        window.location.href = "/admin/dashboard"
        alert("Log in successful!")
      }
    }
  } catch (e) {
    console.error(e)
    alert("Encountered an error, please try again")
  }
}

//👇🏻 Add Admin to Firebase Database
const saveAdmin = async (email: string, uid: string) => { 
    try {
      const docRef = await addDoc(collection(db, "admins"), {email, uid});
      if (docRef.id) {
        alert("Sign up successful!")
        window.location.href = "/admin/dashboard"
       }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

//👇🏻 Admin Firebase Logout Function
export const adminLogOut = async () => {
  signOut(auth)
			.then(() => {
				window.location.replace("/admin")
			})
			.catch((error) => {
				console.error({ error });
				alert("An error occurred, please try again");
			});
}

//👇🏻 Save Newsletter 
export const saveNewsLetter = async ({subject, message, recipients} : {subject: string, message: string, recipients: string[]}) => { 
  try {
    const docRef = await addDoc(collection(db, "newsletters"), { subject, message, recipients });
    if (docRef.id) {
      alert("Newsletter sent successfully!")
      window.location.reload()
     }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


