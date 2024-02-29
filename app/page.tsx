'use client';

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function Page() {
  return (
    <main>
      <div className="flex min-h-screen items-center justify-center">
        <TypeAnimation
          sequence={[
            `Hello, I'm Vitaliy`,
          ]}
          speed={50}
          style={{ whiteSpace: 'pre-line', fontSize: '2em', display: 'inline-block' }}
          repeat={0}
        />
      </div>
    </main>
  );
}


{/* 
          <p className="text-xl text-neutral-200">
            The one-man tech team poised to make your next great idea a reality.
          </p>
          Remotely available UTC−8 to UTC+1. rafael@caferati.me_ */}