import api from "./api";
import { AxiosPromise } from 'axios';
import { useMutation } from '@tanstack/react-query';

export const getAllDevolutionRequest = async () => {
  const response = await api.get("/devolution");

  return response.data;
};

const approveDevolution = async (body: any): AxiosPromise<any> => {
    const response = await api.patch(`/devolution/approve/${body.id}`, body);

    return response.data;
};

export const useApproveDevolutionEPI = (rest: any): any => {
    const mutate = useMutation({
        mutationFn: (body) => approveDevolution(body),
        ...rest,
    });

    return mutate;
}

