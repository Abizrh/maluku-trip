
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

interface DestinationCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  price: number;
  category: string;
}

export function DestinationCard({
  id,
  name,
  location,
  image,
  rating,
  price,
  category,
}: DestinationCardProps) {
  return (
    <Link to={`/destination/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="inline-block px-2 py-1 mb-2 text-xs font-medium bg-jelajah-blue/10 text-jelajah-blue rounded-full">
            {category}
          </div>
          <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{location}</span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="text-jelajah-blue font-semibold">
            Rp {price.toLocaleString()}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
