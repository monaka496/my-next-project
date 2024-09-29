import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";
import { title } from "process";

export const metadata = {
  title: "新着記事",
};

type Props = {
  children: React.ReactNode;
};

export const revalidate = 60;

export default function NewsLayout({ children }: Props) {
  return (
    <>
      <Hero />
      <Sheet>{children}</Sheet>
    </>
  );
}
