import { AxiosPromise } from 'axios';
import api from './api';
import { useMutation } from '@tanstack/react-query';

const signUpEmployee = async (body: any): AxiosPromise<any> => {
    const response = await api.post('/auth/signup/employee', body);

    return response.data;
};

export const useSignUpEmployee = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => signUpEmployee(body),
        ...rest,
    });

    return mutate;
}
