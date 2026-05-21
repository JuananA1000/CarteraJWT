import { createIssuerKeys } from '../crypto/keys';

export async function createIssuers() {
  const university = await createIssuerKeys();
  const gym = await createIssuerKeys();
  const company = await createIssuerKeys();

  return {
    university,
    gym,
    company,
  };
}
