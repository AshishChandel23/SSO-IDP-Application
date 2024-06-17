import express from 'express';
import { deleteClientApplicationById, getAllregisterAppication, getClientApplicationById, regenrateIdAndSecretByAppId, registerAppication } from './controller';

const Router = express();

Router.post('/registerApplication', registerAppication);
Router.post('/getApplicationById', getClientApplicationById);
Router.post('/deleteApplicationById', deleteClientApplicationById);
Router.post('/regenrateIdAndSecretByAppId', regenrateIdAndSecretByAppId);
Router.post('/getAllApplication', getAllregisterAppication);

export default Router;