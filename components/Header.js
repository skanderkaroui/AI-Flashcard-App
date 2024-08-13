import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">TriviaCards</div>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="#features"
              className="text-gray-700 hover:text-blue-600"
            >
              Features
            </Link>
          </li>
          <li>
            <Link href="#pricing" className="text-gray-700 hover:text-blue-600">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
