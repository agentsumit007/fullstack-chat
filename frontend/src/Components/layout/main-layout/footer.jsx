import { Github, Linkedin } from "lucide-react";
import React from "react";
import { config } from "../../../../config";

const Footer = () => {
  return (
    <div className="h-[50px] bg-base-300 flex justify-between items-center py-10 px-15">
      <h1 className="text-md font-bold">made by Sumit Kesarwani</h1>
      <div className="flex justify-end gap-8">
        <a href="https://github.com/agentsumit007" target="_blank">
          <Github size={40} />
        </a>
        <a
          href="https://www.linkedin.com/in/sumit-kesarwani-a62a21194/"
          target="_blank"
        >
          <Linkedin size={40} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
