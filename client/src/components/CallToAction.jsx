import { Button } from "flowbite-react";
import React from "react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="p-3 text-2xl">Want to see more cool projects of me?</h2>
        <p className="my-2 text-gray-500">
          {" "}
          Check out my Github Page for more cool upcoming projects!
        </p>
        <Button
          gradientDuoTone="tealToLime"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://github.com/muhammadhamza14210"
            target="_blank"
            rel="noopener noreferrer"
          >
            Muhammad Hamza Github
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*HLGtY6O2vUHqIyEbWdmBgA.jpeg" />
      </div>
    </div>
  );
}
