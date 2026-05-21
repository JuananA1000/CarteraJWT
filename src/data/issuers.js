import { createIssuerKeys } from '../crypto/keys';

export default async function createIssuers() {
  const university = await createIssuerKeys();
  const gym = await createIssuerKeys();
  const company = await createIssuerKeys();

  return {
    university,
    gym,
    company,
  };
}
