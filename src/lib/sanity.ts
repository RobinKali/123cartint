import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Tinten' | 'Wrappen' | 'Detailing' | 'De-Chrome' | string;
  categoryLabel: string;
  imageUrl: string;
  altText?: string;
}

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || 'lwzdyp6o';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-03-01';

export const isSanityConfigured = Boolean(projectId && projectId.trim().length > 0);

export const sanityClient = isSanityConfigured
  ? createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  })
  : null;

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  return builder ? builder.image(source) : null;
}

export const fallbackPortfolioItems: PortfolioItem[] = [
  { id: '1', title: 'Mat Zwart Wrap', category: 'Wrappen', categoryLabel: 'Car Wrapping', imageUrl: '/images/portfolio/mat-zwart-wrap.jpg', altText: 'Porsche 911 mat zwart gewrapped' },
  { id: '2', title: 'Keramische Coating', category: 'Detailing', categoryLabel: 'Cleaning & Detailing', imageUrl: '/images/portfolio/keramische-coating.jpg', altText: 'Audi RS6 met keramische glascoating' },
  { id: '3', title: 'Ramen Tinten 20%', category: 'Tinten', categoryLabel: 'Ramen Tinten', imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop', altText: 'Mercedes getinte autoramen' },
  { id: '4', title: 'Black De-Chrome', category: 'De-Chrome', categoryLabel: 'De-Chrome', imageUrl: '/de-chrome-hero.jpg', altText: 'Auto De-Chrome Black' },
  { id: '5', title: 'Interieur Reiniging', category: 'Detailing', categoryLabel: 'Cleaning & Detailing', imageUrl: '/images/portfolio/interieur-reiniging.jpg', altText: 'Range Rover dieptereiniging interieur' },
  { id: '6', title: 'Chameleon Tint', category: 'Tinten', categoryLabel: 'Ramen Tinten', imageUrl: '/images/portfolio/chameleon-tint.jpg', altText: 'VW Golf GTI met chameleon voorruit folie' },
  { id: '7', title: 'De-Chrome & Styling Wrap', category: 'Wrappen', categoryLabel: 'Car Wrapping', imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop', altText: 'Audi R8 met De-Chrome styling' },
  { id: '8', title: 'Privacy Glass 5%', category: 'Tinten', categoryLabel: 'Ramen Tinten', imageUrl: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=2000&auto=format&fit=crop', altText: 'BMW 3 Serie met 5% privacy glass' },
  { id: '9', title: 'Lakcorrectie & Coating', category: 'Detailing', categoryLabel: 'Cleaning & Detailing', imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop', altText: 'Mercedes-AMG GT lakcorrectie en glascoating' }
];

const categoryLabels: Record<string, string> = {
  Tinten: 'Ramen Tinten',
  Wrappen: 'Car Wrapping',
  Detailing: 'Cleaning & Detailing',
  'De-Chrome': 'De-Chrome',
  Dechrome: 'De-Chrome',
};

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  if (!sanityClient || !isSanityConfigured) {
    return fallbackPortfolioItems;
  }

  try {
    const query = `*[_type == "portfolioItem"] | order(_createdAt desc) {
      _id,
      title,
      category,
      image,
      altText
    }`;

    const items = await sanityClient.fetch(query);

    if (!items || items.length === 0) {
      return fallbackPortfolioItems;
    }

    return items.map((item: any) => {
      let imageUrl = '/images/portfolio/mat-zwart-wrap.jpg';
      if (item.image && builder) {
        try {
          imageUrl = builder.image(item.image).auto('format').fit('max').width(1200).url();
        } catch {
          imageUrl = '/images/portfolio/mat-zwart-wrap.jpg';
        }
      }

      return {
        id: item._id,
        title: item.title,
        category: item.category || 'Tinten',
        categoryLabel: categoryLabels[item.category] || item.category || 'Vakmanschap',
        imageUrl,
        altText: item.altText || item.title,
      };
    });
  } catch (error) {
    console.warn('[Sanity] Error fetching portfolio items, falling back to local dataset:', error);
    return fallbackPortfolioItems;
  }
}
