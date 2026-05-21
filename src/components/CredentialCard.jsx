export default function CredentialCard({ credential, verified }) {
  return (
    <div
      style={{
        border: '1px solid gray',
        padding: 16,
        marginBottom: 10,
      }}>
      <h3>{credential.type}</h3>

      <p>Name: {credential.name}</p>

      <p>
        Status:
        {verified ? ' ✅ Verified' : ' ❌ Invalid'}
      </p>

      <details>
        <summary>JWT</summary>

        <pre>{credential.jwt}</pre>
      </details>
    </div>
  );
}
