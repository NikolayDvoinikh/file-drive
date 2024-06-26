import Link from "next/link";
import Logo from "./logo";

const footerLinks: { name: string | JSX.Element; path: string }[] = [
  {
    name: <Logo />,
    path: "/",
  },
  {
    name: "Privacy Policy",
    path: "/privacy",
  },
  {
    name: "Terms of Service",
    path: "/terms-of-service",
  },
  {
    name: "About",
    path: "/about",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 relative z-10 mt-auto">
      <div className="container py-10 px-5">
        <ul className="mx-auto flex justify-between items-center">
          {footerLinks.map((link) => {
            return (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="text-blue-900 hover:text-blue-500"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
