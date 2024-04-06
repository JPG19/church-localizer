import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation, Pagination } from 'swiper';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ChurchIcon from '@mui/icons-material/Church';
import { useEffect, useState } from 'react';

const Slider = ({ content = [] }: any) => {
    const [sliderContent, setSliderContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSliderContent([]);
        // setIsLoading(true);

        setTimeout(() => {
            setSliderContent(content);
            // setIsLoading(false);
        }, 50);
    }, [content]);

    return (
        <>
            {isLoading ?
                <div className="spinner-container">
                    {isLoading && <div className="spinner"></div>}
                    {/* Your content goes here */}
                </div>


                : <Swiper
                    // install Swiper modules
                    modules={[Grid, Pagination, Navigation]}
                    grid={{
                        rows: 2,
                        fill: 'row',
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        300: {
                            slidesPerView: 1,
                        },
                        850: {
                            slidesPerView: 2,
                        },
                    }}
                    spaceBetween={30}
                >
                    {sliderContent.map((church: any) => {
                        const src = church.Images
                            ? church.Images[0]
                            : '/images/placeholder.png';
                        return (
                            <SwiperSlide className='rounded-tl-3xl' key={church.ChurchId}>
                                <Link href={`/churches/${church.ChurchId}`}>
                                    <Image
                                        src={src}
                                        alt={church.Name}
                                        width={200}
                                        height={300}
                                        priority={true}
                                        style={{ height: '300px', width: '100%' }}
                                    />
                                    <div className='p-2 text-white rounded-b-lg h-20 bg-red-900'>
                                        <h3>
                                            <ChurchIcon /> {church.Name}
                                        </h3>
                                        <p>
                                            <AccessTimeFilledIcon /> {church.Schedule}
                                        </p>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>}

        </>

    );
};

export default Slider;
