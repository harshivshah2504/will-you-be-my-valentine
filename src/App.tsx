"use client";
import { useState, useEffect } from "react";

// Dynamically import all photos from the assets/photos directory
const photoModules = import.meta.glob("./assets/photos/*.jpg", { eager: true });
const photos = Object.values(photoModules).map((mod) => (mod as { default: string }).default);

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 3000); // Change photo every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "What if I asked really nicely?",
      "Pretty please",
      "With a chocolate rice cake on top",
      "What about a matcha frostie",
      "PLEASE POOKIE",
      "But :*(",
      "I am going to die",
      "Yep im dead",
      "ok ur talking to nathan's ghost",
      "please babe",
      ":((((",
      "PRETTY PLEASE",
      "Estoy muerto",
      "No :(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Slideshow */}
      {photos.map((photo, index) => (
        <div
          key={photo}
          className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentPhotoIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${photo})` }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center p-12 bg-black/20 backdrop-blur-[2px] rounded-3xl border border-white/10 shadow-2xl max-w-2xl w-full mx-4 transition-all hover:bg-black/30 hover:scale-[1.02] duration-500">
          {yesPressed ? (
            <>
              <img 
                src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
                alt="Bear Kiss" 
                className="rounded-xl shadow-lg mb-6"
              />
              <div className="text-4xl md:text-5xl font-bold font-romantic text-pink-300 drop-shadow-md animate-bounce">
                WOOOOOO!!! I love you pookie!! ;))
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-8 text-5xl md:text-7xl font-romantic text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] text-center leading-tight">
                Anjuri, <br />
                <span className="text-pink-300">will you be my Valentine?</span>
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
                <button
                  className={`rounded-full bg-gradient-to-r from-green-400 to-green-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-110 hover:shadow-green-500/50 hover:from-green-500 hover:to-green-700`}
                  style={{ fontSize: yesButtonSize }}
                  onClick={() => setYesPressed(true)}
                >
                  Yes!
                </button>
                <button
                  onClick={handleNoClick}
                  className="rounded-full bg-gradient-to-r from-red-400 to-red-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-110 hover:shadow-red-500/50 hover:from-red-500 hover:to-red-700"
                >
                  {noCount === 0 ? "No" : getNoButtonText()}
                </button>
              </div>
              
              <div className="mt-12 text-3xl font-romantic text-white/90 drop-shadow-md tracking-wide">
                Love, Harshiv
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
