export interface League {
  id: number;
  name: string;
  country: {
    name: string;
    image_path: string;
  };
  logo_path: string;
  current_season: {
    name: string;
  };
}
