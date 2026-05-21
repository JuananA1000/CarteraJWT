import { useState, useEffect } from 'react';

import CredentialForm from './components/CredentialForm';
import CredentialCard from './components/CredentialCard';

import createIssuers from './data/issuers';

import signCredential from './crypto/signCredential';
import verifyCredential from './crypto/verifyCredential';

import './App.css';

function App() {
  const [issuers, setIssuers] = useState(null);
  const [credentials, setCredentials] = useState([]);

  async function createCredential(data) {
    if (!issuers) return;

    let issuer;

    switch (data.type) {
      case 'student':
        issuer = issuers.university;
        break;

      case 'gym':
        issuer = issuers.gym;
        break;

      case 'employee':
        issuer = issuers.company;
        break;
    }

    const payload = {
      ...data,
      issuer: data.type,
    };

    const jwt = await signCredential(payload, issuer.privateKey);

    const verification = await verifyCredential(jwt, issuer.publicKey);

    const newCredential = {
      ...payload,
      jwt,
      verified: verification.valid,
    };

    const updated = [...credentials, newCredential];

    setCredentials(updated);

    localStorage.setItem('credentials', JSON.stringify(updated));
  }

  useEffect(() => {
    async function init() {
      const generatedIssuers = await createIssuers();

      setIssuers(generatedIssuers);
    }

    init();
  }, []);

  return (
    <div id='center'>
      <h1 className='title'>Cartera de credenciales con JWT</h1>

      <CredentialForm onCreate={createCredential} />

      <hr />

      <h2 className='subtitle'>Mis Credenciales</h2>
      {credentials.map((credential, index) => (
        <CredentialCard key={index} credential={credential} verified={credential.verified} />
      ))}
    </div>
  );
}

export default App;
