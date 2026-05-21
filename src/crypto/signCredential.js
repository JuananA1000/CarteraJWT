import { SignJWT } from 'jose';

export async function signCredential(payload, privateKey) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'ES256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(privateKey);
}
