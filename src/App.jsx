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

  function getIssuer(type) {
    switch (type) {
      case 'student':
        return issuers?.university;
      case 'gym':
        return issuers?.gym;
      case 'employee':
        return issuers?.company;
      default:
        return null;
    }
  }

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

    const newCredential = {
      ...payload,
      jwt,
      verified: null,
    };

    const updated = [...credentials, newCredential];

    setCredentials(updated);

    localStorage.setItem('credentials', JSON.stringify(updated));
  }

  async function handleVerifyCredential(index) {
    const credential = credentials[index];
    if (!credential) return;

    const issuer = getIssuer(credential.type);
    if (!issuer) return;

    const verification = await verifyCredential(credential.jwt, issuer.publicKey);
    const updated = [...credentials];
    updated[index] = {
      ...credential,
      verified: verification.valid,
    };

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
    <div id='center' className='app-shell'>
      <header className='hero-panel'>
        <h1 className='title'>Cartera de credenciales con JWT</h1>
      </header>

      <section className='panel panel-form'>
        <CredentialForm onCreate={createCredential} />
      </section>

      <section className='panel panel-list'>
        <div className='panel-header'>
          <h2 className='subtitle'>Mis Credenciales</h2>
        </div>

        <div className='credentials-container'>
          {credentials.length === 0 ? (
            <p className='empty-state'>Aún no tienes credenciales. Crea una para verlas aquí.</p>
          ) : (
            credentials.map((credential, index) => (
              <CredentialCard
                key={index}
                credential={credential}
                verified={credential.verified}
                onVerify={() => handleVerifyCredential(index)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
