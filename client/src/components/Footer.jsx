import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsLinkedin,
} from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="w-full border border-t-8 border-red-500">
      <div className="w-full max-w-8xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div>
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-4xl
        font-semibold dark:text-white"
            >
              <span
                className="px-2 py-1 bg-gradient-to-r from-yellow-400
            via-red-400 to-green-500 rounded-lg text-white"
              >
                Muhammad's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:gap-6">
            <div>
              <Footer.Title title="Follow Me!" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/muhammadhamza14210"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/muhammad-hamza-4578211ab/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Muhammad's blog"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-end">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon
              href="https://www.instagram.com/__muhammadhamza__/?next=%2F"
              target="_blank"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="https://github.com/muhammadhamza14210"
              target="_blank"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://twitter.com/MHamza14210"
              target="_blank"
              icon={BsTwitter}
            />
            <Footer.Icon
              href="https://www.linkedin.com/in/muhammad-hamza-4578211ab/"
              target="_blank"
              icon={BsLinkedin}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
