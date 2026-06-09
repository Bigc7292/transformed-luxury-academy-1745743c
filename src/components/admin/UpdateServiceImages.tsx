import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { contentService } from '@/services/contentService';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const UpdateServiceImages: React.FC = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleUpdateServiceImages = async () => {
    setIsUpdating(true);

    try {
      // Define the images to add
      const servicesToAdd = [
        {
          title: 'Advanced Facials Service',
          description: 'Luxurious facials for radiant skin',
          url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/facial.jpeg',
          category: 'promotional',
          media_type: 'image',
          page_location: 'services',
          page_section: 'services_showcase',
          meta_title: 'Advanced Facials | Transformed Academy',
          meta_description: 'Luxurious facial treatments for radiant skin at Transformed Academy and Salon.',
          meta_keywords: 'facial, skin treatment, skin care, beauty treatments, salon services',
          active: true,
          is_featured: true
        },
        {
          title: 'Bouncy and 90s Blow Outs Service',
          description: 'Get that perfect voluminous look',
          url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.45.jpeg',
          category: 'promotional',
          media_type: 'image',
          page_location: 'services',
          page_section: 'services_showcase',
          meta_title: 'Bouncy and 90s Blow Outs | Transformed Academy',
          meta_description: 'Get that perfect voluminous look with our professional blow out services at Transformed Academy and Salon.',
          meta_keywords: 'blow out, hair styling, voluminous hair, 90s style, salon services',
          active: true,
          is_featured: true
        },
        {
          title: 'Canula Training Service',
          description: 'Safe and effective canula techniques',
          url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.46.jpeg',
          category: 'promotional',
          media_type: 'image',
          page_location: 'services',
          page_section: 'services_showcase',
          meta_title: 'Canula Training | Transformed Academy',
          meta_description: 'Learn safe and effective canula techniques with our professional training at Transformed Academy.',
          meta_keywords: 'canula training, aesthetics training, beauty training, professional development',
          active: true,
          is_featured: true
        },
        {
          title: 'Hair Extensions Service',
          description: 'Premium hair extensions for added length and volume',
          url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/exstensions.jpeg',
          category: 'promotional',
          media_type: 'image',
          page_location: 'services',
          page_section: 'services_showcase',
          meta_title: 'Hair Extensions Service | Transformed Academy',
          meta_description: 'Premium hair extensions services for added length and volume at Transformed Academy and Salon.',
          meta_keywords: 'hair extensions, hair volume, hair length, salon services',
          active: true,
          is_featured: true
        },
        {
          title: 'Waxing Service',
          description: 'Professional hair removal services',
          url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/waxing.jpeg',
          category: 'promotional',
          media_type: 'image',
          page_location: 'services',
          page_section: 'services_showcase',
          meta_title: 'Waxing Services | Transformed Academy',
          meta_description: 'Professional waxing and hair removal services at Transformed Academy and Salon.',
          meta_keywords: 'waxing, hair removal, beauty treatments, salon services',
          active: true,
          is_featured: true
        },
        {
          title: 'Eyebrows Service',
          description: 'Shaping, tinting, and lamination services',
          url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/eyebrows.jpeg',
          category: 'promotional',
          media_type: 'image',
          page_location: 'services',
          page_section: 'services_showcase',
          meta_title: 'Eyebrow Services | Transformed Academy',
          meta_description: 'Professional eyebrow shaping, tinting, and lamination services at Transformed Academy and Salon.',
          meta_keywords: 'eyebrows, brow lamination, brow tinting, brow shaping, salon services',
          active: true,
          is_featured: true
        },
        {
          title: 'Eyelashes Service',
          description: 'Beautiful lash extensions and lifting',
          url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/eyelashes.jpeg',
          category: 'promotional',
          media_type: 'image',
          page_location: 'services',
          page_section: 'services_showcase',
          meta_title: 'Eyelash Services | Transformed Academy',
          meta_description: 'Beautiful lash extensions and lifting services at Transformed Academy and Salon.',
          meta_keywords: 'eyelashes, lash extensions, lash lifting, beauty treatments, salon services',
          active: true,
          is_featured: true
        }
      ];

      // Add each service image to the database
      let successCount = 0;
      let errorCount = 0;

      for (const service of servicesToAdd) {
        try {
          const result = await contentService.createContent(service);
          if (result.success) {
            successCount++;
          } else {
            errorCount++;
            console.error(`Failed to add ${service.title}: ${result.error}`);
          }
        } catch (error) {
          errorCount++;
          console.error(`Error adding ${service.title}:`, error);
        }
      }

      if (successCount > 0) {
        toast({
          title: "Images Updated",
          description: `Successfully added ${successCount} service images to the database.${errorCount > 0 ? ` ${errorCount} errors occurred.` : ''}`,
        });
      } else {
        toast({
          title: "Update Failed",
          description: "Failed to add service images to the database.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating service images:', error);
      toast({
        title: "Update Failed",
        description: "An unexpected error occurred while updating service images.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="mb-8 border-gold-500/10 bg-zinc-950/20">
      <CardHeader>
        <CardTitle className="text-zinc-100 font-serif">Update Service Images</CardTitle>
        <CardDescription className="text-zinc-400">
          Update service images for waxing, eyelashes, eyebrows, and extensions with new images from S3.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-zinc-400">
            This will add the following images to the database with meta tags and descriptions:
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-350 space-y-1">
            <li>Hair Extensions: https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/exstensions.jpeg</li>
            <li>Waxing: https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/waxing.jpeg</li>
            <li>Eyebrows: https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/eyebrows.jpeg</li>
            <li>Eyelashes: https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/eyelashes.jpeg</li>
            <li>Advanced Facials: https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/facial.jpeg</li>
            <li>Bouncy and 90s Blow Outs: https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.45.jpeg</li>
            <li>Canula Training: https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.46.jpeg</li>
          </ul>
          <Button
            onClick={handleUpdateServiceImages}
            disabled={isUpdating}
            className="w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-black font-semibold"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Images...
              </>
            ) : (
              'Update Service Images'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateServiceImages;
