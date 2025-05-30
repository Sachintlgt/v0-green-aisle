import Image from "next/image"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple Steps to Sustainable Celebrations
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy to plan a beautiful, eco-friendly wedding while saving money.
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-12 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl font-bold text-green-700">1</span>
            </div>
            <h3 className="text-xl font-bold">Input Your Wedding Details</h3>
            <p className="text-muted-foreground">
              Enter your wedding date and location to find available resources and vendors in your area.
            </p>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Wedding details form"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl font-bold text-green-700">2</span>
            </div>
            <h3 className="text-xl font-bold">Connect & Browse Options</h3>
            <p className="text-muted-foreground">
              Find couples with similar dates or venues, then explore shared decor and vendor opportunities together.
            </p>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Browsing available wedding elements"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl font-bold text-green-700">3</span>
            </div>
            <h3 className="text-xl font-bold">Coordinate and Celebrate</h3>
            <p className="text-muted-foreground">
              Book your selections, coordinate logistics, and enjoy your beautiful, sustainable wedding day.
            </p>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Sustainable wedding celebration"
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
