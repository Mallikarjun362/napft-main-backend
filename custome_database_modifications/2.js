import axios from 'axios';
import { django_rs_endpoint_url } from '../src/C2_utils/constants.js';

const a = await axios.post(django_rs_endpoint_url,{ image_URL: "https://gateway.pinata.cloud/ipfs/QmbwJMG1Z5sqXejhYkbxsJq813gqs6dDoY7x2VRngNLA2X" }).then((response) => response.data.embeddings);
console.log(a);