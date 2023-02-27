import { useMemo } from 'react';
import Image from 'next/image';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

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
  const church: any = await res.json();

  return {
    props: {
      church,
    },
  };
};

const mainStyle = {
  padding: '20px',
};

const metadataStyle = {
  paddingTop: '20px',
}

const titleStyle = {
  fontSize: '2rem',
  color: 'white'
}

const Church = ({ church }: { church: ChurchType }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
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

  return (
    <main style={mainStyle}>
      <Swiper
        // install Swiper modules
        className='church-swiper'
        slidesPerView={3}
        modules={[Pagination]}
        spaceBetween={30}
        pagination={{ clickable: true }}
      >
        {church.Images.map((src: string, index) => (
          <SwiperSlide key={church.ChurchId}>
            <Image
              key={index}
              src={src}
              alt={church.Name}
              width={400}
              height={400}
              priority={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='metadata' style={metadataStyle}>
        <h2 style={titleStyle}>{church.Name}</h2>

        <label>Horario</label>
        <p>{church.Schedule}</p>

        <label>Capacidad</label>
        <p>{church.Capacity}</p>

        <label>Protocolo de salud</label>
        <p>{church.HealthProtocol}</p>

        <div className='flex-container'>
          <label>Bautismo</label>
          <input
            style={{ width: 'auto', transform: 'scale(1.5)' }}
            type='checkbox'
            checked={church.Baptism}
          />
        </div>

        <div className='flex-container'>
          <label>Primera Comunión</label>
          <input
            style={{ width: 'auto', transform: 'scale(1.5)' }}
            type='checkbox'
            checked={church.FirstCommunion}
          />
        </div>

        <div className='flex-container'>
          <label>Confirmación</label>
          <input
            style={{ width: 'auto', transform: 'scale(1.5)' }}
            type='checkbox'
            checked={church.Confirmation}
          />
        </div>

        <div className='flex-container'>
          <label>Boda</label>
          <input
            style={{ width: 'auto', transform: 'scale(1.5)' }}
            type='checkbox'
            checked={church.Wedding}
          />
        </div>

        <label>Sacerdote</label>
        <p>{church.Priests}</p>

        <label>Teléfono</label>
        <p>{church.Phone}</p>

        <label>Correo Electronico</label>
        <p>{church.Email}</p>
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
