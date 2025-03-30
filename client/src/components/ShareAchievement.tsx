import React, { useRef, useState } from 'react';
import { 
  Dialog, 
  DialogContent,

  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Share2, 
  Download,
  Clipboard,
  Check,
  MessageSquare,
  Award
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { toast } from "@/hooks/use-toast";

interface ShareAchievementProps {
  title: string;
  description: string;
  date?: string;
  icon?: React.ReactNode;
  type: 'goal' | 'workout' | 'activity';
  value?: string;
  progress?: number;
  children?: React.ReactNode;
  triggerComponent?: React.ReactNode;
}

export default function ShareAchievement({
  title,
  description,
  date,
  icon,
  type,
  value,
  progress,
  children,
  triggerComponent
}: ShareAchievementProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const achievementRef = useRef<HTMLDivElement>(null);
  
  // Generate the achievement card image
  const generateImage = async () => {
    if (!achievementRef.current) return;
    
    try {
      const dataUrl = await toPng(achievementRef.current, { 
        quality: 0.95,
        backgroundColor: '#0f1116'
      });
      
      saveAs(dataUrl, `${title.toLowerCase().replace(/\s+/g, '-')}-achievement.png`);
      
      toast({
        title: "Success!",
        description: "Achievement card downloaded successfully",
        variant: "default"
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Share the achievement on Twitter
  const shareOnTwitter = () => {
    const text = `I just ${type === 'goal' ? 'reached my goal' : type === 'workout' ? 'completed my workout' : 'logged an activity'}: ${title}! ${description} #fitness #achievement`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };
  
  // Share the achievement on Facebook
  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  // Copy a sharing link to clipboard
  const copyLink = () => {
    const achievementText = `Check out my ${type} achievement: ${title} - ${description}`;
    const url = window.location.href;
    const textToCopy = `${achievementText}\n${url}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Achievement link copied to clipboard",
        variant: "default"
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  // Send via message (uses Web Share API if available)
  const shareViaMessage = () => {
    if (navigator.share) {
      navigator.share({
        title: `Fitness Achievement: ${title}`,
        text: `I just ${type === 'goal' ? 'reached my goal' : type === 'workout' ? 'completed my workout' : 'logged an activity'}: ${title}! ${description}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        title: "Not Supported",
        description: "Direct messaging share is not supported on this device",
        variant: "default"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerComponent || (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 gap-2 group"
          >
            <Share2 className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span>Share Achievement</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Share Your Achievement</DialogTitle>
          <DialogDescription className="text-gray-400">
            Share your fitness milestone with friends and followers
          </DialogDescription>
        </DialogHeader>
        
        {/* Achievement card preview */}
        <div className="p-1 mt-2 mb-4 rounded-lg border border-gray-700 overflow-hidden">
          <div 
            ref={achievementRef} 
            className="w-full px-5 py-6 bg-gray-900 rounded-md bg-gradient-to-br from-gray-900 to-gray-950"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`gradient-${type === 'goal' ? 'purple' : type === 'workout' ? 'blue' : 'green'} p-2 rounded-full mr-3`}>
                  {icon || <Award className="h-5 w-5 text-white" />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-100 text-lg">{title}</h3>
                  {date && <p className="text-xs text-gray-400">{date}</p>}
                </div>
              </div>
              <div className="flex flex-col items-end">
                {value && <span className="text-sm font-semibold text-gray-100">{value}</span>}
                {progress !== undefined && (
                  <div className="w-16 h-1.5 bg-gray-800 rounded-full mt-1">
                    <div 
                      className={`h-full rounded-full ${type === 'goal' ? 'bg-purple-500' : type === 'workout' ? 'bg-blue-500' : 'bg-green-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-300 text-sm">{description}</p>
            
            {/* Watermark */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-3">
              <div className="text-xs text-gray-500">Powered by Fitness Tracker</div>
              <div className="text-xs text-purple-400">#FitnessJourney</div>
            </div>
          </div>
        </div>
        
        {/* Share buttons */}
        <div className="grid grid-cols-4 gap-3">
          <button 
            className="flex flex-col items-center justify-center gap-1 text-xs p-2 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2]"
            onClick={shareOnTwitter}
          >
            <Twitter className="h-5 w-5" />
            <span>Twitter</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center gap-1 text-xs p-2 rounded-lg bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2]"
            onClick={shareOnFacebook}
          >
            <Facebook className="h-5 w-5" />
            <span>Facebook</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center gap-1 text-xs p-2 rounded-lg bg-gray-700/10 hover:bg-gray-700/20 text-gray-300"
            onClick={copyLink}
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Clipboard className="h-5 w-5" />
            )}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
          <button 
            className="flex flex-col items-center justify-center gap-1 text-xs p-2 rounded-lg bg-gray-700/10 hover:bg-gray-700/20 text-gray-300"
            onClick={shareViaMessage}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Message</span>
          </button>
        </div>
        
        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={generateImage}
          >
            <Download className="h-4 w-4" />
            <span>Download Image</span>
          </Button>
          <Button 
            variant="default" 
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}