import api from "./api";
import { AxiosPromise } from 'axios';
import { useMutation } from '@tanstack/react-query';

export const getAllRemovalRequest = async () => {
  const response = await api.get("/removal");

  return response.data;
};

const approveRemoval = async (body: any): AxiosPromise<any> => {
    const response = await api.patch(`/removal/approve/${body.id}`, body);

    return response.data;
};

export const useApproveRequestEPI = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => approveRemoval(body),
        ...rest,
    });

    return mutate;
}

