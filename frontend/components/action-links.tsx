import { ScrollText, BookMarked, PartyPopper } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const actions = [
  {
    icon: <ScrollText className="h-8 w-8 text-primary" />,
    title: "Besoin d'un soutien ?",
    description: "Découvrez nos actions de 'hessed qui accompagnent plus de 1000 familles chaque année.",
    link: "/actions",
    linkText: "Je découvre les actions de 'hessed"
  },
  {
    icon: <BookMarked className="h-8 w-8 text-primary" />,
    title: "Envie d'étudier ou de parrainer un Avrekh ?",
    description: "Nos Kollelim sont ouverts à tous ceux qui souhaitent étudier ou soutenir l'étude de la Torah.",
    link: "/kollelim",
    linkText: "Je visite nos Kollelim"
  },
  {
    icon: <PartyPopper className="h-8 w-8 text-primary" />,
    title: "Participer à un gala ?",
    description: "Nos galas annuels à Paris, Jérusalem et Strasbourg sont des moments de partage et de soutien essentiels.",
    link: "/galas",
    linkText: "Je réserve ma place"
  }
];

export default function ActionLinks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <ActionCard 
              key={index}
              icon={action.icon}
              title={action.title}
              description={action.description}
              link={action.link}
              linkText={action.linkText}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ActionCard({
  icon,
  title,
  description,
  link,
  linkText,
  index
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
  index: number;
}) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 overflow-hidden">
      <div className="h-2 bg-primary" />
      <CardHeader className="pt-8">
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-2xl md:text-3xl font-serif mb-2">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pb-6">
        <Link href={link} passHref>
          <Button className="w-full bg-secondary text-primary hover:bg-secondary/80 border-2 border-primary/20 hover:border-primary/50">
            {linkText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}