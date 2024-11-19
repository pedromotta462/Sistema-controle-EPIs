import api from "./api";
import { AxiosPromise } from 'axios';
import { useMutation } from '@tanstack/react-query';

export const getAllEPIsRequest = async () => {
  const response = await api.get("/epi");

  return response.data;
};

const removeEPI = async (body: any): AxiosPromise<any> => {
    const response = await api.delete(`/epi/${body.id}`);

    return response.data;
};

const requestEPI = async (body: any): AxiosPromise<any> => {
    const response = await api.get(`/epi/request/${body.id}`);

    return response.data;
};

const devolutionEPI = async (body: any): AxiosPromise<any> => {
    const response = await api.get(`/epi/devolution/${body.id}`);

    return response.data;
};

export const useRemoveEPI = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => removeEPI(body),
        ...rest,
    });

    return mutate;
}

export const useRequestEPI = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => requestEPI(body),
        ...rest,
    });

    return mutate;
}

export const useDevolutionEPI = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => devolutionEPI(body),
        ...rest,
    });

    return mutate;
}
