import Sheet from "@/app/_components/Sheet/index";
import Hero from "@/app/_components/Hero/index";

export const metadata = {
  title: "メンバー",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero />
      <Sheet>{children}</Sheet>;
    </>
  );
}
