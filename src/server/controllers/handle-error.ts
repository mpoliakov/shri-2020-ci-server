import {Response} from 'express';
import {ResponseStatus as Status} from '../const';

export default (res: Response, err: any) => {
  if (err.response) {
    console.error(err.response.data);
    return res.status(err.response.status).json(err.response.data);
  }

  console.error(err.message);
  return res.status(Status.INTERNAL_SERVER_ERROR).json(err.message);
}
