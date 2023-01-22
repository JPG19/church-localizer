import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';


const Churches = ({churches}: any) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={3}
      navigation
      pagination={true}
      loop={true}
      scrollbar={{ draggable: true }}
    >
      {churches.map((church: any) => (
        <SwiperSlide key={church.id}>
          <Link href={`/churches/${church.id}`} key={church.id}>
            <Image
              src={church.image}
              alt={church.name}
              width={200}
              height={100}
            />

            <h3>{church.name}</h3>
            <p>{church.address}</p>
            <p>{church.schedule}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Churches;
