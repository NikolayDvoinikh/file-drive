import {
  OrganizationSwitcher,
  UserButton,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="border-b py-5 sm:py-4 bg-gray-50">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
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
};

export default Header;
