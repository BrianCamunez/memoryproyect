"use client"

import { useEffect, useState } from "react";

interface ImageData {
  id: number;
  nombre: string;
  url: string;
  matched?: boolean;
}

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]); // Estado para controlar las cartas giradas

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://m7uf4laravel-production.up.railway.app/api/targeta");
        const data: ImageData[] = await response.json();

        // Duplicar las imágenes y mezclarlas
        const duplicatedImages = [...data.slice(0, 9), ...data.slice(0, 9)];
        const shuffledImages = duplicatedImages.sort(() => Math.random() - 0.5);

        setImages(shuffledImages);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    };

    fetchImages();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
    }

    if (flippedCards.length === 1) {
      const firstCardIndex = flippedCards[0];
      const secondCardIndex = index;

      if (images[firstCardIndex]?.url === images[secondCardIndex]?.url) {
        // Si las cartas coinciden, mantenerlas volteadas
        setFlippedCards([]);
        setImages((prevImages) =>
          prevImages.map((img, idx) =>
            idx === firstCardIndex || idx === secondCardIndex
              ? { ...img, matched: true }
              : img
          )
        );
      } else {
        // Si no coinciden, voltearlas de nuevo después de un breve retraso
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <>
      <header className="absolute">
        <h1></h1>
      </header>
      <main>
        <div className="flex h-screen">
          <div className="items-center justify-center text-center h-screen bg-red-200 w-100 shadow-lg border-gray-200">
            <h1 className="text-6xl font-bold mb-8 mt-[100px]">MEMORY</h1>
            <h2 className="text-4xl mb-4">Tiempo:</h2>
            <h4 className="text-3xl p-6 border-4 rounded-3xl text-white bg-green-400 border-purple-500 mb-8 w-[150px] mx-auto">10</h4>
            <h2 className="text-4xl mb-4">Puntos:</h2>
            <h4 className="text-3xl p-6 border-4 rounded-3xl text-white bg-green-400 border-purple-500 w-[150px] mx-auto">10</h4>
          </div>
          <div className="w-[1600px] flex items-center justify-center text-center">
            <div className="grid grid-cols-6 gap-6 p-8">
              {images.length > 0 ? (
                images.slice(0, 18).map((image, index) => (
                  <div
                    key={`${image.id}-${index}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center w-[150px] h-[150px] hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => handleCardClick(index)}
                  >
                    <img
                      src={flippedCards.includes(index) || image.matched ? image.url : images.find(img => img.id === 27)?.url}
                      alt={image.nombre}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))
              ) : (
                <p>Cargando imágenes...</p>
              )}
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
