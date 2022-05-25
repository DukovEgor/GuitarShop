import request from 'axios';
import { toast } from 'react-toastify';
import { ErrorType } from '../types/error';
import { HttpCode } from '../utils/const';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        toast.info(error.message);
        break;
      case HttpCode.NotFound:
        toast.info(error.message);
        break;
    }
  }
};
