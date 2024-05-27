"use client";

import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { ButtonSecondary } from "../Button";
import { nav } from "@/config";
import { cn } from "@/lib/utils";

export default function MobileNav() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const menuItems = [...nav.left, ...nav.right];

 return (
  <>
   <ButtonSecondary
    className="burger visible relative h-10 w-10 border-0 bg-transparent lg:hidden"
    aria-label="Toggle menu"
    type="button"
    onClick={() => {
     isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
    }}
   >
    <Bars3BottomLeftIcon data-hide={isMenuOpen} className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-100 text-gray-900 !opacity-100 duration-200 motion-reduce:transition-none dark:text-gray-100" />
    <XMarkIcon data-hide={!isMenuOpen} className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-100 text-gray-900 !opacity-100 duration-200 motion-reduce:transition-none dark:text-gray-100" />
   </ButtonSecondary>
   <div
    className={cn(
     {
      "rendered pointer-events-all !opacity-100": isMenuOpen,
      "pointer-events-none": !isMenuOpen,
     },
     "absolute left-0 top-0 z-[1001] mt-[73px] flex h-screen w-3/4 flex-col opacity-0 duration-200 motion-reduce:transition-none lg:hidden"
    )}
   >
    <div className="h-full border-r-[1px] border-black/10 bg-white px-3.5 shadow duration-200 motion-reduce:transition-none dark:border-neutral-800 dark:bg-[#161617] dark:shadow-2xl">
     <div className="mt-3">
      {menuItems.map((item, index) => {
       return (
        <p
         key={index}
         className={cn(
          {
           "w-0 -translate-x-4 border-transparent opacity-0 dark:border-transparent": !isMenuOpen,
           "w-full translate-x-0 border-gray-200 opacity-100 dark:border-neutral-800": isMenuOpen,
          },
          "group whitespace-nowrap border-b text-sm font-semibold text-gray-900 duration-200 motion-reduce:transition-none dark:text-gray-100"
         )}
         style={{ transitionDelay: `${150 * index - 50}ms` }}
        >
         <Link
          href={item.href}
          key={index}
          className="flex w-auto p-4 pb-4 duration-200 group-hover:pl-6 motion-reduce:transition-none"
          onClick={() => {
           isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
          }}
          target={item.target}
         >
          {item.title}
         </Link>
        </p>
       );
      })}
     </div>
    </div>
   </div>
  </>
 );
}
