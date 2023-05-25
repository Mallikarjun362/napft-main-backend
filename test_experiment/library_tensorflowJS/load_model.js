import { loadLayersModel } from '@tensorflow/tfjs-node';

async function loadModel() {
    const modelPath = '/home/mallikarjun/Documents/A3--Complete (Blockchain + WebDev) related work/ibitf_fellowship_project_code/backend_django_napft/recommendation_system/lib/resnet50_model_tfjs';
    const model = await loadLayersModel(`file://${modelPath}/model.json`);
    console.log('Model loaded successfully');
}

loadModel();
