import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Ticket",
};

export default function Page() {
  return (
    <div className="grid min-h-screen place-content-center">
      <div className="text-center mx-4">
        <Link
          href="https://museumbatik.kemdikbud.go.id/reservation"
          target="_blank"
          className="no-underline"
        >
          <button
            type="button"
            className="flex h-40 w-40 items-center justify-center bg-amber-700 rounded-full text-white hover:bg-amber-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 animate-spin-slow"
          >
            <h2>Reservasi Kunjungan</h2>
          </button>
        </Link>
      </div>
    </div>
  );
}
