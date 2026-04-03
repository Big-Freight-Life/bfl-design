'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  primaryNav, secondaryNav, productsPanels, aboutPanels,
  mobileTabItems, mobileDrawerItems, mobileDrawerUtility,
  footerNav, isActiveRoute, isMegamenuActive,
} from '@/models/navigation';

export function useNavigation() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMegamenu, setActiveMegamenu] = useState<'products' | 'about' | null>(null);
  const [activePanelId, setActivePanelId] = useState<string | null>(null);

  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const openMegamenu = useCallback((menu: 'products' | 'about') => {
    setActiveMegamenu(menu);
    const panels = menu === 'products' ? productsPanels : aboutPanels;
    setActivePanelId(panels[0]?.id ?? null);
  }, []);

  const closeMegamenu = useCallback(() => {
    setActiveMegamenu(null);
    setActivePanelId(null);
  }, []);

  const isActive = useCallback((href: string) => isActiveRoute(pathname, href), [pathname]);
  const isParentActive = useCallback((megamenu: 'products' | 'about') => isMegamenuActive(pathname, megamenu), [pathname]);

  return {
    pathname,
    primaryNav,
    secondaryNav,
    productsPanels,
    aboutPanels,
    mobileTabItems,
    mobileDrawerItems,
    mobileDrawerUtility,
    footerNav,
    drawerOpen,
    toggleDrawer,
    closeDrawer,
    activeMegamenu,
    activePanelId,
    setActivePanelId,
    openMegamenu,
    closeMegamenu,
    isActive,
    isParentActive,
  };
}
