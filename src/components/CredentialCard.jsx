import employeeIcon from '../svg/employee.svg';
import gymIcon from '../svg/gym.svg';
import studentIcon from '../svg/student.svg';
import copyIcon from '../svg/copy.svg';

import Tooltip from './Tooltip';

import './CredentialCard.css';

const icons = {
  employee: employeeIcon,
  gym: gymIcon,
  student: studentIcon,
  copy: copyIcon,
};

export default function CredentialCard({ credential, verified, onVerify }) {
  const statusLabel = verified === null ? 'Pendiente' : verified ? 'Verificado' : 'Inválido';
  const statusClass = verified === null ? 'pending' : verified ? 'verified' : 'invalid';

  function copiarJWT() {
    navigator.clipboard.writeText(credential.jwt);
    alert('JWT copiado al portapapeles');
  }

  return (
    <article className={`credential-card ${credential.type}`}>
      <div className='card-top'>
        <Tooltip text={`Credencial de ${credential.type}`}>
          <img src={icons[credential.type]} alt={`${credential.type} icon`} width={50} />
        </Tooltip>

        <button className={`badge badge-status ${statusClass}`} onClick={onVerify}>
          {statusLabel}
        </button>
      </div>

      <h3 className='card-title'>{credential.name}</h3>

      <details className='jwt-details'>
        <summary>Ver JWT</summary>
        <pre>
          {credential.jwt.slice(0, 10) + '...'}
          <img src={icons.copy} alt={'copy icon'} width={20} onClick={copiarJWT} />
        </pre>
      </details>
    </article>
  );
}
