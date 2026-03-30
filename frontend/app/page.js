import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Movie Management System</h1>
      <p>
        This is a training project with intentional code issues for junior
        developers.
      </p>
      <div className="flex gap-3">
        <Link href="/movies">Go to Movies</Link>
        <Link href="/login">Go to Login</Link>
      </div>
    </div>
  );
}
