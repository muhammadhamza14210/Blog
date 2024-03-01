import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center ">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            About Muhammad's Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Hamza's Blog is a personal blog that I created to share my
              knowledge and experience with web development. I am learning to be
              a full-stack web developer with a passion for learning new
              technologies and learning new ways of doing things. I created this
              blog to share my knowledge and experience with web development.
              Feel free to check out my Github Page for more cool upcoming
              projects! Hope you enjoy it!
            </p>

            <p>
              Currently a student at University of Alberta doing a degree in
              Computer Science where I learn different things ranging from
              software engineering to data structures and algorithms. I want to
              be able to share my knowledge and experience with web development.
              I am also very interested in Artifical Intelligence and Machine
              Learning. 
            </p>

            <p>
              Outside of academia i enjoy various activities such as playing cricket
              and hanging out with different people. I am fitness enthusiast and
              I enjoy learning from different fields. Moreover I love the stock market
              and see myself deeply immeresed in it. Coming from various backgrounds ranging
              in finance I see myself as a leader willing to take charge where needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
