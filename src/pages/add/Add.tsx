import { useState, useContext } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

import { MyContext } from '../../../src/pages/_app';

const Add = () => {
  const { currentPosition } = useContext(MyContext);
  const [result, setResult] = useState<boolean>(false);
  const [images, setImages] = useState<any>([]);
  const [priests, setPriests] = useState<any>([]);
  const [mapPosition, setMapPosition] = useState<any>({
    lat: currentPosition.lat || 0,
    lng: currentPosition.lng || 0,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const containerStyle = {
    width: '100%',
    maxWidth: '1400px',
    height: '400px',
    margin: '25px auto',
  };

  const addChurch = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('Reviews', {} as any);
    formData.append('SocialLinks', {} as any);
    formData.append('Location', `${mapPosition.lat}, ${mapPosition.lng}`);

    // Check if the checkbox is unchecked and, if so, add it to the formData with a value of false
    if (!formData.has('Baptism')) {
      formData.append('Baptism', false as any);
    }
    if (!formData.has('Confirmation')) {
      formData.append('Confirmation', false as any);
    }
    if (!formData.has('FirstCommunion')) {
      formData.append('FirstCommunion', false as any);
    }
    if (!formData.has('Wedding')) {
      formData.append('Wedding', false as any);
    }

    const imageInputContainer = document.getElementById('images-container');
    const inputElements = imageInputContainer
      ? imageInputContainer.querySelectorAll('input')
      : [];

    const imagesArray: any = [];

    inputElements.forEach((input) => {
      imagesArray.push(input.value);
    });
    formData.append('Images', imagesArray);

    const priestInputContainer = document.getElementById('priests-container');
    const priestInputElements = priestInputContainer
      ? priestInputContainer.querySelectorAll('input')
      : [];

    const priestsArray: any = [];

    priestInputElements.forEach((input) => {
      priestsArray.push(input.value);
    });
    formData.append('Priests', priestsArray);

    const jsonObject: any = {};

    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    // You now have the form data as a JSON object
    console.log(jsonObject);

    // e.target.reset();
    // setResult(true);
    // setTimeout(() => {
    //   setResult(false);
    // }, 4000);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type based on your API's requirements
      },
      body: JSON.stringify(jsonObject), // Convert data to a JSON string
    };

    const localUrl = 'http://localhost:8000/api/churches/add';
    const prodUrl =
      'https://api-church-localizer.onrender.com/api/churches/add';

    try {
      const response = await fetch(localUrl, options);
      const data = await response.json();
      console.log('🚀 ~ file: Add.tsx:85 ~ addChurch ~ data:', data);
    } catch (e) {
      console.error('POST request failed:', e);
    }
  };

  const addImageInput = () => {
    const clonedImageInputs: any = [...images];
    const inputIndex = clonedImageInputs.length;
    const newButton = (
      <input
        key={`image-${inputIndex}`}
        id={`image-${inputIndex}`}
        type='text'
      />
    );
    clonedImageInputs.push(newButton);
    setImages(clonedImageInputs);
  };

  const addPriestInput = () => {
    const clonedPriestsInputs: any = [...priests];
    const inputIndex = clonedPriestsInputs.length;
    const newButton = (
      <input
        key={`priest-${inputIndex}`}
        id={`priest-${inputIndex}`}
        type='text'
      />
    );
    clonedPriestsInputs.push(newButton);
    setPriests(clonedPriestsInputs);
  };

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleMapClick = (e: any) => {
    // Update the marker's position to the clicked location
    setMapPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <section className='add-section'>
      <form onSubmit={addChurch} className='max-w-7xl mx-auto p-5'>
        <h2 style={{ color: 'white', fontWeight: '800' }}>
          Agrega una Iglesia
        </h2>

        <label>Id </label>
        <input type='text' name='ChurchId' required />

        <label>Nombre </label>
        <input type='text' name='Name' required />

        <label>Telefono</label>
        <input type='phone' name='Phone' required />

        <label>Email</label>
        <input type='email' name='Email' required />

        <label>Schedule</label>
        <input type='text' name='Schedule' required />

        <label>Health Protocol</label>
        <input type='text' name='HealthProtocol' required />

        <label>Capacity</label>
        <input type='number' name='Capacity' required />

        <div className='flex-container'>
          <div className='checkbox-container'>
            <label>Baptism</label>
            <input type='checkbox' name='Baptism' />
          </div>

          <div className='checkbox-container'>
            <label>Wedding</label>
            <input type='checkbox' name='Wedding' />
          </div>

          <div className='checkbox-container'>
            <label>FirstCommunion</label>
            <input type='checkbox' name='FirstCommunion' />
          </div>

          <div className='checkbox-container'>
            <label>Confirmation</label>
            <input type='checkbox' name='Confirmation' />
          </div>
        </div>

        <label>Images:</label>
        <button type='button' onClick={() => addImageInput()}>
          Agregar Imagen
        </button>
        <div className='Image' id='images-container'>
          {images}
        </div>

        <label>Sacerdotes:</label>
        <button type='button' onClick={() => addPriestInput()}>
          Agregar Sacerdote
        </button>
        <div className='Priests' id='priests-container'>
          {priests}
        </div>

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

        <button
          style={{ cursor: 'pointer', width: '100%' }}
          type='submit'
          disabled={result ? true : false}
        >
          Enviar
        </button>
        {result ? <p className='text-white'>Solicitud enviada</p> : null}
      </form>
    </section>
  );
};

Add.displayName = 'pages/Add';

export default Add;
