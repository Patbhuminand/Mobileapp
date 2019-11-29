import * as firebase from 'firebase';
import '@firebase/firestore';

const config =
{
  apiKey: "AIzaSyAZqPuiCq0d2Jh4y0tKMvEex2XXFbNxdGk",
  authDomain: "my-project-68a2f.firebaseapp.com",
  databaseURL: "https://my-project-68a2f.firebaseio.com",
  projectId: "my-project-68a2f",
  storageBucket: "my-project-68a2f.appspot.com",
  messagingSenderId: "242218964834",
  appId: "1:242218964834:web:0e0ad2b1b9aa16093ebe3b",
  measurementId: "G-DKD8ZXNSYT"
}

class Firebase
{
  constructor()
  {
    if (!firebase.apps.length)
    {
      firebase.initializeApp(config);
      console.log("firebase apps initializeApp");
    }
    else
    {
      console.log("firebase apps already running...");
    }
  }

  login = async(account, success_callback, failed_callback) => {
    await firebase.auth().signInWithEmailAndPassword(account.email,account.password).then(
      function(){
        success_callback();
      }
    ).catch(function(error){
      failed_callback(error.message);
    })
  }

  async signout(Account,add_Account_success,add_Account_fail)
  {
    firebase.auth.signOut();
  }

  async fgp(Account)
  {
    firebase.auth().sendPasswordResetEmail(Account.email);
  }

  async updatePasswordAut(password)
  {

    firebase.auth().currentUser.updatePassword(password);
  }

  async createAccount(Account,add_Account_success,add_Account_fail)
  {
    firebase.firestore().collection("Account").doc(Account.email).set(Account).then(ref=>{add_Account_success(ref.id)},add_Account_fail);
  }

  async createAut(account,createAut_success,createAut_fail)
  {
    firebase.auth().createUserWithEmailAndPassword(account.email,account.password).then(()=>{
      createAut_success()
    }).catch(function(error){
      createAut_fail(error)
    });

  }

  async readOnce(Account,read_Account_success,read_Account_fail)
  {
    let getDoc = firebase.firestore().collection('Account').doc(Account).get().then(doc=>{
      if(doc.exists)
      {
        read_Account_success(doc.data());
      }
      else
      {
        read_Account_fail();
      }
    }).catch(read_Account_fail());
  }

  async updatePassword(Account,newPassword,update_Account_success,update_Account_fail)
  {
    try
    {
        firebase.firestore().collection('Account').doc(Account.email).update({'password': newPassword});
        update_Account_success()
    } catch (e) {
        update_Account_fail();
    }
  }

  async updateFirstname(Account,newFirstname,update_Account_success,update_Account_fail)
  {
    try {
        firebase.firestore().collection('Account').doc(Account.email).update({'firstName': newFirstname});
        update_Account_success();
    } catch (e) {
        update_Account_fail();
    }
  }

  async updateLastname(Account,newLastname,update_Account_success,update_Account_fail)
  {
    try {
        firebase.firestore().collection('Account').doc(Account.email).update({'lastName': newLastname});
        update_Account_success();
    } catch (e) {
        update_Account_fail();
    }
  }

  async uploadImage(id,uri, success_callback, fail_callback,uploading_callback)
  {
    const response = await fetch(uri);
    const blob = await response.blob();

    var uploadTask = firebase.storage().ref('profile_pic').child(id).put(blob);
    uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      uploading_callback(progress)
    }, function(error) {
      fail_callback(error.message);
    },async()=>{
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
        success_callback(downloadURL);
      });
    })
  }
}

const database = new Firebase();
export default database;
