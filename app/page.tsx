import Image from "next/image";
import Link from "next/link";
import alissa from "@/public/images/col2_delfina_60x50.jpg";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center font-sans">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center space-y-12 border bg-white p-8 md:max-w-7xl md:space-y-16 md:p-16">
        <h1 className="bold w-full text-center text-6xl tracking-wide">
          ALISSA BORSANI
        </h1>

        <nav className="w-full">
          <ul className="flex w-full flex-col items-center border text-xl">
            <li>
              <Link href={"/collection-1"}> Collection I</Link>
            </li>
            <li>
              <Link href={"/collection-2"}> Collection II</Link>
            </li>
            <li>
              <Link href={"/current-work"}> Current Work</Link>
            </li>
          </ul>
        </nav>

        <div className="space-y-12 md:flex md:gap-4 md:space-y-0">
          <div className="relative h-72 w-full border md:h-auto md:flex-1">
            <Image
              src={alissa}
              fill={true}
              alt="alissa"
              sizes="(min-width: 768px) 50vw, 100vw"
              loading="eager"
            />
          </div>

          <div className="w-full space-y-8 border md:flex-1">
            <h2 className="w-full text-center text-4xl">About me</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae commodi porro error iste, accusamus blanditiis. Ipsum
              illo asperiores, nobis culpa ab nesciunt animi cum autem doloribus
              maxime minima ea. Consequuntur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Eos odio minus reiciendis a corporis
              nulla distinctio! Eius cupiditate dignissimos soluta molestiae
              aliquam perferendis, inventore similique, aperiam maxime et
              repudiandae facilis.
            </p>
          </div>
        </div>

        <blockquote className="border text-4xl italic">
          &quot;Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Accusamus rem consequuntur odit officia provident. Quia ullam quam
          alias ipsam quasi doloribus facere adipisci velit! Esse corrupti saepe
          dicta tenetur totam.&quot;
        </blockquote>
      </main>
    </div>
  );
}
