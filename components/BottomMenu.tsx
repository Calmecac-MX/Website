"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCurtain } from "./CurtainContext";

interface BottomMenuProps {
  activeSlide?: number;
}

export default function BottomMenu({ activeSlide }: BottomMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { triggerCurtain } = useCurtain();

  const isHome = pathname === "/";
  const isNosotros = pathname === "/nosotros";
  const isQueHacemos = pathname === "/que-hacemos";
  const isElPlan = pathname === "/el-plan";
  const isConvocatoria = pathname === "/convocatoria";
  const isContacto = pathname === "/contacto";

  const items = [
    { name: "Nosotros", id: "nosotros-hero", slideIdx: 0, styleClass: "btn-nosotros" },
    { name: "¿Qué hacemos?", id: "estructura", slideIdx: 1, styleClass: "btn-hacemos" },
    { name: "El Plan", id: "plan", slideIdx: 2, styleClass: "btn-plan" },
    { name: "Convocatoria", id: "callout", slideIdx: 3, styleClass: "btn-convocatoria" },
    { name: "Contacto", id: "contacto", slideIdx: 5, styleClass: "btn-contacto" },
  ];

  // Helper to determine href and active state for each item
  const menuData = items.map((item) => {
    let isActive = false;

    if (isNosotros) {
      if (item.name === "Nosotros" && (activeSlide === undefined || activeSlide < 4)) {
        isActive = true;
      } else if (item.name === "Contacto" && activeSlide !== undefined && activeSlide >= 4) {
        isActive = true;
      }
    } else if (isQueHacemos) {
      if (item.name === "¿Qué hacemos?" && (activeSlide === undefined || activeSlide < 4)) {
        isActive = true;
      } else if (item.name === "Contacto" && activeSlide !== undefined && activeSlide >= 4) {
        isActive = true;
      }
    } else if (isElPlan) {
      if (item.name === "El Plan" && (activeSlide === undefined || activeSlide < 4)) {
        isActive = true;
      } else if (item.name === "Contacto" && activeSlide !== undefined && activeSlide >= 4) {
        isActive = true;
      }
    } else if (isConvocatoria) {
      if (item.name === "Convocatoria" && (activeSlide === undefined || activeSlide < 4)) {
        isActive = true;
      } else if (item.name === "Contacto" && activeSlide !== undefined && activeSlide >= 4) {
        isActive = true;
      }
    } else if (isContacto) {
      if (item.name === "Contacto") {
        isActive = true;
      }
    } else {
      if (activeSlide !== undefined) {
        if (item.slideIdx === 0 && activeSlide === 0) {
          isActive = true;
        } else if (item.slideIdx === 1 && activeSlide === 1) {
          isActive = true;
        } else if (item.slideIdx === 2 && activeSlide === 2) {
          isActive = true;
        } else if (item.slideIdx === 3 && (activeSlide === 3 || activeSlide === 4)) {
          isActive = true;
        } else if (item.slideIdx === 5 && (activeSlide === 5 || activeSlide === 6)) {
          isActive = true;
        }
      }
    }

    let href = "";
    if (isNosotros) {
      if (item.name === "Nosotros") {
        href = "#nosotros-hero";
      } else if (item.name === "Contacto") {
        href = "/contacto";
      } else if (item.name === "¿Qué hacemos?") {
        href = "/que-hacemos";
      } else if (item.name === "El Plan") {
        href = "/el-plan";
      } else if (item.name === "Convocatoria") {
        href = "/convocatoria";
      } else {
        href = `/#${item.id}`;
      }
    } else if (isQueHacemos) {
      if (item.name === "¿Qué hacemos?") {
        href = "#que-hacemos-hero";
      } else if (item.name === "Contacto") {
        href = "/contacto";
      } else if (item.name === "Nosotros") {
        href = "/nosotros";
      } else if (item.name === "El Plan") {
        href = "/el-plan";
      } else if (item.name === "Convocatoria") {
        href = "/convocatoria";
      } else {
        href = `/#${item.id}`;
      }
    } else if (isElPlan) {
      if (item.name === "El Plan") {
        href = "#plan-hero";
      } else if (item.name === "Contacto") {
        href = "/contacto";
      } else if (item.name === "Nosotros") {
        href = "/nosotros";
      } else if (item.name === "¿Qué hacemos?") {
        href = "/que-hacemos";
      } else if (item.name === "Convocatoria") {
        href = "/convocatoria";
      } else {
        href = `/#${item.id}`;
      }
    } else if (isConvocatoria) {
      if (item.name === "Convocatoria") {
        href = "#convocatoria-hero";
      } else if (item.name === "Contacto") {
        href = "/contacto";
      } else if (item.name === "Nosotros") {
        href = "/nosotros";
      } else if (item.name === "¿Qué hacemos?") {
        href = "/que-hacemos";
      } else if (item.name === "El Plan") {
        href = "/el-plan";
      } else {
        href = `/#${item.id}`;
      }
    } else if (isContacto) {
      if (item.name === "Contacto") {
        href = "#contacto";
      } else if (item.name === "Nosotros") {
        href = "/nosotros";
      } else if (item.name === "¿Qué hacemos?") {
        href = "/que-hacemos";
      } else if (item.name === "El Plan") {
        href = "/el-plan";
      } else if (item.name === "Convocatoria") {
        href = "/convocatoria";
      } else {
        href = `/#${item.id}`;
      }
    } else {
      if (item.name === "Nosotros") {
        href = "/nosotros";
      } else if (item.name === "¿Qué hacemos?") {
        href = "/que-hacemos";
      } else if (item.name === "El Plan") {
        href = "/el-plan";
      } else if (item.name === "Convocatoria") {
        href = "/convocatoria";
      } else if (item.name === "Contacto") {
        href = "/contacto";
      } else {
        href = isHome ? `#${item.id}` : `/#${item.id}`;
      }
    }

    return { ...item, href, isActive };
  });

  return (
    <>
      {/* Desktop Bottom Menu */}
      <div className="bottom-menu-bar bottom-menu-desktop" id="bottom-fixed-menu">
        <nav className="bottom-menu-container">
          {menuData.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`bottom-menu-btn ${item.styleClass} ${item.isActive ? "active" : ""}`}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="mobile-bottom-nav-bar">
        <button
          onClick={() => triggerCurtain("/aplica")}
          className="mobile-comenzar-btn cursor-pointer bg-transparent border-0 font-inherit"
        >
          Comenzar
        </button>
        <button
          className={`mobile-hamburger-btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú de navegación"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Full-Screen Overlay Menu */}
      <div className={`mobile-menu-overlay ${isOpen ? "active" : ""}`}>
        <nav className="mobile-overlay-menu-container">
          {menuData.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="mobile-overlay-menu-item"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
