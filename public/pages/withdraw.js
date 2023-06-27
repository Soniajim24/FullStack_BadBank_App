import React, { useState, useEffect, useContext } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
//import firebase from 'firebase/app';
import 'firebase/compat/firestore';
//import firebaseConfig from '../../firebaseConfig';
import LoggedInNavbar from '../components/LoggedInNavbar';
import { UserContext, UserProvider } from '../components/userContext';
import './styles/home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBkGKbPgKdxpPqP37GyxKXh4hWmWs7L9dE",
    authDomain: "badbank-eb5fc.firebaseapp.com",
    projectId: "badbank-eb5fc",
    storageBucket: "badbank-eb5fc.appspot.com",
    messagingSenderId: "351104453657",
    appId: "1:351104453657:web:b5eb8fe4594c28b1152e88"
};

firebase.initializeApp(firebaseConfig);

const db = getFirestore(); // Update this line to use getFirestore()
const BankCollection = collection(db, 'Bank');

// Access the Firestore collection and document

getAuth().onAuthStateChanged(async (user) => {
  if (user) {
    const userEmail = user.email;
    if (userEmail) {
      const db = getFirestore(); // Update this line to use getFirestore()
      const bankCollectionRef = collection(db, 'Bank');
      const q = query(bankCollectionRef, where('Email', '==', userEmail));

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const documentSnapshot = querySnapshot.docs[0];
          const documentRef = doc(db, 'Bank', documentSnapshot.id);
          const documentData = documentSnapshot.data();
          
          const currentBalance = documentData.Balance;
          const newBalance = currentBalance - parseFloat(amount);
          
          await updateDoc(documentRef, { Balance: newBalance });
          console.log('Balance updated successfully');
        }
      } catch (error) {
        console.error('Error updating balance:', error);
      }
    }
  }
});

const Withdraw = () => {
  const { userEmail } = useContext(UserContext);
  const [balance, setBalance] = useState(100);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('User Email: ' + userEmail);
        if (userEmail) {
          // Only fetch data if userEmail is not empty
          const response = await fetch(
            `/api/get-user-by-email?email=${userEmail}`
          );
          if (response.ok) {
            const user = await response.json();
            setUserName(user.name);
            setBalance(user.balance);
            setId(user._id);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userEmail]);
  

  const handleWithdraw = async (event) => {
    event.preventDefault();

    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount)) {
      setErrorMessage('Please enter a valid number');
      setWithdrawAmount(0);
      setSuccessMessage('');
      return;
    }

    if (amount <= 0) {
      setErrorMessage('Cannot withdraw a negative amount');
      setSuccessMessage('');
      return;
    }

    if (amount > balance) {
      setErrorMessage('Insufficient balance');
      setSuccessMessage('');
      return;
    }

    const querySnapshot = await getDocs(query(BankCollection, where('Email', '==', userEmail)));

    if (!querySnapshot.empty) {
      const documentSnapshot = querySnapshot.docs[0];
      const documentRef = documentSnapshot.ref;
  
      try {
        const documentSnapshot = await documentRef.get();
        const currentBalance = documentSnapshot.data().Balance;
        const newBalance = currentBalance - parseFloat(amount);
  
        await documentRef.update({ Balance: newBalance });
        console.log('Balance updated successfully');
      } catch (error) {
        console.error('Error updating balance:', error);
      }
    }
  };
     

   // const collectionRef = firebase.firestore().collection('Bank');
   // const documentRef = collectionRef.doc('IPDD2sEgid7G6VbkFQX2');



  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <Card style={{ width: '24rem', margin: 'auto', marginTop: '2rem', color: 'white', boxShadow: '0 5px 10px rgba(0,0,0,.2)', 
        padding: '1rem', backgroundColor: "#696969", border: '1px solid black'}}>
        <Card.Header className="text-center" style={{ backgroundColor: '#FF1493', color: 'white', fontSize: '1.5rem' }}>Withdraw</Card.Header>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
       
        <Card.Body>
          <Card.Title className='text-center mb-4'>
            Current Balance: ${balance.toFixed(2)}
          </Card.Title>
          <Form onSubmit={handleWithdraw}>
            <Form.Group controlId='withdrawAmount'>
              <Form.Label>Withdraw Amount:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter withdrawal amount'
                value={withdrawAmount}
                onChange={(event) => setWithdrawAmount(event.target.value)}
              />
            </Form.Group>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            {successMessage && <Alert variant='success'>{successMessage}</Alert>}
            <Button 
              className="btn btn-dark mx-auto d-block"
              type='submit' 
              style={{ marginTop: '1rem' }}>
              Withdraw
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
  ;
  }

/* Set the Global User Context to Withdraw Component */
export default function WithdrawWithContext() {
    return (
        <UserProvider>
              <LoggedInNavbar />
            <Withdraw />
        </UserProvider>
    )

    }