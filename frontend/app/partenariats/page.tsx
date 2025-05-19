import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, ArrowRight, School, User } from "lucide-react";

export default function Partenariats() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <span className="inline-block bg-primary/10 text-primary font-semibold rounded-full px-4 py-1 mb-4">
            PARTENAIRES
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Nos Partenariats</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Darkei Elyahou collabore avec plusieurs organisations partageant nos valeurs et notre engagement envers la communauté.
          </p>
        </div>

        {/* Partnership Cards */}
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 mb-16">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <School className="h-5 w-5 text-primary" />
                <CardTitle>Beth Sandler</CardTitle>
              </div>
              <CardDescription>Kollel intensif pour futurs rabbins</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Une structure exigeante qui forme des rabbanim certifiés, fondée à la mémoire de Rav Yonathan Sandler z"l. Bien que juridiquement indépendante de Darkei Elyahou, cette initiative est co-dirigée par Shemouel Marciano.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/partenariats/beth-sandler">
                <Button variant="outline" className="w-full flex items-center justify-between">
                  <span>Découvrir</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Metarei Halev</CardTitle>
              </div>
              <CardDescription>Soutien aux jeunes filles francophones</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>
                Un partenariat avec l'association Metarei Halev, dirigée par Guila Journo, créant un cadre éducatif et protecteur pour les jeunes filles francophones en Israël, souvent en perte de repères culturels.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/partenariats/metarei-halev">
                <Button variant="outline" className="w-full flex items-center justify-between">
                  <span>Découvrir</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary/5 p-8 rounded-lg">
          <div className="mb-6">
            <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-serif mb-2">Devenez partenaire</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vous représentez une organisation qui partage nos valeurs et notre mission ? Nous sommes toujours ouverts à de nouvelles collaborations qui peuvent enrichir notre impact communautaire.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground">
              Nous contacter
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
