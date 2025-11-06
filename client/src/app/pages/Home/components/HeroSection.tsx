export default function HeroSection() {
  return (
    <>
      <section className="bg-linear-to-br from-blue-50 to-green-50 py-24 text-center relative overflow-hidden mt-5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center opacity-10"></div>

        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Намери място, което да наречеш{' '}
            <span className="text-blue-600">дом</span>.
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Подслони се с едно кликване.
          </p>

          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
              Разгледай имоти
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition">
              Добави обява
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
