import Hero from "../components/HomeHero"
import Section from "../components/Sections"

export const getStaticProps = async () => {
  const res = await fetch('https://backends.donnachoice.com/api/category/');
  let sections = await res.json();
  return {
    props: {
      sections: sections
    }
  }
}

export default function Home({ sections }) {
  return (
    <div>
      <Hero />
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 py-8">
          {sections.map((section) => {
            return (
              <Section
                key={section.id}
                img={section.img}
                id={section.id}
                slug={section.slug}
                name={section.name}
              />
            )
          })
          }
        </div>
      </div>
    </div>
  )
}
