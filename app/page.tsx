import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" flex flex-col justify-center items-center text-center gap-4 p-20">
        <h1 className=" text-2xl md:text-4xl font-semibold">
          Prenez le contrôle de vos finances
        </h1>
        <p className="text-gray-500 text-md md:text-sm">
          Suivez vos budgets et vos dépences avec notre application intuitive
        </p>
        <div className="w-full flex justify-center gap-4">
          <Link
            href="/sign-in"
            className="btn btn-sm btn-outline md:btn-md btn-accent"
          >
            Se connecter
          </Link>
          <Link href="/sign-up" className="btn btn-sm md:btn-md btn-accent">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}
