
import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

// export const  generateToken = ( ) => {
//     const secret = import.meta.env.VITE_JWT_SECRET
//     const key = Buffer.from(secret, 'hex');
//     let hmacSignature =createHmac('sha256', key).update('Hello').digest('hex');
//     hmacSignature = base64urlm.fromBase64(hmacSignature)
//     return hmacSignature
// }
//and jjwt to verify on my spring boot server.


export const generateToken = ( ) => {

    const payload = { message: 'Hello' };
    const secret = import.meta.env.VITE_JWT_SECRET;
    const options = { expiresIn: '60s' };
    const token = sign(payload, secret, options);
    return token;
}






