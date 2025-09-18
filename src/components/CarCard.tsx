import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Fuel, Users, Zap, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CarCardProps {
  car: {
    id: string;
    name: string;
    brand: string;
    price: number;
    rentPrice?: number;
    image: string;
    year: number;
    fuel: string;
    seats: number;
    acceleration: string;
    type: 'buy' | 'rent' | 'both';
    featured?: boolean;
    status: 'available' | 'rented' | 'sold';
  };
  mode?: 'buy' | 'rent';
}

const CarCard = ({ car, mode = 'buy' }: CarCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: `${car.brand} ${car.name} ${isFavorite ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  const handleBuyRent = () => {
    if (car.status !== 'available') {
      toast({
        title: "Unavailable",
        description: `This ${car.brand} ${car.name} is currently ${car.status}.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: mode === 'rent' ? "Rent Request" : "Purchase Request",
      description: `Processing your ${mode} request for ${car.brand} ${car.name}.`,
    });
  };

  const handleViewDetails = () => {
    toast({
      title: "Car Details",
      description: `Viewing detailed information for ${car.brand} ${car.name}.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-[rgba(34,197,94,0.12)] text-[rgba(34,197,94,0.95)] border border-[rgba(34,197,94,0.12)]';
      case 'rented': return 'bg-[rgba(0,122,255,0.10)] text-[rgba(0,122,255,0.95)] border border-[rgba(0,122,255,0.12)]';
      case 'sold': return 'bg-[rgba(255,69,96,0.08)] text-[rgba(255,69,96,0.95)] border border-[rgba(255,69,96,0.06)]';
      default: return 'bg-[rgba(34,197,94,0.12)] text-[rgba(34,197,94,0.95)]';
    }
  };

  return (
    <div
      className="car-card group relative rounded-2xl overflow-hidden border"
      style={{
        background: '#050508',
        borderColor: 'rgba(124,58,237,0.18)',
        boxShadow: '0 6px 30px rgba(124,58,237,0.08), inset 0 0 30px rgba(0,0,0,0.6)',
        transition: 'transform .28s cubic-bezier(.2,.9,.2,1), box-shadow .28s',
      }}
    >
      {/* Neon halo */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: '12px',
          boxShadow: '0 8px 40px rgba(124,58,237,0.06), 0 0 18px rgba(77,163,255,0.05)',
          zIndex: 0,
        }}
      />

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ zIndex: 10 }}>
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
          {car.featured && (
            <Badge className="bg-[rgba(124,58,237,0.14)] text-[rgba(124,58,237,0.95)] border border-[rgba(124,58,237,0.08)]">
              Featured
            </Badge>
          )}
          <Badge className={`${getStatusColor(car.status)}`}>
            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
          </Badge>
        </div>

        {/* Favorite */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-transparent hover:bg-[rgba(255,255,255,0.08)] text-white"
          onClick={handleFavorite}
          style={{ zIndex: 20 }}
        >
          <Heart
            className={`h-4 w-4 transition-all ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`}
          />
        </Button>

        {/* Price */}
        <div
          className="absolute bottom-4 left-4 rounded-lg px-3 py-2"
          style={{
            background: 'linear-gradient(180deg, rgba(10,10,12,0.7), rgba(10,10,12,0.55))',
            border: '1px solid rgba(124,58,237,0.12)',
            backdropFilter: 'blur(6px)',
            zIndex: 20,
          }}
        >
          <div className="text-white font-bold text-lg">
            {mode === 'rent' && car.rentPrice
              ? `${formatPrice(car.rentPrice)}/day`
              : formatPrice(car.price)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6" style={{ zIndex: 10 }}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white group-hover:text-[rgba(124,58,237,0.95)] transition-colors">
            {car.brand} {car.name}
          </h3>
          <span className="text-sm text-[rgba(255,255,255,0.6)]">{car.year}</span>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-[rgba(255,255,255,0.7)]">
          <div className="flex items-center space-x-2"><Fuel className="h-4 w-4 text-violet-400" /><span>{car.fuel}</span></div>
          <div className="flex items-center space-x-2"><Users className="h-4 w-4 text-violet-400" /><span>{car.seats} seats</span></div>
          <div className="flex items-center space-x-2"><Zap className="h-4 w-4 text-violet-400" /><span>{car.acceleration}</span></div>
          <div className="flex items-center space-x-2"><Calendar className="h-4 w-4 text-violet-400" /><span>{car.year}</span></div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {/* Secondary */}
          <Button
            className="flex-1 bg-transparent text-white border border-[rgba(124,58,237,0.4)] 
                       hover:bg-[rgba(124,58,237,0.08)] hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] 
                       hover:scale-[1.03] transform transition-all"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          {/* Primary */}
          <Button
            className="flex-1 bg-gradient-to-r from-violet-600 to-cyan-500 
                       text-white font-semibold 
                       shadow-[0_0_15px_rgba(124,58,237,0.6)] 
                       hover:shadow-[0_0_35px_rgba(124,58,237,0.9)] 
                       hover:scale-105 transform transition-all"
            disabled={car.status !== 'available'}
            onClick={handleBuyRent}
          >
            {car.type === 'rent' ? 'Rent Now' : 'Buy Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
