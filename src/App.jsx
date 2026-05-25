import { useState, useEffect } from 'react';

import CredentialForm from './components/CredentialForm';
import CredentialCard from './components/CredentialCard';

import createIssuers from './data/issuers';

import firmarCredencial from './crypto/signCredential';
import verifyCredential from './crypto/verifyCredential';

import './App.css';

function App() {
  const [emisores, setEmisores] = useState(null);
  const [credenciales, setCredenciales] = useState([]);

  function seleccionarEmisor(tipoEmisor) {
    switch (tipoEmisor) {
      case 'student':
        return emisores?.university;
      case 'gym':
        return emisores?.gym;
      case 'employee':
        return emisores?.company;
      default:
        return null;
    }
  }

  async function crearCredencial(data) {
    if (!emisores) return;

    let emisor;

    switch (data.type) {
      case 'student':
        emisor = emisores.university;
        break;

      case 'gym':
        emisor = emisores.gym;
        break;

      case 'employee':
        emisor = emisores.company;
        break;
    }

    const payload = {
      ...data,
      emisor: data.type,
    };

    const jwt = await firmarCredencial(payload, emisor.privateKey);

    const nuevaCredencial = {
      ...payload,
      jwt,
      verified: null,
    };

    const updated = [...credenciales, nuevaCredencial];

    setCredenciales(updated);

    localStorage.setItem('credentials', JSON.stringify(updated));
  }

  async function handleVerifyCredential(index) {
    const credencial = credenciales[index];
    if (!credencial) return;

    const emisor = seleccionarEmisor(credencial.type);
    if (!emisor) return;

    const verification = await verifyCredential(credencial.jwt, emisor.publicKey);
    const updated = [...credenciales];
    updated[index] = {
      ...credencial,
      verified: verification.valid,
    };

    setCredenciales(updated);
    localStorage.setItem('credentials', JSON.stringify(updated));
  }

  useEffect(() => {
    async function init() {
      const crearEmisores = await createIssuers();

      setEmisores(crearEmisores);
    }

    init();
  }, []);

  return (
    <div id='center' className='app-shell'>
      <header className='hero-panel'>
        <h1 className='title'>Cartera de credenciales con JWT</h1>
      </header>

      <section className='panel panel-form'>
        <CredentialForm onCreate={crearCredencial} />
      </section>

      <section className='panel panel-list'>
        <div className='panel-header'>
          <h2 className='subtitle'>Mis Credenciales</h2>
        </div>

        <div className='credentials-container'>
          {credenciales.length === 0 ? (
            <p className='empty-state'>Aún no tienes credenciales. Crea una para verlas aquí.</p>
          ) : (
            credenciales.map((credencial, index) => (
              <CredentialCard
                key={index}
                credential={credencial}
                verified={credencial.verified}
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
