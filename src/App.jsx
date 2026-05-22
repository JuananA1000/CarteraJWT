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
      // verified: verification.valid,
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
              <CredentialCard key={index} credential={credential} verified={credential.verified} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
