import React from "react";

type IconProps = {
  className?: string;
};

export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);
export const CheckMarkIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-4 h-4 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M5 13l4 4L19 7"
    />
  </svg>
);
export const LightningIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.91 2.84a1.2 1.2 0 0 0-1.82 0L3.35 10.6a1.2 1.2 0 0 0 1 2h5.15L8.41 18a1.2 1.2 0 0 0 1.83 1.16l6.74-7.76a1.2 1.2 0 0 0-1-2h-5.1l3-5.56Z" />
  </svg>
);

export const BloggerIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 4H20V20H4V4Z" fill="#FF8000" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.8 10.4H15.2V13.6H17.6V8H10.4V10.4H12.8V10.4ZM12.8 15.2H10.4V17.6H17.6V15.2H12.8Z"
      fill="white"
    />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

export const UndoIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 13.5v-3a3.5 3.5 0 0 0-3.5-3.5H5M8 4l-3 3.5L8 11"
    />
  </svg>
);

export const RedoIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 13.5v-3a3.5 3.5 0 0 1 3.5-3.5H19M16 4l3 3.5-3 3.5"
    />
  </svg>
);

export const BoldIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4.25-4H7v14h7.04c2.1 0 3.71-1.7 3.71-3.78 0-1.52-.86-2.82-2.15-3.43zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
  </svg>
);

export const ItalicIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
  </svg>
);

export const UnderlineIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 3v9a5 5 0 0010 0V3h-2v9a3 3 0 01-6 0V3H5z" />
    <path d="M3 17h14v2H3v-2z" />
  </svg>
);

export const StrikethroughIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    ></path>
  </svg>
);

export const ImageIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    ></path>
  </svg>
);

export const QuoteBlockIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v2.586l3.293-3.293a1 1 0 111.414 1.414L12.414 8H15a1 1 0 110 2h-4a1 1 0 01-1-1V4a1 1 0 011-1zm-6 0a1 1 0 011 1v2.586l3.293-3.293a1 1 0 111.414 1.414L5.414 8H8a1 1 0 110 2H4a1 1 0 01-1-1V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
  </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const YouTubeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M21.582,6.186c-0.23-0.854-0.906-1.531-1.76-1.76C18.25,4,12,4,12,4S5.75,4,4.178,4.426 c-0.854,0.23-1.531,0.906-1.76,1.76C2,7.758,2,12,2,12s0,4.242,0.418,5.814c0.23,0.854,0.906,1.531,1.76,1.76 C5.75,20,12,20,12,20s6.25,0,7.822-0.426c0.854-0.23,1.531-0.906,1.76-1.76C22,16.242,22,12,22,12S22,7.758,21.582,6.186z M9.933,15.5V8.5l6.5,3.5L9.933,15.5z" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export const QuoteIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-16 h-16 ${className}`}
    fill="currentColor"
    viewBox="0 0 32 32"
  >
    <path d="M10.25,11.812a.859.859,0,0,0-.812.875v5.375a.859.859,0,0,0,.812.875h3.375v3.375a.859.859,0,0,0,.813.875h.875a.859.859,0,0,0,.875-.812V18.937a.859.859,0,0,0-.812-.875H12.812V12.687a.859.859,0,0,0-.812-.875ZM22.5,11.812a.859.859,0,0,0-.812.875v5.375a.859.859,0,0,0,.812.875H25.875v3.375a.859.859,0,0,0,.813.875h.875a.859.855,0,0,0,.875-.812V18.937a.859.859,0,0,0-.812-.875H24.125V12.687a.859.859,0,0,0-.812-.875Z" />
  </svg>
);

export const BrainIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v2.172a2 2 0 00.586 1.414l5 5c1.29 1.29.904 3.43.029 4.305l-4.293 4.293a1.5 1.5 0 01-2.121 0l-2.828-2.828a1.5 1.5 0 00-2.121 0l-4.293 4.293c-.875.875-3.015.278-4.305-.029l-5-5a2 2 0 00-1.414-.586V5l1-1z"
    />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

// New icons for editor
export const TextColorIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 20h24v4H0v-4z M11 3L5.5 17h2.25l1.12-2.5h6.25L16.25 17h2.25L13 3h-2z M9.62 12l2.38-5.33L14.38 12H9.62z" />
  </svg>
);

export const TextBackgroundColorIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
  </svg>
);

export const MagicWandIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.4,3.3L16.7,4.6L7.5,13.8L6.2,12.5L15.4,3.3M12,1.1L3.6,9.5C3.3,9.8,3.3,10.2,3.6,10.5L4.9,11.8C5.2,12.1,5.6,12.1,5.9,11.8L14.3,3.4C14.6,3.1,14.6,2.7,14.3,2.4L13,1.1C12.7,0.8,12.3,0.8,12,1.1M19.8,11.5L18,9.7L19.3,8.4L21.1,10.2L19.8,11.5M17.4,8.1L18.7,9.4L16,12.1L14.7,10.8L17.4,8.1M22.2,16.9L20.4,15.1L21.7,13.8L23.5,15.6L22.2,16.9M20.2,12.5L17.5,15.2L18.8,16.5L21.5,13.8L20.2,12.5M6.6,14.5L3,18.1V21H5.9L9.5,17.4L6.6,14.5Z" />
  </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.1,2.3c0.5-0.5,1.2-0.5,1.7,0l1.1,1.1c1,1,1.6,2.4,1.6,3.8c0,0.4-0.1,0.8-0.2,1.2l-2.6,8.1c-0.5,1.5-2.4,2.2-3.8,1.4 l-8.2-4.4c-0.2-0.1-0.4-0.2-0.5-0.4l-0.4-0.4c-0.2-0.2-0.3-0.5-0.4-0.8L0,3.7C0,3.2,0.2,2.8,0.5,2.5s0.7-0.5,1.2-0.5l10.2,0 C12.3,2.1,12.7,2.1,13.1,2.3z M12,9.2c-1.5,0-2.8,1.2-2.8,2.8s1.2,2.8,2.8,2.8s2.8-1.2,2.8-2.8S13.5,9.2,12,9.2z M17,4.8 c-0.5,0-0.8-0.4-0.8-0.8s0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S17.5,4.8,17,4.8z M5.5,18.2l-1,0.5c-0.4,0.2-0.8,0.1-1-0.1 c-0.2-0.2-0.3-0.6-0.1-1l0.5-1L5.5,18.2z M21.9,8.1c-0.1-0.4-0.4-0.7-0.7-0.8l-1.3-0.5l-2.4,3.8l2,2L21.9,8.1z M23.5,3.3 c0-0.4-0.2-0.8-0.4-1.1c-0.3-0.3-0.7-0.4-1.1-0.4h-0.1c-0.1,0-0.2,0-0.3,0.1l-2.1,0.7c-0.4,0.1-0.7,0.4-0.8,0.7l-0.5,1.3l3.8,2.4 l1.3-0.5C23.3,6.1,23.5,5.6,23.5,5.1V3.3z" />
  </svg>
);

export const FontFamilyIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.43 4L3.13 18h2.24l1.43-4h6.4l1.43 4h2.24L14.57 4h-5.14zM12 7.23l2.12 6h-4.24L12 7.23z" />
  </svg>
);

export const FontSizeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z" />
  </svg>
);

export const VideoIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
  </svg>
);

export const SmileyIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export const MoreOptionsIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
  </svg>
);

export const AlignLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path>
  </svg>
);

export const AlignCenterIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path>
  </svg>
);

export const AlignRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"></path>
  </svg>
);

export const AlignJustifyIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"></path>
  </svg>
);

export const CardIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
    ></path>
  </svg>
);

export const UpiIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.19983 14.5999L12.0002 11.9999L16.8002 14.5999L12.0002 17.1999L7.19983 14.5999Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21.4V17.2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12V3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.8 15.6L22 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.2 15.6L2 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.8 8.3999L22 9.9999"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.2 8.3999L2 9.9999"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BankIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 12h6m-6 5.25h6M5.25 6h13.5"
    />
  </svg>
);

// --- NEW ICONS ---

export const LockIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-4 h-4 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-4 h-4 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.704 4.343a9 9 0 108.592 0M12 21a9.003 9.003 0 008.341-5.657"
    />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export const VisaIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-5 ${className}`}
    viewBox="0 0 38 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M34.941 22.332H30.86L26.35 3.39H30.43L34.941 22.332ZM25.074 3.39L20.245 22.332H16.164L20.993 3.39H25.074ZM15.013 22.332H9.25L9.612 20.178L11.751 6.273L9.846 3.39H13.916L15.938 6.942L17.756 16.59L17.16 22.332H15.013V22.332ZM8.112 3.39L4.694 22.332H0.625L4.043 3.39H8.112Z"
      fill="#26368A"
    />
  </svg>
);

export const MastercardIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-5 ${className}`}
    viewBox="0 0 39 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="13.116" cy="11.5" r="11.5" fill="#EA001B" />
    <circle cx="25.884" cy="11.5" r="11.5" fill="#F79E1B" />
    <path
      d="M21.938 11.5C21.938 8.92 20.89 6.549 19.143 4.825C17.397 6.549 16.348 8.92 16.348 11.5C16.348 14.08 17.397 16.451 19.143 18.175C20.89 16.451 21.938 14.08 21.938 11.5Z"
      fill="#FF5F00"
    />
  </svg>
);

export const RuPayIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-5 ${className}`}
    viewBox="0 0 80 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.92 13.56L17.52 0H22.44L14.4 25.68H9.36L0 0H5.2L12.92 13.56Z"
      fill="#0071BC"
    />
    <path
      d="M49.4925 10.8C48.8125 11.28 47.9325 11.64 46.9325 11.64H43.9325V25.68H39.2925V0H47.4525C51.2925 0 53.7325 1.56 53.7325 5.52C53.7325 8.28 52.2525 10.08 49.4925 10.8ZM43.9325 2.76V8.88H46.6125C48.8125 8.88 49.9325 7.68 49.9325 5.64C49.9325 3.6 48.8125 2.76 46.6125 2.76H43.9325Z"
      fill="#F47B20"
    />
    <path
      d="M74.456 0L80 25.68H74.84L72.2 17.16H64.4L61.64 25.68H56.52L64.76 0H74.456ZM70.88 14.4L68.24 6.24L65.72 14.4H70.88Z"
      fill="#0071BC"
    />
    <path
      d="M36.431 0.00012207V25.68H25.031V0.00012207H36.431ZM28.591 22.92H32.871V17.52H28.591V22.92ZM28.591 8.28003H32.871V2.76001H28.591V8.28003Z"
      fill="#0071BC"
    />
  </svg>
);

export const GooglePayIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M39.387 23.63H44.111V28.354H39.387V23.63Z" fill="#34A853" />
    <path
      d="M12.2882 17.228C10.7482 18.768 9.87324 20.892 9.87324 23.18H17.2282V15.825C15.4832 15.825 13.8382 16.353 12.2882 17.228Z"
      fill="#4285F4"
    />
    <path
      d="M9.87329 28.354C9.87329 30.642 10.7483 32.766 12.2883 34.306C13.8383 35.181 15.4833 35.709 17.2283 35.709V28.354H9.87329Z"
      fill="#FBBC04"
    />
    <path
      d="M17.2283 42.164V49.519C19.5163 49.519 21.6403 48.644 23.1803 47.104L27.0503 43.234L17.2283 42.164Z"
      fill="#EA4335"
    />
    <path
      d="M49.5186 23.18C49.5186 20.892 48.6436 18.768 47.1036 17.228C45.5636 16.353 43.9186 15.825 42.1736 15.825V23.18H49.5186Z"
      fill="#4285F4"
    />
    <path
      d="M42.1732 35.709C43.9182 35.709 45.5632 35.181 47.1032 34.306C48.6432 32.766 49.5182 30.642 49.5182 28.354H42.1732V35.709Z"
      fill="#FBBC04"
    />
    <path
      d="M23.1803 6.87402L17.2283 12.826V15.826H23.1803C28.3553 15.826 32.7093 20.18 32.7093 25.355C32.7093 30.53 28.3553 34.884 23.1803 34.884H17.2283V42.165L27.0503 43.235L30.9203 47.105C32.4603 48.645 34.5843 49.52 36.8723 49.52C40.0903 49.52 42.8713 48.077 44.8213 45.789L47.1043 47.105C48.6443 45.565 49.5193 43.441 49.5193 41.153V10.381C49.5193 8.09202 48.6443 5.96802 47.1043 4.42802L44.8213 6.87402C42.8713 4.42802 40.0903 2.98602 36.8723 2.98602C29.6973 2.98602 23.8343 5.61102 23.1803 6.87402Z"
      fill="#EA4335"
    />
  </svg>
);

export const PaytmIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 60 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30.43 14.68V5.32H38.55V7.4H33.07V9.58H38.11V11.66H33.07V14.68H30.43Z"
      fill="#002970"
    />
    <path d="M40.0333 11.23V5.32H42.6733V14.68H40.0333V11.23Z" fill="#002970" />
    <path
      d="M40.0333 11.23L44.0733 5.32H47.1533L42.6733 11.62V14.68H47.6733V11.66H44.7533L49.4333 5.32H52.5533L47.6733 12.04V14.68H52.5533V16.76H40.0333V11.23Z"
      fill="#00B9F1"
    />
    <path
      d="M16.9416 14.68V5.32H25.0616V6.16L20.2216 11.38V11.4H25.0616V14.68H16.9416ZM19.5816 7.4V11.12L23.4416 7.4H19.5816Z"
      fill="#00B9F1"
    />
    <path
      d="M0 5.32H7.2V7.4H2.64V9.58H7.2V11.66H2.64V14.68H0V5.32Z"
      fill="#00B9F1"
    />
    <path d="M8.52843 5.32H11.1684V16.76H8.52843V5.32Z" fill="#00B9F1" />
    <path d="M26.4381 5.32H29.0781V16.76H26.4381V5.32Z" fill="#002970" />
  </svg>
);

export const PhonePeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 78 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 19.999V0.31897H12.029C15.93 0.31897 18.23 1.34897 18.23 4.79897C18.23 6.94897 17.15 8.35897 15.38 8.89897L19.49 19.999H14.51L10.79 9.91897H7.31V19.999H0ZM7.31 7.21897H10.97C12.89 7.21897 13.91 6.55897 13.91 4.88897C13.91 3.21897 12.89 2.58897 10.97 2.58897H7.31V7.21897Z"
      fill="#5F259F"
    />
    <path d="M22.0015 19.999V0.31897H29.3115V19.999H22.0015Z" fill="#5F259F" />
    <path d="M32.2274 19.999V0.31897H39.5374V19.999H32.2274Z" fill="#5F259F" />
    <path
      d="M42.4925 19.999V0.31897H54.4325V2.61897H49.8025V8.80897H53.8325V11.109H49.8025V17.699H54.5225V19.999H42.4925Z"
      fill="#5F259F"
    />
    <path d="M57.4842 19.999V0.31897H64.7942V19.999H57.4842Z" fill="#5F259F" />
    <path
      d="M67.8041 19.999V0.31897H77.1641C80.3441 0.31897 81.8441 1.78897 81.8441 4.44897C81.8441 6.17897 81.0941 7.55897 79.5941 8.24897V8.36897C81.6941 8.93897 82.7441 10.379 82.7441 12.509C82.7441 15.659 80.9141 17.029 77.4341 17.029H75.1141V19.999H67.8041ZM75.1141 7.79897H77.1641C78.3641 7.79897 78.9641 7.04897 78.9641 6.02897C78.9641 4.97897 78.3641 4.28897 77.1641 4.28897H75.1141V7.79897ZM75.1141 14.829H77.4341C78.9341 14.829 79.6241 14.019 79.6241 12.809C79.6241 11.539 78.9341 10.729 77.4341 10.729H75.1141V14.829Z"
      fill="#5F259F"
    />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-6 h-6 ${className}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export const QrCodeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-8 h-8 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v1m6 11h-1m-1-6v1m-1-1H9m11 6h-1M4 12H3m3-3V8m-1 1H4m12 0h-1m-1-1V8m-1 1H9m-1-1V8m-1 1H4m7 11v-1m-1-1H9m-1-1v-1m-1 1H4m12 0h-1m-1-1v-1m-1 1H9"
    />
  </svg>
);

export const PaymentLogoIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-10 h-10 ${className}`}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="2" fill="#4A90E2" />
    <circle cx="10" cy="12" r="1.5" fill="#4A90E2" />
    <circle cx="22" cy="12" r="1.5" fill="#4A90E2" />
    <circle cx="10" cy="20" r="1.5" fill="#4A90E2" />
    <circle cx="22" cy="20" r="1.5" fill="#4A90E2" />
    <circle cx="16" cy="8" r="1" fill="#4A90E2" />
    <circle cx="16" cy="24" r="1" fill="#4A90E2" />
    <circle cx="7" cy="16" r="1" fill="#4A90E2" />
    <circle cx="25" cy="16" r="1" fill="#4A90E2" />
    <circle cx="8" cy="8" r="1" fill="#4A90E2" />
    <circle cx="24" cy="8" r="1" fill="#4A90E2" />
    <circle cx="8" cy="24" r="1" fill="#4A90E2" />
    <circle cx="24" cy="24" r="1" fill="#4A90E2" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-4 h-4 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export const QrCodeDisplayIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-48 h-48 ${className}`}
    viewBox="0 0 50 50"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0h14v14H0V0zm4 4h6v6H4V4zM0 36h14v14H0V36zm4 4h6v6H4v-6zM36 0h14v14H36V0zm4 4h6v6h-6V4zM22 2h2v2h-2V2zm4 0h2v2h-2V2zm-4 4h2v2h-2V6zm4 0h2v2h-2V6zM18 6h2v2h-2V6zm-4 4h2v2h-2v-2zm-4 0h2v2H10v-2zM6 10h2v2H6v-2zm-2 2h2v2H4v-2zm2 2h2v2H6v-2zm-4 4h2v2H2v-2zm2 2h2v2H4v-2zm2 0h2v2H6v-2zm-2 2h2v2H4v-2zm-2 2h2v2H2v-2zm4 0h2v2H6v-2zm2 0h2v2H8v-2zm-6 4h2v2H2v-2zm2 2h2v2H4v-2zm-2 2h2v2H2v-2zM8 26h2v2H8v-2zm-2-2h2v2H6v-2zm-2-4h2v2H4v-2zm0-2h2v2H4v-2zm-2-2h2v2H2v-2zm0-2h2v2H2v-2zm0-4h2v2H2v-2zm0-2h2v2H2V8zM18 18h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2V8zm0-4h2v2h-2V4zm-2-2h2v2h-2V2zm-4 2h2v2h-2V4zm-2 2h2v2h-2V6zm2 4h2v2h-2v-2zm-4 0h2v2H8v-2zm-2 2h2v2H6v-2zm-2 2h2v2H4v-2zm-2 2h2v2H2v-2zm20-20h2v2h-2V2zm2 2h2v2h-2V4zm2 2h2v2h-2V6zm2 2h2v2h-2V8zm-2 6h2v2h-2v-2zm-4-2h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-4 0h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2-4h2v2h-2v-2zm-2 2h2v2h-2v-2zm0 2h2v2h-2v-2zm-2 2h2v2h-2v-2zM18 36h2v2h-2v-2zm2-2h2v2h-2v-2zm2 2h2v2h-2v-2zm2-4h2v2h-2v-2zm2 4h2v2h-2v-2zm-4 2h2v2h-2v-2zm-2 4h2v2h-2v-2zm-2 2h2v2h-2v-2zm2-2h2v2h-2v-2zm2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm2-4h2v2h-2v-2zm4 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-6 6h2v2h-2v-2zm2-2h2v2h-2v-2zm4-2h2v2h-2v-2zm2-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-6 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2-4h2v2h-2v-2zm2 0h2v2h-2v-2zm-4-2h2v2h-2v-2zm2 4h2v2h-2v-2zm2 0h2v2h-2v-2zM36 36h14v14H36V36zm4 4h6v6h-6v-6zM36 18h2v2h-2v-2zm2 0h2v2h-2v-2zm2 0h2v2h-2v-2zm2 0h2v2h-2v-2zm2 0h2v2h-2v-2zm-6 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm0 2h2v2h-2v-2zm0 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm8 0h2v2h-2v-2zm2-2h2v2h-2v-2zm2-2h2v2h-2v-2zm2-2h2v2h-2v-2zm-4-2h2v2h-2v-2zm2-2h2v2h-2v-2zm-4 0h2v2h-2v-2zm0-2h2v2h-2v-2zm-2-2h2v2h-2v-2zm2 2h2v2h-2v-2zm6-4h2v2h-2v-2zm2 2h2v2h-2v-2z" />
  </svg>
);

export const GooglePayCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-16 h-16 ${className}`}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="32" fill="white" />
    <path d="M44.594 28.062H50.158V33.626H44.594V28.062Z" fill="#34A853" />
    <path
      d="M14.93 20.738C13.12 22.548 12.096 24.962 12.096 27.604H20.738V19.088C18.66 19.088 16.712 19.702 14.93 20.738Z"
      fill="#4285F4"
    />
    <path
      d="M12.096 33.626C12.096 36.268 13.12 38.682 14.93 40.492C16.712 41.528 18.66 42.142 20.738 42.142V33.626H12.096Z"
      fill="#FBBC04"
    />
    <path
      d="M20.738 49.852V58.468C23.48 58.468 25.904 57.444 27.714 55.634L32.228 51.12L20.738 49.852Z"
      fill="#EA4335"
    />
    <path
      d="M58.468 27.604C58.468 24.962 57.444 22.548 55.634 20.738C53.824 19.702 51.876 19.088 49.8 19.088V27.604H58.468Z"
      fill="#4285F4"
    />
    <path
      d="M49.8 42.142C51.876 42.142 53.824 41.528 55.634 40.492C57.444 38.682 58.468 36.268 58.468 33.626H49.8V42.142Z"
      fill="#FBBC04"
    />
    <path
      d="M27.714 9.17798L20.738 15.652V19.088H27.714C33.628 19.088 38.832 23.978 38.832 30.292C38.832 36.606 33.628 41.496 27.714 41.496H20.738V49.852L32.228 51.12L36.742 55.634C38.552 57.444 40.976 58.468 43.718 58.468C47.484 58.468 50.784 56.814 53.054 54.12L55.634 55.634C57.444 53.824 58.468 51.41 58.468 48.448V12.92C58.468 10.278 57.444 7.86398 55.634 6.05398L53.054 9.17798C50.784 6.48198 47.484 4.82798 43.718 4.82798C35.534 4.82798 28.59 7.91398 27.714 9.17798Z"
      fill="#EA4335"
    />
  </svg>
);

export const WavingHandIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 18.5a1.5 1.5 0 0 1-1.5-1.5v-2.5a1.5 1.5 0 0 1 3 0V17a1.5 1.5 0 0 1-1.5 1.5z" />
    <path d="M12 18.5a1.5 1.5 0 0 1-1.5-1.5v-5.5a1.5 1.5 0 0 1 3 0V17a1.5 1.5 0 0 1-1.5 1.5z" />
    <path d="M6 18.5a1.5 1.5 0 0 1-1.5-1.5V14a1.5 1.5 0 0 1 3 0v3a1.5 1.5 0 0 1-1.5 1.5z" />
    <path d="M12 11.5a1.5 1.5 0 0 1-1.5-1.5V8a1.5 1.5 0 0 1 3 0v2a1.5 1.5 0 0 1-1.5 1.5z" />
    <path d="M4.5 15.5a1.5 1.5 0 0 1-1.5-1.5V11a1.5 1.5 0 0 1 3 0v3a1.5 1.5 0 0 1-1.5 1.5z" />
    <path d="M2 12.5a2.5 2.5 0 0 1 2.5-2.5h15a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5h-15a2.5 2.5 0 0 1-2.5-2.5v-5z" />
  </svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-4 0V3a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6"
    ></path>
  </svg>
);

export const UploadCloudIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    ></path>
  </svg>
);
