import { AxiosResponse } from 'axios';
import api from '../api';
import { ProducerModel } from '../../providers/models/ProducerModel';

export async function getProducers() {
    const response = await api.get(`producers`);
    return response;
};

export async function postProducer(user: ProducerModel): Promise<AxiosResponse<ProducerModel>> {
    const response = await api.post(`producers`, user);
    return response;
};

export async function getProducer(id: number) {
    const response = await api.get(`producers/${id}`);
    return response;
}

export async function deleteUser(id: number) {
    const response = await api.delete(`Users/${id}`);
    return response;
}

export async function putProducer(user: ProducerModel): Promise<AxiosResponse<ProducerModel>> {
    const response = await api.put(`producers/${user.id}`, user);
    return response;
}