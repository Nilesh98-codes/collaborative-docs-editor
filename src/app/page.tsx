import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      Click <Link href="/Documents/123"> <span className="text-blue-500 underline">  here </span></Link> to go to document Id
    </div>

  );
}
export default Home;