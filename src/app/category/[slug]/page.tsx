// app/category/[slug]/page.tsx
import { Metadata } from 'next';
import Categroy from './Category';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  // Await params first
  const { slug } = await params;

  // Capitalize first letter for title
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  return {
    title: `${categoryName} Products - Your Store`,
    description: `Shop ${categoryName} products`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await params first
  const { slug } = await params;
  
  return <Categroy categorySlug={slug} />;
}