import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as CgIcons from 'react-icons/cg';



export const SidebarData = [
  
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Catégories',
    path: '/1categorie2',
    icon: <CgIcons.CgCarousel />,
    cName: 'nav-text'
  },
  {
    title: 'Produits',
    path: '/admin-dashboard',
    icon: <AiIcons.AiOutlineShoppingCart />,
    cName: 'nav-text'
  },
  {
    title: 'Best-sellers',
    path: '/1New2Prod',
    icon: <AiIcons.AiOutlinePlus />,
    cName: 'nav-text'
  },
  {
    title: 'Sliders',
    path: '/1slidereditk2',
    icon: <BiIcons.BiCarousel />,
    cName: 'nav-text'
  },
  {
    title: 'Ajouter ID',
    path: '/ajoutId',
    icon: "#",
    cName: 'nav-text'
  },
  {
    title: 'Cadeau',
    path: '/c1adea2u',
    icon: <AiIcons.AiOutlineGift/>,
    cName: 'nav-text'
  },
];