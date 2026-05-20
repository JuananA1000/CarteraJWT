import { useState } from 'react';
import { crearCredencial } from '../services/crearCredencial';

export default function EmitirCredencial({ onCredentialAdded }) {
  const [nombre, setNombre] = useState('');
  const [centroEducativo, setCentroEducativo] = useState('');

  const handleCrear = async (e) => {
    e.preventDefault();

    const token = {
      nombre,
      centroEducativo,
    };

    const walletExistente = localStorage.getItem('wallet'); // Obtener la cartera existente
    const actualizarWallet = [...walletExistente, token]; // Agregar nuevo token a la cartera

    localStorage.setItem('wallet', JSON.stringify(actualizarWallet)); // Guardar la cartera actualizada

    onCredentialAdded(token); // Notificar al componente padre que se ha agregado una nueva credencial

    setNombre('');
    setCentroEducativo('');
  };

  return (
    <div>
      <h2>Emitir Credencial</h2>
      <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <input
        type='text'
        placeholder='C. Educativo'
        value={centroEducativo}
        onChange={(e) => setCentroEducativo(e.target.value)}
      />

      <button onClick={handleCrear}>Crear Credencial</button>
    </div>
  );
}
