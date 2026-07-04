export default function Home() {
  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome to My Portfolio</h1>
        <p className="text-lg text-gray-300 mb-8">
          Portfolio page is being updated. Check out my blog articles below.
        </p>
        <a href="/blog" className="text-blue-400 hover:text-blue-300 underline text-lg">
          Read my latest articles
        </a>
      </div>
    </div>
  );
}
