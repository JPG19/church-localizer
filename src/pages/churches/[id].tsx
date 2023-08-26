import { useState, useMemo, useContext } from 'react';
import Image from 'next/image';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useMediaQuery } from 'react-responsive';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { MyContext } from '../../../src/pages/_app';
import { ChurchType } from '../../components/types';

export const getStaticPaths = async () => {
  const res = await fetch(
    `https://api-church-localizer.onrender.com/api/churches`
  );
  const churches: any = await res.json();

  const paths = churches?.map((church: any) => ({
    params: { id: church.ChurchId, data: churches },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(
    `https://api-church-localizer.onrender.com/api/churches/` + id
  );
  const church = await res.json();

  return {
    props: {
      church,
    },
  };
};

const Church = ({ church }: { church: ChurchType }) => {
  const [reviews, setReviews] = useState(church.Reviews || []);
  console.log("🚀 ~ file: [id].tsx:47 ~ Church ~ reviews:", reviews)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    height: '400px',
    margin: '25px auto',
  };

  const biggerThanLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  const slidesPerView = useMemo(() => {
    if (biggerThanLaptop) return 3;
    return 1;
  }, [biggerThanLaptop]);

  const position = useMemo(() => {
    const [latString, lngString] = church.Location.split(',');
    return {
      lat: parseFloat(latString),
      lng: parseFloat(lngString),
    };
  }, [church]);

  const { user } = useContext(MyContext);

  // function that updates dynamo table
  function sendReview() {
    // @ts-ignore
    const comment = document.getElementById('review')?.value;
    console.log("🚀 ~ file: [id].tsx:80 ~ sendReview ~ comment:", comment)
    const existingReviews = church?.Reviews || [];
    const url = `https://api-church-localizer.onrender.com/api/churches/${church.ChurchId}`;

    console.log("🚀 ~ file: [id].tsx:81 ~ sendReview ~ url:", url)
    console.log('user.displayName: ', user.displayName);
    const reviews = [
      ...existingReviews,
      {
        name: user.displayName,
        comment,
      },
    ];

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviews,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        setReviews(reviews);
      });
  }

  const hasAlreadyCommented = useMemo(() => {
    if (!user) return false;
    return reviews?.some((review) => review.name === user.displayName);
  }, [reviews, user]);

  const isLoggedIn = Object.keys(user || {})?.length > 0;

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <main className='p-5 max-w-7xl mx-auto'>
        <Swiper
          // install Swiper modules
          className='church-swiper'
          slidesPerView={slidesPerView}
          modules={[Pagination]}
          spaceBetween={30}
          pagination={{ clickable: true }}
        >
          {church.Images.map((src: string, index) => (
            <SwiperSlide key={index}>
              <Image
                src={src}
                alt={church.Name}
                width={400}
                height={400}
                priority={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className='pt-5'>
          <h2 className='text-2xl text-white'>{church.Name}</h2>

          <div className='grid-container'>
            <div className='grid-item'>
              <h3>Horario</h3>
              <p>{church.Schedule}</p>
            </div>

            <div className='grid-item'>
              <h3>Capacidad</h3>
              <p>{church.Capacity}</p>
            </div>

            <div className='grid-item'>
              <h3>Protocolo de salud</h3>
              <p>{church.HealthProtocol}</p>
            </div>

            <div className='grid-item row'>
              <h3>Bautismo</h3>
              <div>
                <input
                  style={{ width: 'auto', transform: 'scale(1.5)' }}
                  type='checkbox'
                  disabled={true}
                  defaultChecked={church.Baptism}
                />
              </div>
            </div>

            <div className='grid-item row'>
              <h3>Primera Comunión</h3>
              <div>
                <input
                  style={{ width: 'auto', transform: 'scale(1.5)' }}
                  type='checkbox'
                  disabled={true}
                  defaultChecked={church.FirstCommunion}
                />
              </div>
            </div>

            <div className='grid-item row'>
              <h3>Confirmación</h3>
              <div>
                <input
                  style={{ width: 'auto', transform: 'scale(1.5)' }}
                  type='checkbox'
                  disabled={true}
                  defaultChecked={church.Confirmation}
                />
              </div>
            </div>

            <div className='grid-item row'>
              <h3>Boda</h3>
              <div>
                <input
                  style={{ width: 'auto', transform: 'scale(1.5)' }}
                  type='checkbox'
                  disabled={true}
                  defaultChecked={church.Wedding}
                />
              </div>
            </div>

            <div className='grid-item'>
              <h3>Sacerdotes</h3>
              <p>{church.Priests}</p>
            </div>

            <div className='grid-item'>
              <h3>Teléfono</h3>
              <p>{church.Phone}</p>
            </div>

            <div className='grid-item'>
              <h3>Correo Electronico</h3>
              <p>{church.Email}</p>
            </div>
          </div>
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

        <div className='reviews'>
          <h3>Reseñas</h3>

          {reviews.length === 0 ? (
            <p>No hay reseñas</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className='review bg-red-900'>
                <h4>{review.name}</h4>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {hasAlreadyCommented ? null : isLoggedIn ? (
          <div className='comment-section'>
            <label>Dejar una reseña:</label>

            <textarea id='review' />

            <button onClick={() => sendReview()}>Enviar</button>
          </div>
        ) : null}
      </main>
    </>
  );
};

export default Church;
