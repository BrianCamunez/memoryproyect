

export default function Home() {
  return (
    <>
      <header className="absolute">
        <h1></h1>
      </header>
      <main>
        <div className="flex h-screen">
          <div className=" items-center justify-center text-center h-screen bg-red-200 w-100 shadow-lg border-gray-200">
            <h1 className="text-6xl font-bold mb-8 mt-[100px]">MEMORY</h1>
            <h2 className="text-4xl mb-4">Tiempo:</h2>
            <h4 className="text-3xl p-6 border-4 rounded-3xl text-white bg-green-400 border-purple-500 mb-8 w-[150px] mx-auto">10</h4>
            <h2 className="text-4xl mb-4">Puntos:</h2>
            <h4 className="text-3xl p-6 border-4 rounded-3xl text-white bg-green-400 border-purple-500 w-[150px] mx-auto">10</h4>
          </div>
          <div className="w-[1600px] flex items-center justify-center text-center">
            <div className="grid grid-cols-6 gap-6 p-8">
              {Array.from({ length: 18 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center w-[150px] h-[150px]  hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={`https://via.placeholder.com/150?text=Card+${index + 1}`}
                    alt={`Card ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer>
        Footer
      </footer>
    </>
  );
}
