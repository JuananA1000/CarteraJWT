import { generateKeyPair } from 'jose';

export default async function createIssuerKeys() {
  return await generateKeyPair('ES256');
}
