import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const Rightsidebar = () => {
  return (
    <section className="right_sidebar text-white-1">
      <div className="flex gap-5 mb-4 justify-between items-center">
        <Image
          src="/icons/avatar.svg"
          alt="player_img"
          width={60}
          height={60}
          className="rounded-full "
        />
        <div className="flex items-center gap-2.5">
          <span className="text-16 font-semibold capitalize ">User name</span>
          <Image
            src="/icons/right-arrow.svg"
            alt="arrow"
            width={30}
            height={30}
          ></Image>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-16 ">Fans Also Like</p>
          <Button>
            <span className="text-red-500 font-semibold text-13">See all</span>
          </Button>
        </div>
        <div className="w-[90%] height-[600px] border">
          <Image
            src="/images/podcaster.png"
            alt="Suggestion"
            width={200}
            height={400}
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default Rightsidebar;
