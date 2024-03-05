import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

export default function Home() {
  return (
    <main>
      <div className="w-screen px-10">

      <div className="h-[90vh] flex flex-col sm:flex-row items-center justify-center text-white text-2xl space-y-2">
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
            Hello, I&apos;m Vitaliy
          </p>
          <p className="text-center sm:text-left text-base md:text-lg lg:text-xl xl:text-2xl text-wrap">
            The one-man tech team poised to make your next great idea a reality.
          </p>
        </div>
      </div>
      <div className="h-screen flex items-center justify-center text-white text-2xl">
        <div className="max-w-4xl space-y-10">
          <p className="text-center sm:text-left text-base md:text-lg lg:text-xl xl:text-2xl text-wrap">
            I&apos;ve held many roles in my career, from a junior software engineer to the head of the development department. 
          </p>
          <p className="text-center sm:text-left text-base md:text-lg lg:text-xl xl:text-2xl text-wrap">
            Currently I&apos;m obsessed with front-end - Next.js, React, Tailwind CSS, and Vercel.
          </p>
          <p className="text-center sm:text-left text-base md:text-lg lg:text-xl xl:text-2xl text-wrap">
            Got a project and need someone to help out? I&apos;m your guy!
          </p>
          <div>
            <Link
              href="/contact"
              className="duration-200 hover:text-white px-2 py-1 mr-2 
                  border rounded-lg border-zinc-300 hover:border-white
                  hover:shadow-[0_0_5px] hover:shadow-white"
            >
              <FontAwesomeIcon icon={faPaperPlane} /> Get in touch
            </Link>

          </div>
        </div>
      </div>

      </div>
      
    </main>
  );
}