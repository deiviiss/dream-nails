export const Footer = () => {
  return (
    <footer className="w-full bg-monedex-secondary text-monedex-light pt-10 pb-5">
      <div className="container px-4 md:px-6 pr-16">
        <div className="grid grid-cols-1">
          {/* About Us Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight text-white">About</h2>
            <p className="flex flex-col space-y-3">
              Our platform offers a simple and organized way to track and manage your expenses, helping you gain better control over your personal finances and make informed decisions for the future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
