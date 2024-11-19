import { AxiosPromise } from 'axios';
import api from './api';
import { useMutation } from '@tanstack/react-query';

const registerEPI = async (body: any): AxiosPromise<any> => {
    const response = await api.post('/epi', body);

    return response.data;
};

export const useRegisterEPI = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => registerEPI(body),
        ...rest,
    });

    return mutate;
}
