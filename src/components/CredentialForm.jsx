import { useState } from 'react';

import './CredentialForm.css';

export default function CredentialForm({ onCreate }) {
  const [type, setType] = useState('student');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      type,
      name,
    });

    setName('');
  };

  return (
    <form className='credential-form' onSubmit={handleSubmit}>
      <div className='form-header'>
        <p className='eyebrow'>Nueva credencial</p>
        <h2>Crear credencial</h2>
      </div>

      <label className='form-label'>Nombre completo</label>
      <input
        className='form-control'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Ingresa tu nombre'
        required
      />

      <label className='form-label'>Tipo de credencial</label>
      <select className='form-control' value={type} onChange={(e) => setType(e.target.value)}>
        <option value='student'>Student ID</option>
        <option value='gym'>Gym Membership</option>
        <option value='employee'>Employee Badge</option>
      </select>

      <button className='button-primary' type='submit'>
        Crear credencial
      </button>
    </form>
  );
}
