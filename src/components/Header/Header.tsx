import Link from 'next/link';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

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
  const session = useSession()

  return (
    <header style={styles}>
      <nav style={navStyles}>
      <Link href='/'>
        Home
      </Link>
      <Link href='/contact'>
        Contact
      </Link>
      {!session ? <Link href='/login'>
        Login
      </Link> : null}
      
      </nav>
    </header>
  )
}

export default Header