export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">
          Защо да избереш PodsloniMe?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Бързо и лесно търсене
            </h3>
            <p className="text-gray-600">
              Намери своя дом за секунди с интелигентна търсачка и филтри.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Проверени оферти</h3>
            <p className="text-gray-600">
              Всички имоти преминават през ръчна проверка, за да гарантираме
              сигурност.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
            <div className="mx-auto w-12 h-12 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10l9-7l9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Сигурна общност</h3>
            <p className="text-gray-600">
              Работим с доверени агенти и брокери, за да се чувстваш сигурен.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
