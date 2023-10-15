import React from 'react';

const AboutUs = () => {
  return (
    <section className='about-us max-w-7xl mx-auto p-5'>
      <main>
        <div className='introduction'>
          <h3>
            El sistema localizador de iglesias en Paraguay tiene sus inicios en 2023. El impacto del proyecto alcanza a nivel local dentro de la ciudad de Asuncion y esperamos expeandirnos a todo el Paraguay
          </h3>
          <p>
            Somos una congregacion que nacio en el corazón de Dios, y de los
            esfuerzos del equipo administrador quien comenzó este proyecto con la intencion de facilitar obra con estudios biblicos y
            discipulado, a personas de hable hispana.
          </p>
        </div>

        <div className='intro-video'>
            
        <video width="320" height="240" controls>
            <source src="movie.mp4" type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
        </video>


          <p>Un mensaje corto para usted de parte de nuestro administrador Juan Pablo Garcia
          </p>
        </div>

        <div className='mission'></div>
      </main>
    </section>
  );
};

export default AboutUs;
