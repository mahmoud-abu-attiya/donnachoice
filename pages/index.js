import Category from "../components/Category"
import Hero from "../components/HomeHero"
export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 py-8">
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
        </div>
      </div>
    </div>
  )
}
