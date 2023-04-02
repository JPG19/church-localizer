// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  return new Promise<void>((resolve, reject) => {

    AWS.config.update({
      region: process.env.NEXT_PUBLIC_DEFAULT_REGION,
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
  
    const docClient = new AWS.DynamoDB.DocumentClient();
  
    const params = {
      TableName: 'Churches',
    };
  
    docClient.scan(params, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.status(400).json(err);
        resolve();
      }
      const { Items } = data;
      res.status(200).json(Items);
      resolve();
    });
  });
}
