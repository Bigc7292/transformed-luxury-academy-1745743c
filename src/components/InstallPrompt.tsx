import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// Component that captures the beforeinstallprompt event and renders an Install button
const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the default mini‑info bar from appearing on some browsers
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };
    window.addEventListener('beforeinstallprompt', handler as any);
    return () => window.removeEventListener('beforeinstallprompt', handler as any);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    // Show the native install prompt
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // Reset state – the prompt can only be used once
    setDeferredPrompt(null);
    setShowButton(false);
    console.log(`Install prompt outcome: ${outcome}`);
  };

  if (!showButton) return null;

  return (
    <Button
      onClick={handleInstall}
      className="bg-gold-500 text-black hover:bg-gold-400 font-semibold"
    >
      Install App
    </Button>
  );
};

export default InstallPrompt;
