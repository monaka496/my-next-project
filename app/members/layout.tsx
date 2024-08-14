import Sheet from "@/app/_components/Sheet/index";
import Hero from "@/app/_components/Hero/index";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Members" sub="メンバー" />
      <Sheet>{children}</Sheet>;
    </>
  );
}
