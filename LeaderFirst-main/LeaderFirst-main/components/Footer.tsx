import React from "react";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  YouTubeIcon,
} from "./icons/Icons";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/the-leaders-first-63a0b738b/",
      icon: LinkedInIcon,
      label: "LinkedIn",
    },
    {
      href: "https://www.instagram.com/theleadersfirstt/",
      icon: InstagramIcon,
      label: "Instagram",
    },
    {
      href: "https://www.facebook.com/theleadersfirst/photos",
      icon: FacebookIcon,
      label: "Facebook",
    },
    {
      href: "https://x.com/TheLeadersFirst",
      icon: TwitterIcon,
      label: "Twitter/X",
    },
    {
      href: "https://youtube.com/@theleadersfirstt?si=zUJHp9VsWUqZyKGY",
      icon: YouTubeIcon,
      label: "YouTube",
    },
  ];

  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-6 text-center text-brand-dark">
        <a
          href="mailto:hello@theleadersfirst.com"
          className="font-semibold text-lg hover:underline"
        >
          hello@theleadersfirst.com
        </a>

        <div className="flex justify-center space-x-6 mt-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${link.label}`}
              className="text-gray-500 hover:text-brand-dark transition-colors"
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        <p className="text-gray-600 text-sm mt-8">
          Copyrights Reserved, The Leaders First @ 2023 - Present
        </p>
      </div>
    </footer>
  );
};

export default Footer;
