import { AxiosPromise } from 'axios';
import api from './api';
import { useMutation } from '@tanstack/react-query';

const sendPicture = async (file: File): AxiosPromise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/image-uploader/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const useChangeProfilePicture = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (file: File) => sendPicture(file),
        ...rest,
    });

    return mutate;
};