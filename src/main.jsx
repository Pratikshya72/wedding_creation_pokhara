import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Inner pages are code-split so the homepage loads as fast as possible.
const OurStory = lazy(() => import('./pages/OurStory'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Films = lazy(() => import('./pages/Films'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))

const page = (Comp) => (
  <Suspense fallback={<div className="min-h-[100svh] bg-night" />}>
    <Comp />
  </Suspense>
)

// The hosted preview page can't use real URLs, so it routes in memory.
const createRouter = import.meta.env.MODE === 'preview-page' ? createMemoryRouter : createBrowserRouter

const router = createRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/our-story', element: page(OurStory) },
      { path: '/portfolio', element: page(Portfolio) },
      { path: '/portfolio/:slug', element: page(Gallery) },
      // old address from the first draft
      { path: '/couples/*', element: <Navigate to="/portfolio" replace /> },
      { path: '/films', element: page(Films) },
      { path: '/services', element: page(Services) },
      { path: '/contact', element: page(Contact) },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
