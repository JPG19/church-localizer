import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { signInWithPopup } from 'firebase/auth';
import Image from 'next/image';

import { auth, provider } from '../../firebaseConfig';
import { MyContext } from '../../../src/pages/_app';

const styles = {
  padding: '16px',
  color: 'white',
  lineHeight: 1.5,
  backgroundColor: 'gray',
};

const navStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

function error(err: any) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10,
};

const Header = () => {
  const { user, setUser, setCurrentPosition } = useContext(MyContext);

  const login = () => {
    signInWithPopup(auth, provider).then((data: any) => {
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
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
          console.log(
            'my position:',
            position
          );
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        error,
        options
      );
    }
  }, [setCurrentPosition]);

  return (
    <header style={styles}>
      <nav style={navStyles}>
        <Link href='/'>Inicio</Link>
        {/* <Link href='/contact'>
        Contact
      </Link> */}
        {user.displayName ? (
          <button onClick={logout}>Cerrar Sesion</button>
        ) : (
          <button onClick={login}>Iniciar Sesion con Gmail</button>
        )}

        {user.displayName ? (
          <Image
            src={user.providerData[0].photoURL}
            width={45}
            height={45}
            alt='User thumbnail'
            style={{ borderRadius: '50%', marginLeft: 'auto' }}
          />
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
