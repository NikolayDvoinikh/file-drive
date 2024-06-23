import Image from "next/image";
import UploadButton from "./upload-button";

const Placeholder = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-24">
      <Image
        src="/empty_data.svg"
        alt="an image of a picture and directory icon"
        width={300}
        height={300}
      />
      <div className="text-2xl">You have no files. Upload one now</div>
      <UploadButton />
    </div>
  );
};

export default Placeholder;
