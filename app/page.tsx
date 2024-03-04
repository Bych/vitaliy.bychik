import Image from "next/image";

export default function Home() {
  return (
    <main>

      <div className="w-screen h-screen flex flex-col sm:flex-row items-center justify-center border-2 text-white text-2xl space-y-2">
        <div className="flex flex-col mb-2">
          <Image
            src="/profile-pic2.png"
            alt="Vitaliy's Profile Image"
            width={150}
            height={150}
            className="rounded-full" 
          />
        </div>
        <div className="flex flex-col">
          <p className="text-center sm:text-left text-2xl md:text-4xl lg:text-6xl">
            Hello, I'm Vitaliy
          </p>
          <p className="text-center sm:text-left text-base md:text-lg lg:text-xl xl:text-2xl text-wrap">
            The one-man tech team poised to make your next great idea a reality.
          </p>
        </div>
      </div>
      <div className="w-screen h-screen flex items-center justify-center border-2 text-white text-2xl">
        The one-man tech team poised to make your next great idea a reality.
      </div>

      
      
    </main>
  );
}