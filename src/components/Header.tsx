import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="border-b py-4 bg-gray-50">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
