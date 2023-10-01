import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithPopup } from 'firebase/auth';
import emailjs from '@emailjs/browser';
import Image from 'next/image';

import { auth, provider } from '../../firebaseConfig';
import { MyContext } from '../../../src/pages/_app';

function error(err: any) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10,
};

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const { user, setUser, setCurrentPosition } = useContext(MyContext);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((data: any) => {
        console.log('🚀 ~ file: Header.tsx:27 ~ signInWithPopup ~ data:', data);
        const { user } = data;

        // If it's the first login then send a welcome email
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {

          const templateParams = {
            to: user.email,
            name: user.displayName,
          };

          emailjs
            .send(
              process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID || '',
              process.env.NEXT_PUBLIC_EMAIL_JS_WELCOME_TEMPLATE || '',
              templateParams,
              process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY
            )
            .then(
              (result: any) => {
                console.log('email sent: ', result.text);
              },
              (error: any) => {
                console.log(error.text);
              }
            );
        }

        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      })
      .catch((e) => {
        console.log('error:', e);
      });
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
    setUser({});
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageUser: any = JSON.parse(
        localStorage.getItem('user') as string
      );

      if (storageUser) {
        setUser(storageUser);
      }
    }
  }, [setUser]);

  useEffect(() => {
    if (global.navigator.geolocation) {
      global.navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('my position:', position);
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        error,
        options
      );
    }
  }, [setCurrentPosition]);

  return (
    <header className='p-4 text-white'>
      <nav className='flex items-center gap-4'>
        <Link className={`${pathname === '/' ? 'active' : ''}`} href='/'>
          Inicio
        </Link>
        {/* <Link href='/contact'>Contact</Link> */}
        <Link className={`${pathname === '/add' ? 'active' : ''}`} href='/add'>
          Agregar Iglesia
        </Link>
        {user.displayName ? (
          <button style={{ marginLeft: 'auto' }} onClick={logout}>
            Cerrar Sesion
          </button>
        ) : (
          <button style={{ marginLeft: 'auto' }} onClick={login}>
            Iniciar Sesion con Gmail
          </button>
        )}

        {user.displayName ? (
          <Image
            src={user.providerData[0].photoURL}
            width={45}
            height={45}
            alt='User thumbnail'
            style={{ borderRadius: '50%' }}
          />
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
