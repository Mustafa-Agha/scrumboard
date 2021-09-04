import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';

import { FIREBASE_CONFIG } from 'common/enums';

class FirebaseService {
  public static instance: FirebaseService;

  public app: FirebaseApp;
  public analytics: Analytics;

  constructor(firebaseConfig: typeof FIREBASE_CONFIG) {
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    FirebaseService.instance = this;
  }

  public signInEmailRequest = ({ email, password }: {[key: string]: string}) => {
    return new Promise(async resolve => {
      try {
        const auth = getAuth();
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        return resolve({ status: 'success', data: userCredential.user });
      } catch (err: any) {
        return resolve({ status: 'fail', msg: err.message });;
      }
    });
  };

  public signUpEmailRequest = ({ email, password }: {[key: string]: string}) => {
    return new Promise(async resolve => {
      try {
        const auth = getAuth();
        let userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return resolve({ status: 'success', data: userCredential.user });
      } catch (err: any) {
        return resolve({ status: 'fail', msg: err.message });;
      }
    });
  };

  public signOutRequest = () => {};
  public signInGoogleRequest = () => {};
  public signInFacebookRequest = () => {};
}

export default new FirebaseService(FIREBASE_CONFIG);
