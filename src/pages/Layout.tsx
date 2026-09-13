import { ReactNode } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import useAuth from '@/hooks/useAuth'

export default function Layout({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return (
    <div className='min-h-screen flex flex-col gap-10'>
      {auth.isLogin && <Navbar />}
      <main>{children}</main>

      {/* <button */}
      {/*   className="text-white" */}
      {/*   onClick={() => auth.setProfile({ email: "hein" })} */}
      {/* > */}
      {/*   Login */}
      {/* </button> */}

      {auth.isLogin && <Footer />}
    </div>
  )
}
