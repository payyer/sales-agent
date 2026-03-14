import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-4">Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Quay lại trang chủ
      </Link>
    </div>
  )
}

export default NotFoundPage
