import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

type Data = {
  name: string;
};

export default function handler(req: any, res: any) {
  const { id } = req.query;

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
    } else {
      const { Items } = data;
      const church = Items?.find((iglesia) => {
        return iglesia?.ChurchId?.toString() === id.toString();
      });

      res.status(200).json(church);
    }
  });
}
