interface Filter {
  id: string;
}

interface PriceRange {
  id: string;
  range: string;
}

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  filter_ids: Filter[];
  image_url: string;
  delivery_time_minutes: number;
  price_range_id: string;
  price_range?: PriceRange;
  is_currently_open: boolean;
}

export default Restaurant;
