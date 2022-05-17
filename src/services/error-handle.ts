import request from 'axios';
import { toast } from 'react-toastify';
import { ErrorType } from '../types/error';
import { HTTP_CODE } from '../utils/const';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        toast.info(error.message);
        break;
      case HTTP_CODE.NOT_FOUND:
        toast.info(error.message);
        break;
    }
  }
};
