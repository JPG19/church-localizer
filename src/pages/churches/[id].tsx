import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

import { ChurchType } from '../../components/types';

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/churches');
  const churches: any = await res.json();

  const paths = churches?.map((church: any) => ({
    params: { id: church.ChurchId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/churches/${id}`);
  console.log('res: ', res);
  console.log('url: ', `http://localhost:3000/api/churches/${id}`);
  const church: any = await res.json();

  return {
    props: {
      church,
    },
  };
};

const imageStyle = {
  width: '100%',
  height: '350px',
};

const Church = ({ church }: { church: ChurchType }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  const isSmallMobile = useMediaQuery({ query: '(max-width: 450px)' })
  console.log("🚀 ~ file: [id].tsx:52 ~ Church ~ isSmallMobile", isSmallMobile)


  const containerStyle = {
    width: isSmallMobile ? '100%' : '400px',
    height: '400px',
    margin: '25px auto',
  };

  const position = useMemo(() => {
    const [latString, lngString] = church.Location.split(',');
    return {
      lat: parseFloat(latString),
      lng: parseFloat(lngString),
    };
  }, [church]);

  if (!isLoaded) return <div>Loading...</div>;

  console.log('church: ', church);
  const src = church.Images ? church.Images[0] : '/images/placeholder.png';

  return (
    <main>
      <Image
        src={src}
        alt={church.Name}
        width={400}
        height={300}
        priority={true}
      />

      <div className='metadata'>
        <h3 style={{ color: 'white' }}>{church.Name}</h3>

        <label>Horario</label>
        <p style={{ color: 'white' }}>{church.Schedule}</p>

        <label>Capacidad</label>
        <p style={{ color: 'white' }}>{church.Capacity}</p>

        <label>Protocolo de salud</label>
        <p style={{ color: 'white' }}>{church.HealthProtocol}</p>

        <label>Bautismo</label>
        <p style={{ color: 'white' }}>{church.Baptism}</p>

        <label>Primera Comunión</label>
        <p style={{ color: 'white' }}>{church.FirstCommunion}</p>

        <label>Confirmación</label>
        <p style={{ color: 'white' }}>{church.Confirmation}</p>

        <label>Boda</label>
        <p style={{ color: 'white' }}>{church.Wedding}</p>

        <label>Sacerdote</label>
        <p style={{ color: 'white' }}>{church.Priests}</p>

        <label>Teléfono</label>
        <p style={{ color: 'white' }}>{church.Phone}</p>

        <label>Correo Electronico</label>
        <p style={{ color: 'white' }}>{church.Email}</p>
      </div>

      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={10}
        >
          <MarkerF position={position} />
          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Church;
