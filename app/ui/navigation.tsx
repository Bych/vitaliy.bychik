'use client';

import Link from 'next/link';
import clsx from "clsx";
import { usePathname } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const montserrat = Montserrat({ subsets: ["latin"] });

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className={clsx(
      "w-full flex justify-between items-center p-4 font-semibold",
      montserrat.className
    )}
    >
      <div className="flex items-center">
        {pathname !== '/' && (
          <Link
            href="/"
            className="duration-200 text-zinc-400 hover:text-zinc-100 p-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6" />
          </Link>
        )}
      </div>
      <div className="flex items-center space-x-4">
        <Link 
          href="https://www.linkedin.com/in/vitaliy-bychik-18163558/"
          target="_blank"
          className="duration-200 text-zinc-400 hover:text-zinc-100 p-2"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </Link>
        
        <Link 
          href="https://twitter.com/vitaliy_bychik"
          target="_blank"
          className="duration-200 text-zinc-400 hover:text-zinc-100 p-2"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </Link>

        <Link 
          href="https://www.instagram.com/vitaliy.bychik/"
          target="_blank"
          className="duration-200 text-zinc-400 hover:text-zinc-100 p-2"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        
        <Link 
          href="/contact"
          className="duration-200 text-zinc-400 hover:text-zinc-100 p-2"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}