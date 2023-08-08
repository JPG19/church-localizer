import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const Contact = () => {
  const [result, setResult] = useState<boolean>(false);

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE || '',
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
          Agrega una Iglesia
        </h2>
        <p className='text-white'>
          Conoces alguna iglesia que no esta en esta lista? Pone sus datos aca
          para poder tenerla registrada y vemos si la podemos agregar.
        </p>
        <label>Nombre </label>
        <input type='text' name='fullName' required />

        <label>Telefono</label>
        <input type='phone' name='phone' required />

        <label>Email</label>
        <input type='email' name='email' required />

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

Contact.displayName = 'components/Contact';

export default Contact;
