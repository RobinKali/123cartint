import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Tinten' | 'Wrappen' | 'Detailing' | string;
  categoryLabel: string;
  brand?: string;
  imageUrl: string;
  altText?: string;
}

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || '';
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

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: any) {
  return builder ? builder.image(source) : null;
}

export const fallbackPortfolioItems: PortfolioItem[] = [
  { id: '1', title: 'Mat Zwart Wrap', category: 'Wrappen', categoryLabel: 'Car Wrapping', brand: 'Porsche 911 GT3', imageUrl: '/images/portfolio/mat-zwart-wrap.jpg', altText: 'Porsche 911 GT3 mat zwart gewrapped' },
  { id: '2', title: 'Keramische Coating', category: 'Detailing', categoryLabel: 'Cleaning & Detailing', brand: 'Audi RS6', imageUrl: '/images/portfolio/keramische-coating.jpg', altText: 'Audi RS6 met keramische glascoating' },
  { id: '3', title: 'Ramen Tinten 20%', category: 'Tinten', categoryLabel: 'Ramen Tinten', brand: 'Mercedes G-Klasse', imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop', altText: 'Mercedes G-Klasse getinte autoramen' },
  { id: '4', title: 'Satin Grey Wrap', category: 'Wrappen', categoryLabel: 'Car Wrapping', brand: 'BMW M4', imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop', altText: 'BMW M4 in Satin Grey car wrap' },
  { id: '5', title: 'Interieur Reiniging', category: 'Detailing', categoryLabel: 'Cleaning & Detailing', brand: 'Range Rover', imageUrl: '/images/portfolio/interieur-reiniging.jpg', altText: 'Range Rover dieptereiniging interieur' },
  { id: '6', title: 'Chameleon Tint', category: 'Tinten', categoryLabel: 'Ramen Tinten', brand: 'VW Golf GTI', imageUrl: '/images/portfolio/chameleon-tint.jpg', altText: 'VW Golf GTI met chameleon voorruit folie' },
  { id: '7', title: 'Dechrome & Styling Wrap', category: 'Wrappen', categoryLabel: 'Car Wrapping', brand: 'Audi RS3 Sportback', imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop', altText: 'Audi RS3 met dechrome styling' },
  { id: '8', title: 'Privacy Glass 5%', category: 'Tinten', categoryLabel: 'Ramen Tinten', brand: 'BMW 3 Serie Touring', imageUrl: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=2000&auto=format&fit=crop', altText: 'BMW 3 Serie met 5% privacy glass' },
  { id: '9', title: 'Lakcorrectie & Coating', category: 'Detailing', categoryLabel: 'Cleaning & Detailing', brand: 'Mercedes-AMG GT', imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop', altText: 'Mercedes-AMG GT lakcorrectie en glascoating' }
];

const categoryLabels: Record<string, string> = {
  Tinten: 'Ramen Tinten',
  Wrappen: 'Car Wrapping',
  Detailing: 'Cleaning & Detailing',
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
      brand,
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
        imageUrl = builder.image(item.image).auto('format').fit('max').width(1200).url();
      }

      return {
        id: item._id,
        title: item.title,
        category: item.category || 'Tinten',
        categoryLabel: categoryLabels[item.category] || item.category || 'Vakmanschap',
        brand: item.brand || '',
        imageUrl,
        altText: item.altText || item.title,
      };
    });
  } catch (error) {
    console.warn('[Sanity] Error fetching portfolio items, falling back to local dataset:', error);
    return fallbackPortfolioItems;
  }
}
