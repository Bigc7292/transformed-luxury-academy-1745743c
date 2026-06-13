import { useState, useEffect } from 'react';

// Capture the beforeinstallprompt event globally at the module level
// to prevent missing it if it fires before the component mounts
let globalDeferredPrompt: any = null;

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    globalDeferredPrompt = e;
    // Dispatch a custom event in case components need to know it became available
    window.dispatchEvent(new CustomEvent('pwa-installprompt-captured'));
  });
}

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(globalDeferredPrompt);
  const [isInstallable, setIsInstallable] = useState(!!globalDeferredPrompt);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  
  const [platformInfo, setPlatformInfo] = useState({
    isAndroid: false,
    isIOS: false,
    isInApp: false,
  });

  useEffect(() => {
    // Detect platform
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isInApp = /FBAN|FBAV|Instagram|WhatsApp|wv/i.test(ua);

    setPlatformInfo({ isAndroid, isIOS, isInApp });

    // If we already captured it globally, sync it
    if (globalDeferredPrompt) {
      setDeferredPrompt(globalDeferredPrompt);
      setIsInstallable(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      globalDeferredPrompt = e;
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleGlobalPromptCaptured = () => {
      if (globalDeferredPrompt) {
        setDeferredPrompt(globalDeferredPrompt);
        setIsInstallable(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('pwa-installprompt-captured', handleGlobalPromptCaptured);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('pwa-installprompt-captured', handleGlobalPromptCaptured);
    };
  }, []);

  const installApp = async () => {
    const promptEvent = deferredPrompt || globalDeferredPrompt;
    if (promptEvent) {
      try {
        // Show the native browser prompt
        await promptEvent.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await promptEvent.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        // Clear the prompt event as it can only be used once
        globalDeferredPrompt = null;
        setDeferredPrompt(null);
        setIsInstallable(false);
        return;
      } catch (err) {
        console.error('Failed to prompt native install:', err);
        // On error (e.g. prompt already consumed or blocked), clear state and fall back to manual guide
        globalDeferredPrompt = null;
        setDeferredPrompt(null);
        setIsInstallable(false);
      }
    }
    
    // Trigger custom overlay instructions guide if native prompt not supported or fails
    setShowInstallGuide(true);
  };

  return { 
    isInstallable: isInstallable || !!deferredPrompt || !!globalDeferredPrompt, 
    installApp, 
    showInstallGuide, 
    setShowInstallGuide,
    ...platformInfo 
  };
};

