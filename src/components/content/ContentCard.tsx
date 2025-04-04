import React, { useState } from "react";
import { motion } from "framer-motion";
import { ContentItem } from "@/types/content";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2, Heart } from "lucide-react";

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const renderMedia = () => {
    if (item.media_type === "video") {
      return (
        <video 
          src={item.url}
          poster={item.thumbnail_url || undefined}
          className="w-full h-64 object-cover rounded-t-lg"
          controls={false}
        />
      );
    }
    
    return (
      <img 
        src={item.url} 
        alt={item.title} 
        className="w-full h-64 object-cover rounded-t-lg"
      />
    );
  };

  const renderModalContent = () => {
    if (item.media_type === "video") {
      return (
        <video 
          src={item.url}
          className="max-h-[80vh] max-w-full"
          controls
          autoPlay
        />
      );
    }
    
    return (
      <img 
        src={item.url} 
        alt={item.title} 
        className="max-h-[80vh] max-w-full"
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden group">
        <div className="relative">
          {renderMedia()}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 bg-white/70 rounded-full">
                  <Maximize2 className="h-5 w-5 text-salon-pink-600" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl flex items-center justify-center p-2 bg-black/80">
                {renderModalContent()}
              </DialogContent>
            </Dialog>
          </div>
          <button 
            className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
              liked ? 'bg-salon-pink-100 text-salon-pink-600' : 'bg-white/50 text-gray-600 opacity-0 group-hover:opacity-100'
            }`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-salon-pink-600' : ''}`} />
          </button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg truncate">{item.title}</h3>
          {item.description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
              {item.description}
            </p>
          )}
          <div className="flex items-center mt-2">
            <span className="text-xs px-2 py-1 bg-salon-pink-100 text-salon-pink-800 rounded-full">
              {item.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContentCard;
