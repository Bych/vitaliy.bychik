import Link from 'next/link';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const email = "vitaliy.bychik@gmail.com";

export default function Contact() {

  return (
    <>
      <div className="w-screen flex flex-col text-white text-2xl items-center px-10 md:pt-20">
        <div className="max-w-4xl space-y-20">

          {/* block 1 */}
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="text-center sm:text-left text-2xl md:text-4xl mb-6">
                Let&apos;s make something great together!
              </div>
              <div className="leading-loose md:leading-normal 
              text-base md:text-lg lg:text-xl xl:text-2xl text-pretty text-zinc-300">
                Just drop me a message to
                <div className="block sm:ml-2 sm:inline">
                  <Link
                    href={`mailto:${email}`}
                    target="_blank"
                    className="duration-200 hover:text-white px-2 py-1 mr-2 
                  border rounded-lg border-zinc-300 hover:border-white
                  hover:shadow-[0_0_5px] hover:shadow-white"
                  >
                    <FontAwesomeIcon icon={faEnvelope} /> {email}
                  </Link>
                  or via
                </div>
                <div className="block sm:ml-2 sm:inline">
                  <Link
                    href="https://www.linkedin.com/in/vitaliy-bychik-18163558/"
                    target="_blank"
                    className="duration-200 hover:text-white px-2 py-1 mr-2 
                  border rounded-lg border-zinc-300 hover:border-white
                  hover:shadow-[0_0_5px] hover:shadow-white"
                  >
                    <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                  </Link>
                </div>

              </div>
            </div>
          </div>

          {/* block 2 */}
          <div className="flex flex-col sm:flex-row">
            <div className="flex basis-1/2  mb-2">
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-pretty text-zinc-300">
                I&apos;m located in Lisbon, Portugal. My working hours are
                extremely flexible, having solid intersection with all the
                time zones in the U.S. and Europe.
              </p>
            </div>
            <div className="flex basis-1/2 justify-center">
              <Image
                src="/white-dotted-map-pt.png"
                alt="Vitaliy's Profile Image"
                width={410}
                height={241}
                className=""
              />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}