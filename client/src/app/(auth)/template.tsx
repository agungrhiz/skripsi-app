export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-amber-700">
      {children}
    </div>
  );
}
