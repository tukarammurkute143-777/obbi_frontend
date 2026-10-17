import type { RouteCategory } from "@/lib/routes/categories";
import type { RouteImage } from "@/lib/imageService";

/** What the route list, cards and sidebar need. Plain data, so it can be passed
 *  from a Server Component into client components. */
export interface RouteListItem {
  slug: string;
  from: string;
  to: string;
  category: RouteCategory;
  distance: string;
  duration: string;
  popularFor: string;
  image: RouteImage;
}
