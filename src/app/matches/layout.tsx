export default function MatchesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-light text-black">FACEIT Super Matches</h1>
      </div>
      <div>{children}</div>
    </div>
  );
}
