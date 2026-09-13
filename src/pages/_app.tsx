import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './Layout'
import { AuthContextWrapper } from '@/context/auth/AuthContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function App({ Component, pageProps }: AppProps) {
  // global query client config
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // gcTime: 1000 * 60, // when to clear your cache data from server , currently its set to 10s
        // staleTime: 1000 * 20, // indicate if the cache data is still fresh , if not refetch
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextWrapper>
    </QueryClientProvider>
  )
}
