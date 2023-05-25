import axios from 'axios';
import { createCanvas, loadImage } from 'canvas';
import tf, { browser, div, log, mod } from '@tensorflow/tfjs-node';
import { loadLayersModel } from '@tensorflow/tfjs-node';

async function loadModel() {
    const modelPath = './resnet50_model_tfjs';
    const model = await loadLayersModel(`file://${modelPath}/model.json`);
    console.log('Model loaded successfully');
    return model;
}
const model = await loadModel();

export async function getEmbeddings(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        const img = await loadImage(buffer);
        const canvas = createCanvas(224, 224);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 224, 224);
        const imageData = ctx.getImageData(0, 0, 224, 224);
        const floatData = new Float32Array(imageData.data);
        const preprocessedData = tf.tensor3d(floatData, [224, 224, 4]);
        const rgbData = preprocessedData.slice([0, 0, 0], [224, 224, 3]);
        const normalizedData = rgbData.div(tf.scalar(255));
        const reshapedData = normalizedData.expandDims(0);
        const embeddings = await model.predict(reshapedData).array();
        const embeddingsArray = embeddings[0];
        const squaredSum = embeddingsArray.reduce((sum, value) => sum + value * value, 0);
        const norm = Math.sqrt(squaredSum);
        const normalizedEmbeddings = embeddingsArray.map((value) => value / norm);
        return normalizedEmbeddings;
    } catch (error) {
        console.error(error);
        return [];
    }
}
// const res = await getEmbeddings("https://gateway.pinata.cloud/ipfs/QmVifjUGN8g1bZxqEdxHPVZUSeReXTRSRDbzd5m4fvKrEP");
// console.log(res);