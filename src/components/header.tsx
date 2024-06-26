import {
  OrganizationSwitcher,
  UserButton,
  SignedOut,
  SignInButton,
  SignedIn,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Logo from "./logo";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b py-5 sm:py-4 bg-gray-50 relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>

        <SignedIn>
          <Button variant="outline">
            <Link href="/dashboard/files">Your Files</Link>
          </Button>
        </SignedIn>

        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
