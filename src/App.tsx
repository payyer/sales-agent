import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import 'nprogress/nprogress.css'

function App() {
  return <RouterProvider router={router} />
}

export default App
