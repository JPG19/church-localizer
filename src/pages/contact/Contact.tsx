import { useState } from 'react';
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";


const Contact= () => {
  const [result, setResult] = useState<boolean>(false);

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_v4s4s0c",
        "template_bo8puyf",
        e.target,
        "user_Was8UVU8a8NC590sUl9s5"
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
    minHeight: '100vh',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const formStyle = {
    display: 'grid',
    width: '650px',
    padding: "20px"
  }

  return (
    <div className='contact-form-container' style={containerStyle}>
        <motion.form
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{
            duration: 1,
          }}
          onSubmit={sendEmail}
          style={formStyle}
        >
          <h2>Contact Juan Pablo</h2>
          <label>Name: </label>
          <input type="text" name="fullName" required />

          <label>Email: </label>
          <input type="email" name="email" required />

          <label>Message: </label>
          <textarea name="message" required />
          <input type="submit" value="Send" disabled={result ? true : false} />
          {result && "Email was sent"}
        </motion.form>
    </div>
  );
};

Contact.displayName = "components/Contact";

export default Contact;
