"use client";

import { useState } from "react";

export default function Home() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [cards, setCards] = useState(
    Array.from({ length: 18 }, (_, index) => ({
      id: index,
      frontImage: `https://via.placeholder.com/150?text=Card+${index + 1}`,
      backImage: "https://via.placeholder.com/150?text=Back",
      flipped: false,
    }))
  );

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !cards[index].flipped) {
      const newFlippedCards = [...flippedCards, index];
      const updatedCards = cards.map((card, i) =>
        i === index ? { ...card, flipped: true } : card
      );

      setCards(updatedCards);
      setFlippedCards(newFlippedCards);

      // Reset flipped cards after a short delay if two cards are flipped
      if (newFlippedCards.length === 2) {
        setTimeout(() => {
          const [first, second] = newFlippedCards;
          if (cards[first].frontImage !== cards[second].frontImage) {
            const resetCards = updatedCards.map((card, i) =>
              i === first || i === second ? { ...card, flipped: false } : card
            );
            setCards(resetCards);
          }
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
          <div className=" items-center justify-center text-center h-screen bg-red-200 w-100 shadow-lg border-gray-200">
            <h1 className="text-6xl font-bold mb-8 mt-[100px]">MEMORY</h1>
            <h2 className="text-4xl mb-4">Tiempo:</h2>
            <h4 className="text-3xl p-6 border-4 rounded-3xl text-white bg-green-400 border-purple-500 mb-8 w-[150px] mx-auto">10</h4>
            <h2 className="text-4xl mb-4">Puntos:</h2>
            <h4 className="text-3xl p-6 border-4 rounded-3xl text-white bg-green-400 border-purple-500 w-[150px] mx-auto">10</h4>
          </div>
          <div className="w-[1600px] flex items-center justify-center text-center">
            <div className="grid grid-cols-6 gap-6 p-8">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center w-[150px] h-[150px] hover:scale-105 transition-transform duration-300 ${
                    card.flipped ? "rotate-y-180" : ""
                  }`}
                  onClick={() => handleCardClick(index)}
                  style={{
                    perspective: "1000px",
                  }}
                >
                  <div
                    className="relative w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: card.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 0.6s",
                    }}
                  >
                    <img
                      src={card.flipped ? card.frontImage : card.backImage}
                      alt={`Card ${index + 1}`}
                      className="absolute w-full h-full backface-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                    />
                  </div>
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
