import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

const slideStyles = {
  borderRadius: '30px 30px 0 0',
  height: '400px',
};

const imageStyle = {
  width: '100%',
  height: '250px',
};

const metadataStyle = {
  padding: '10px',
  color: 'white',
  borderRadius: '0 0 10px 10px',
  height: '80px',
  backgroundColor: '#222222'
};

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = (R * c) / 1000; // in km
  console.log("🚀 ~ file: Churches.tsx:48 ~ d", d)
  return d;
};

function error(err: any) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const Churches = ({ churches, filter }: any) => {
  const [currentPosition, setCurrentPosition] = useState<any>();
  const [filteredChurches, setFilteredChurches] = useState<any>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(
            '🚀 ~ file: Churches.tsx:55 ~ navigator.geolocation.getCurrentPosition ~ position',
            position
          );
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        error,
        options
      );
    }
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredChurches([]);
    }
    if (filter !== 'all') {
      const filterNumber = parseInt(filter);
      const filtered = churches.filter((church: any) => {
        const [churchALatitude, churchALongitude] = church.Location.replaceAll(
          ' ',
          ''
        ).split(',');

        const distance = calculateDistance(
          currentPosition.lat,
          currentPosition.lng,
          churchALatitude,
          churchALongitude
        );
        return distance <= filterNumber;
      });

      setFilteredChurches(filtered);
    }
  }, [filter]);

  const churchesToDisplay = filter !== 'all' ? filteredChurches : churches

  return (
    <Swiper
      // install Swiper modules
      modules={[Grid, Pagination]}
      grid={{
        rows: 2,
        fill: 'row',
      }}
      spaceBetween={30}
      pagination={{ clickable: true }}
      breakpoints={{
        // when window width is >= 80px
        300: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        850: {
          slidesPerView: 2,
          spaceBetween: 30
        }
      }}
    >
      {churchesToDisplay.map((church: any) => {

        const src = church.Images ? church.Images[0] : '/images/placeholder.png';
        return (
          <SwiperSlide key={church.ChurchId} style={slideStyles}>
          <Link href={`/churches/${church.ChurchId}`} key={church.ChurchId}>
            <Image
              src={src}
              alt={church.Name}
              width={200}
              height={100}
              priority={true}
              style={imageStyle}
            />

            <div className='metadata' style={metadataStyle}>
              <h3>{church.Name}</h3>
              <p>{church.Schedule}</p>
            </div>
          </Link>
        </SwiperSlide>
        )
      })}


      {churchesToDisplay.length === 0 ? (
        <h2 style={{
          color: 'white',
          fontSize: '1.2rem',
          opacity: '0.8'
        }}>No Churches in this range</h2>
      ) : null}
    </Swiper>
  );
};

export default Churches;
