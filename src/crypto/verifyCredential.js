import { jwtVerify } from 'jose';

export async function verifyCredential(token, publicKey) {
  try {
    const { payload } = await jwtVerify(token, publicKey);

    return {
      valid: true,
      payload,
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message,
    };
  }
}
