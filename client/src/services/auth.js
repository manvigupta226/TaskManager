import axios from 'axios';

const LAMBDA_LOGIN = 'https://<YOUR_API_GATEWAY_URL>/login';

export const loginViaLambda = async (email, password) => {
  // Frontend calls lambda; lambda returns a JWT on success (or your desired response)
  const res = await axios.post(LAMBDA_LOGIN, { email, password });
  return res.data; // expected { token, user }
};
