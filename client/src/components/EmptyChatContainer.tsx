import Model from "./Model";

export const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <Model />
      <div className="text-opacity-80 text-white flex flex-col gap-5 bottom-20 lg:text-4xl text-3xl transition-all duration-300 text-center absolute">
        <h3 className="poppins-medium">
          Hi<span className="text-purple-500">! </span>
           Welcome to <span className="text-purple-500"> Textit</span>
        </h3>
      </div>
    </div>
  );
};
