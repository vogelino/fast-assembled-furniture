import { NextApiRequest, NextApiResponse } from 'next';

type Result = Error | any;
type PromisedMiddlewareSignature = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<(resolve: any, reject: any) => void>;

type MiddlewareSignature = (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (result: Result) => void
) => void;

type InitMiddlewareSignature = (middleware: MiddlewareSignature) => PromisedMiddlewareSignature;

const initMiddleware: InitMiddlewareSignature = (middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
};
