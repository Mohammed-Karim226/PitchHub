import NavBar from "../../components/Layouts/NavBar/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="font-work-sans">
      <NavBar />
      {children}
    </main>
  );
}
