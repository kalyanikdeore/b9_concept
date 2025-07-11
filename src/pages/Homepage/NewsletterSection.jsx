export default function NewsletterSection() {
  return (
    <section className=" bg-gradient-to-r from-[#C5C6C7] via-[#AAA7AD] to-[#DAD8C9]  py-10 px-4 text-white text-center">
      <div className="max-w-4xl  h-26 mx-auto flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-4xl font-bold mb-4 md:mb-0">Join Our Newsletter</h2>
        <div className="flex w-full md:w-auto bg-white rounded-lg overflow-hidden">
          <span className="flex items-center px-3 text-gray-500">✈️</span>
          <input
            type="email"
            placeholder="Enter Your Email"
            className=" text-gray-700 outline-none"
          />
          <button className="bg-gray-800 text-2xl text-white-600 px-4 py-2 ">
            Subscribe Now
          </button>
        </div>
      </div>
    </section>
  );
}
