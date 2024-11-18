import { AxiosPromise } from 'axios';
import api from './api';
import { useMutation } from '@tanstack/react-query';

const loginAdmin = async (body: any): AxiosPromise<any> => {
    const response = await api.post('/auth/login/admin', body);

    return response.data;
};

const loginEmployee = async (body: any): AxiosPromise<any> => {
    const response = await api.post('/auth/login/employee', body);

    return response.data;
};

/*
const recoveryPassword = async (body: any): AxiosPromise<any> => {
    const response = await api.post('/user/recoverypass', body);

    return response.data;
};

const resetPassword = async (body: any): AxiosPromise<any> => {
    const response = await api.patch(`/user/${body.id}`, body.data);

    return response.data;
}
*/

export const useAuthLoginAdmin = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => loginAdmin(body),
        ...rest,
    });

    return mutate;
}

export const useAuthLoginEmployee = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => loginEmployee(body),
        ...rest,
    });

    return mutate;
}


/*
export const useRecoveryPassword = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => recoveryPassword(body),
        ...rest,
    });

    return mutate;
}

export const useResetPassword = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body: any) => resetPassword(body),
        ...rest,
    });

    return mutate;
}
*/
