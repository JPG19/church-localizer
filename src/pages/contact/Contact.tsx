import { useState, useContext } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

import { MyContext } from '../../../src/pages/_app';

const Contact = () => {
  const { currentPosition } = useContext(MyContext);
  const [result, setResult] = useState<boolean>(false);
  const [mapPosition, setMapPosition] = useState<any>({
    lat: currentPosition.lat || 0,
    lng: currentPosition.lng || 0
  });
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAIL_JS_ADD_TEMPLATE || '',
        e.target,
        process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
      )
      .then(
        (result: any) => {
          console.log(result.text);
        },
        (error: any) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    setResult(true);
    setTimeout(() => {
      setResult(false);
    }, 4000);
  };

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    height: '400px',
    margin: '25px auto',
  };

  const handleMapClick = (e: any) => {
    // Update the marker's position to the clicked location
    setMapPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <div className='min-h-screen grid justify-center items-center'>
      <motion.form
        initial='hidden'
        animate='visible'
        variants={variants}
        transition={{
          duration: 1,
        }}
        onSubmit={sendEmail}
        className='grid gap-4 max-w-lg p-5'
        style={{ width: '450px' }}
      >
        <h2 style={{ color: 'white', fontWeight: '800' }}>
          Contacta con nosotros!
        </h2>
        <p className='text-white'>
          Conoces alguna iglesia que no esta en esta lista? Pone sus datos aca
          para poder tenerla registrada y vemos si la podemos agregar.
        </p>

        <label>Tu nombre</label>
        <input type='text' name='yourName' required />

        <label>Tu correo</label>
        <input type='text' name='yourEmail' required />

        <label>Nombre de la Iglesia</label>
        <input type='text' name='churchName' required />

        <label>Direccion de la iglesia</label>
        <input hidden name="churchLocation" value={`${mapPosition.lat}, ${mapPosition.lng}`} />
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapPosition}
            zoom={10}
            onClick={handleMapClick}
          >
            <MarkerF position={mapPosition} />
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}

        <input
          style={{ cursor: 'pointer' }}
          type='submit'
          value='Enviar'
          disabled={result ? true : false}
        />
        {result ? <p className='text-white'>Solicitud enviada</p> : null}
      </motion.form>
    </div>
  );
};

Contact.displayName = 'pages/Contact';

export default Contact;
