import Button from "@/components/atoms/Button";

export default function Home() {
  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/home-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* White Layer Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-70 z-1"></div>

      {/* Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10 relative text-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            <p>Welcome to CheerCircle!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            <p>Your personalized digital slam book, made just for you!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
            <Button
              disabled={false}
            >
              Create Your Link Now!
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
