export default function FooterComponent() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-6 md:mb-0">
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l9-9 9 9M4 10v10h16V10"
              />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg">PodsloniMe</span>
        </div>
        <p>© 2025 PodsloniMe. Всички права запазени.</p>
      </div>
    </footer>
  );
}
