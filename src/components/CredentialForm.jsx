import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h2>Create Credential</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value='student'>Student ID</option>
        <option value='gym'>Gym Membership</option>
        <option value='employee'>Employee Badge</option>
      </select>

      <button>Create</button>
    </form>
  );
}
