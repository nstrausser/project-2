import { 
  LayoutGrid, 
  Package, 
  BarChart3, 
  Settings, 
  Users, 
  Scissors,
  ShieldCheck,
  GraduationCap 
} from 'lucide-react';
import type { NavItem } from './types';

export const mainNavItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutGrid, view: 'dashboard', path: '/' },
  { name: 'Inventory', icon: Package, view: 'inventory', path: '/inventory' },
  { name: 'Installers', icon: Users, view: 'installers', path: '/installers' },
  { name: 'Installations', icon: Scissors, view: 'installations', path: '/installations' },
  { name: 'Quality', icon: ShieldCheck, view: 'quality', path: '/quality' },
  { name: 'Training', icon: GraduationCap, view: 'training', path: '/training' },
  { name: 'Analytics', icon: BarChart3, view: 'analytics', path: '/analytics' },
  { name: 'Settings', icon: Settings, view: 'settings', path: '/settings' },
];