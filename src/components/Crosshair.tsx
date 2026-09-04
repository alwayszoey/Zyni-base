import React, { useEffect, useId, useRef } from 'react';

export interface CrosshairProps {
  color?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export default function Crosshair({ color = 'white', containerRef }: CrosshairProps) {
  const lineHRef = useRef<HTMLDivElement>(null);
  const lineVRef = useRef<HTMLDivElement>(null);
  const rawId = useId().replace(/:/g, '');
  const filterNoiseX = `filter-noise-x-${rawId}`;
  const filterNoiseY = `filter-noise-y-${rawId}`;

  useEffect(() => {
    const container = containerRef?.current ?? null;
    const lineH = lineHRef.current;
    const lineV = lineVRef.current;
    if (!lineH || !lineV) return;

    let animId = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let isVisible = false;

    const show = () => {
      isVisible = true;
      lineH.style.opacity = '1';
      lineV.style.opacity = '1';
    };

    const hide = () => {
      isVisible = false;
      lineH.style.opacity = '0';
      lineV.style.opacity = '0';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (container) {
        const rect = container.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          hide();
          return;
        }
        target.x = e.clientX - rect.left;
        target.y = e.clientY - rect.top;
      } else {
        target.x = e.clientX;
        target.y = e.clientY;
      }

      if (!isVisible) {
        show();
      }
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;

      lineV.style.transform = `translateX(${current.x}px)`;
      lineH.style.transform = `translateY(${current.y}px)`;

      animId = requestAnimationFrame(render);
    };

    lineH.style.opacity = '0';
    lineV.style.opacity = '0';
    lineH.style.transition = 'opacity 0.25s ease';
    lineV.style.transition = 'opacity 0.25s ease';

    const targetScope = container || window;
    targetScope.addEventListener('mousemove', handleMouseMove as EventListener);
    if (container) {
      container.addEventListener('mouseleave', hide);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      targetScope.removeEventListener('mousemove', handleMouseMove as EventListener);
      if (container) {
        container.removeEventListener('mouseleave', hide);
      }
    };
  }, [containerRef]);

  return (
    <div className={`crosshair${containerRef ? ' crosshair--contained' : ''}`} aria-hidden="true">
      <svg className="crosshair__svg">
        <defs>
          <filter id={filterNoiseX}>
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves={1} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id={filterNoiseY}>
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves={1} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div ref={lineHRef} className="crosshair__line-h" style={{ background: color }} />
      <div ref={lineVRef} className="crosshair__line-v" style={{ background: color }} />
    </div>
  );
}
