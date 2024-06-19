import pic from "../../public/logo.png";

const Logo = () => {
  return (
    <a href="/">
      <div className="flex items-end gap-1">
        <img src={pic.src} alt="logo" width={40} />
        <div className="hidden sm:flex flex-col">
          <span className="leading-none text-xs text-[rgb(14,40,63)] font-['Ropa_Sans'] tracking-[3px]">
            NIKOLAY
          </span>
          <span className="leading-none uppercase text-[10px] text-[rgb(14,40,63)] font-['Bellefair'] tracking-[0px]">
            file-drive
          </span>
        </div>
      </div>
    </a>
  );
};

export default Logo;
