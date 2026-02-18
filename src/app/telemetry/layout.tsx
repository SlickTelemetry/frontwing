export default function Layout({
  circuit,
  children,
}: {
  circuit: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {circuit}
      {children}
    </>
  );
}
