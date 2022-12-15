import axios from "axios";
import Hero from "../components/HomeHero"
import Section from "../components/Sections"
import { useState, useEffect } from "react";
import HomeP from "../components/placeholder/HomeP";
import HomeHero from "../components/HomeHero";

export default function Home() {
  const [sections , setSections] = useState([])
  const [loading , setLoading ] = useState(true)
  useEffect(() => {
    axios.get("https://backends.donnachoice.com/api/category/")
    .then(res => {
      // console.log(res.data);
      setSections(res.data)
      setLoading(false);
    })
  }, [])
  if (loading) {
    return <HomeP />
  }
  return (
    <div>
      {/* <Hero /> */}
      <HomeHero />
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 py-8">
          {sections?.map((section) => {
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
