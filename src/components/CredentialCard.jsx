import employeeIcon from '../svg/employee.svg';
import gymIcon from '../svg/gym.svg';
import studentIcon from '../svg/student.svg';

import './CredentialCard.css';

const icons = {
  employee: employeeIcon,
  gym: gymIcon,
  student: studentIcon,
};

export default function CredentialCard({ credential, verified }) {
  return (
    <article className={`credential-card ${credential.type}`}>
      <div className='card-top'>
        <img src={icons[credential.type]} alt={`${credential.type} icon`}  width={50}/>
        <span className={`badge badge-status ${verified ? 'verified' : 'invalid'}`}>
          {verified ? 'Verificado' : 'Inválido'}
        </span>
      </div>

      <h3 className='card-title'>{credential.name}</h3>

      <details className='jwt-details'>
        <summary>Ver JWT</summary>
        <pre>{credential.jwt.slice(0, 10) + '...'}</pre>
      </details>
    </article>
  );
}
