import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="h-[50vh]  relative font-bold flex flex-col items-center">
      <div className="flex mt-12 justify-center items-center gap-2 text-2xl md:text-4xl flex-wrap">
        <p>Unlock</p>
        <div className="bg-[#DBD5FF] rounded-lg">
          <p className="p-1 text-[#715DE3] font-bold">Trivia Mastery</p>
        </div>
        <p>In Minutes</p>
      </div>
      <p className="text-center text-sm md:text-base font-normal mt-2">
        Create Engaging Flashcards and elevate your trivia game instantly
      </p>
      <div className="flex gap-4 mt-4">
        <button className="w-32 h-9  btn-grad rounded-lg text-sm font-normal text-white">
          Get Started
        </button>
        <button className="w-32 h-9 font-normal text-sm border text-[#FFC700] border-[#FFC700] rounded-lg bg-transparent flex gap-1 items-center justify-center">
          <Image src="/Play Icon.png" width={15} height={15} />
          <p>Play Demo</p>
        </button>
      </div>
      {/* <Image
        src="/Online education.png"
        className="absolute bottom-0 left-0"
        layout="intrinsic"
        width={250}
        height={250}
      />

      <Image
        src="/Girl studying.png"
        className="absolute bottom-0 right-0 left-0 mx-auto"
        layout="intrinsic"
        width={250}
        height={250}
      /> */}
    </div>
  );
}
