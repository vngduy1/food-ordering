import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"our story"} mainHeader={"About us"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex-col gap-4">
          <p className=" ">
            Pizza and its variants are among the most popular foods in the
            world. Pizza is sold at a variety of restaurants
          </p>
          <p>
            In 2017, the world pizza market was US$128 billion, and in the US it
            was $44 billion spread over 76,000 pizzerias.
          </p>
          <p>
            Overall, 13% of the U.S. population aged two years and over consumed
            pizza on any given day.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+81123456789"
          >
            +81 12 3456 789
          </a>
        </div>
      </section>
    </>
  );
}
