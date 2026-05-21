import './CredentialCard.css';

export default function CredentialCard({ credential, verified }) {
  return (
    <article className='credential-card'>
      <div className='card-top'>
        <span className='badge badge-type'>{credential.type}</span>
        <span className={`badge badge-status ${verified ? 'verified' : 'invalid'}`}>
          {verified ? 'Verificado' : 'Inválido'}
        </span>
      </div>

      <h3 className='card-title'>{credential.name}</h3>

      <div className='card-meta'>
        <span className='meta-key'>Emitida por</span>
        <span className='meta-value'>{credential.issuer}</span>
      </div>

      <details className='jwt-details'>
        <summary>Ver JWT</summary>
        <pre>{credential.jwt}</pre>
      </details>
    </article>
  );
}
