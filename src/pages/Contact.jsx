import React, { useState } from "react";
import { Mail, Phone, Linkedin, MessageCircle, Check, Copy, Github } from "lucide-react";

const Contact = () => {
  const [copied, setCopied] = useState(null);

  const contactDetails = [
    {
      id: "email",
      icon: <Mail size={20} className="text-blue-500 flex-shrink-0" />,
      text: "adebisitimileyin23@gmail.com",
      link: "mailto:adebisitimileyin23@gmail.com",
    },
    {
      id: "phone",
      icon: <Phone size={20} className="text-green-500 flex-shrink-0" />,
      text: "+234 905 595 43322",
      link: "tel:+2349059543322",
    },
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} className="text-green-500 flex-shrink-0" />,
      text: "+234 905 595 43322",
      link: "https://wa.me/2349059543322",
    },
    {
      id: "linkedin",
      icon: <Linkedin size={20} className="text-blue-700 flex-shrink-0" />,
      text: "linkedin.com/in/adebisitimileyin",
      link: "https://www.linkedin.com/in/adebisi-timileyin",
    },
    {
      id: "github",
      icon: <Github size={20} className="text-gray-900 flex-shrink-0" />,
      text: "github.com/sparynx",
      link: "https://github.com/sparynx",
    },
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-8 w-full max-w-md mx-auto">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Contact Me</h1>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Feel free to reach out via any of the platforms below.
        </p>

        <div className="space-y-3">
          {contactDetails.map(({ id, icon, text, link }) => (
            <div
              key={id}
              className="flex items-center bg-gray-100 hover:bg-gray-200 transition-colors p-3 rounded-lg gap-2"
            >
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 flex-1 min-w-0"
              >
                {icon}
                <span className="text-gray-800 text-sm md:text-base truncate">
                  {text}
                </span>
              </a>
              <button 
                onClick={() => handleCopy(text, id)}
                className="p-1 flex-shrink-0 hover:bg-gray-300 rounded"
                aria-label={copied === id ? "Copied" : "Copy to clipboard"}
              >
                {copied === id ? (
                  <Check size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} className="text-gray-500 hover:text-gray-800 transition-colors" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;