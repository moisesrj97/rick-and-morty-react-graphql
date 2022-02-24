/* eslint-disable react/self-closing-comp */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export function About(): JSX.Element {
  return (
    <div className="flex flex-col text-white justify-center items-center">
      <div className="text-xl">
        <h2 className="text-6xl font-bold mb-4 underline decoration-green-500">
          Hello World!
        </h2>
        <p>I hope you liked my Rick & Morty ft. GraphQL page</p>
        <h3 className="text-4xl font-bold mb-4 mt-8 underline decoration-green-500">
          The stack I&apos;ve used is
        </h3>
        <ul className="list-inside list-disc marker:text-green-500 ">
          <li>React + Typescript</li>
          <li>ApolloClient</li>
          <li>GraphQL</li>
          <li>React Router</li>
          <li>Jest + Testing Library</li>
          <li>TailwindCSS</li>
        </ul>
        <h3 className="text-4xl font-bold mb-4 mt-8 underline decoration-green-500">
          You can reach me on:
        </h3>
        <ul className="flex gap-4 text-5xl">
          <li>
            <a
              href="https://www.linkedin.com/in/moisesrodriguezjurado/"
              target="__blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="hover:scale-110 transition-all cursor-pointer"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.github.com/moisesrj97/"
              target="__blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="hover:scale-110 transition-all cursor-pointer"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
