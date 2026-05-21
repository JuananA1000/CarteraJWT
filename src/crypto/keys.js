import { generateKeyPair } from 'jose';

export async function createIssuerKeys() {
  return await generateKeyPair('ES256');
}
