import type { LucideIcon } from 'lucide-react';
import type { View } from '@/App';

export type NavItem = {
  name: string;
  icon: LucideIcon;
  view: View;
  path: string;
};

export type SidebarProps = {
  navigation: NavItem[];
  currentView: View;
  setCurrentView: (view: View) => void;
};