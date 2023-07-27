import { verifySignature } from "../src/C2_utils/higher_level_functions.js";

const rs = verifySignature(
    "0x735b47d8059db2fdd9abc2a4215093af8042f2fd",
    "0xdd298a5f72e1e6eaf73f70bf895af6fa799fc391db4be83f91f4d0d6a0fd218826fa845344464bbcd9366a676e8011cc5f13db2663970592b2359cffc69a0d331b",
    "HELLO1")
console.log(rs);