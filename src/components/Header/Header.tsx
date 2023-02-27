import Link from 'next/link';

const styles = {
  height: '50px',
  padding: '16px',
  color: 'white',
  lineHeight: 1.5,
  backgroundColor: 'gray',
}

const navStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
}

const Header = () => {
  return (
    <header style={styles}>
      <nav style={navStyles}>
      <Link href='/'>
        Home
      </Link>
      <Link href='/contact'>
        Contact
      </Link>
      {/* {!session ? <Link href='/login'>
        Login
      </Link> : null} */}
      
      </nav>
    </header>
  )
}

export default Header