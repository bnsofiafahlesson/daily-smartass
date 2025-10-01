import Link from "next/link";
import Card from "./Card";
import Image from "next/image";

export default function GameCard({
  title,
  description,
  link,
  imageUrl,
}: {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}) {
  // TO DO: Update so that it links to an internal page with more details about the game and instead use a icon for external link

  return (
    <>
      <Link href={link} rel="noopener noreferrer">
        <Card>
          <Image src={imageUrl} alt={title} width={500} height={300} />
          <h3 className="text-lg font-semibold mt-2">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </Card>
      </Link>
    </>
  );
}
