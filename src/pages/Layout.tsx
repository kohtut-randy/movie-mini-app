import { ReactNode, useEffect } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import useAuth from '@/hooks/useAuth'
import LoginForm from '@/component/LoginForm'
import { useRouter } from 'next/router'

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className='min-h-screen flex flex-col gap-10'>{children}</div>
}

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { isLogin } = useAuth()

  const currentPathname = router?.pathname

  useEffect(() => {
    if (!isLogin) {
      router.push('/')
    } else if (currentPathname === '/') {
      router.push('/movie')
    }
  }, [isLogin, currentPathname])

  return (
    <LayoutContainer>
      {isLogin && <Navbar />}

      {isLogin ? <main>{children}</main> : <LoginForm />}

      {isLogin && <Footer />}
    </LayoutContainer>
  )
}
