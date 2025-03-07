import HeaderComponents from "@/components/HeaderComponents";
import MainComponents from "@/components/MainComponents";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-inter)]"> 
      <HeaderComponents/>
      <MainComponents />
      </div> 
  );
}
