"use client";

import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function Home() {
  const router = useRouter();

  return (
    <Loader duration={5} onComplete={() => router.push("/quem-somos")} />
  );
}
