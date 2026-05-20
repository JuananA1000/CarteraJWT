import { useState, useEffect } from 'react';
import { decodeJwt } from 'jose';

export default function Wallet({ refresh }) {
  const [credenciales, setCredenciales] = useState([]);

  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem('wallet')) || [];
    setCredenciales(wallet);
  }, [refresh]);

  return (
    <div>
      <h2>Wallet</h2>

      {credenciales.length === 0 ? (
        <p>No hay credenciales emitidas.</p>
      ) : (
        <div>
          {credenciales.map((credencial, index) => {
            const decoded = decodeJwt(credencial);
            return (
              <div
                key={index}
                style={{
                  border: '1px solid gray',
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '10px',
                }}>
                <h3>Credential #{index + 1}</h3>

                <p>
                  <strong>Nombre:</strong> {decoded.name}
                </p>

                <p>
                  <strong>Universidad:</strong> {decoded.university}
                </p>

                <details>
                  <summary>Ver JWT</summary>

                  <textarea rows={6} cols={50} readOnly value={token} />
                </details>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
