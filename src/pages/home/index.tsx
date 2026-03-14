export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-10 shadow-sm border border-gray-100">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">Trang Chủ</h1>
        <p className="text-lg text-gray-600">
          Chào mừng bạn đến với <span className="font-semibold text-primary">Sales Agent</span>!
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold">Thống kê</h2>
            <p className="mt-2 text-gray-500">Xem báo cáo doanh số chi tiết tại đây.</p>
          </div>
          <div className="rounded-lg border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold">Chiến dịch</h2>
            <p className="mt-2 text-gray-500">Quản lý các chiến dịch bán hàng đang chạy.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
