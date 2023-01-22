import Image from 'next/image';
import { ChurchType } from '../../components/types';

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/churches');
  const churches: any = await res.json();

  const paths = churches.map((church: any) => ({
    params: { id: church.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(
    `http://localhost:3000/api/churches/${id}`
  );
  console.log('res: ', res);
  console.log('url: ', `http://localhost:3000/api/churches/${id}`);
  const church: any = await res.json();

  return {
    props: {
      church,
    },
  };
};


const Church = ({church}: { church: ChurchType }) => {
  return (
    <>
    <h2>Church</h2>
      <Image src={church.image} alt={church.name} width={200} height={100} />

      <h3>{church.name}</h3>
      <p>{church.address}</p>
      <p>{church.schedule}</p>
    </>
  );
};

export default Church;