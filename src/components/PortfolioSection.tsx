import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';
import { miniProjects, portfolioProjects } from '../data';
import { PortfolioProject } from '../types';
import FadeContent from './FadeContent';

function FeatureCheckIcon() {
  return (
    <svg className="portfolio-feature-icon" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M4.5 8.2 6.8 10.5 11.5 5.5"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const highlightKeywords = ['สลิปเช็คสลิปไม่อั้น', 'Real-time', 'Multi-tenancy'];

function formatFeature(text: string) {
  const match = highlightKeywords.find((k) => text.includes(k));
  if (!match) return text;
  const [before, after] = text.split(match);
  return (
    <>
      {before}
      <span className="portfolio-feature-highlight">{match}</span>
      {after}
    </>
  );
}

function PortfolioCarousel({
  alt,
  slides,
  caption
}: {
  alt: string;
  slides: string[];
  caption?: React.ReactNode;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Manual carousel: NO autoplay so images do not slide by themselves
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: false,
    containScroll: false
  });

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi?.scrollPrev();
    },
    [emblaApi]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi?.scrollNext();
    },
    [emblaApi]
  );

  const getSlideRelation = (idx: number) => {
    if (slides.length <= 1) return 'center';
    const total = slides.length;
    let diff = idx - selectedIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;

    if (diff === 0) return 'center';
    if (diff === -1) return 'left';
    if (diff === 1) return 'right';
    return 'distant';
  };

  return (
    <div className="portfolio-carousel">
      <div className="portfolio-carousel__stage">
        <div className="portfolio-carousel__viewport" ref={emblaRef}>
          <div className="portfolio-carousel__container">
            {slides.map((src, idx) => {
              const relation = getSlideRelation(idx);
              const isCenter = relation === 'center';
              const isLeft = relation === 'left';
              const isRight = relation === 'right';

              return (
                <div
                  key={src}
                  className={`portfolio-carousel__slide portfolio-carousel__slide--${relation}`}
                  onClick={() => {
                    if (isLeft) {
                      emblaApi?.scrollPrev();
                    } else if (isRight) {
                      emblaApi?.scrollNext();
                    } else if (!isCenter) {
                      emblaApi?.scrollTo(idx);
                    }
                  }}
                  role={!isCenter ? 'button' : undefined}
                  tabIndex={!isCenter ? 0 : undefined}
                  aria-label={isLeft ? 'ดูภาพก่อนหน้า' : isRight ? 'ดูภาพถัดไป' : undefined}
                >
                  <div className="portfolio-carousel__card">
                    <img
                      src={src}
                      alt={`${alt} ${idx + 1}`}
                      className="portfolio-visual__img"
                      loading="eager"
                      draggable={false}
                      onError={(e) => {
                        console.warn('Failed to load portfolio image:', src);
                      }}
                    />
                    {!isCenter && (
                      <div className="portfolio-carousel__slide-tint" aria-hidden="true" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="portfolio-carousel__nav-btn portfolio-carousel__nav-btn--prev"
              aria-label="ภาพก่อนหน้า"
              onClick={handlePrev}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="portfolio-carousel__nav-btn portfolio-carousel__nav-btn--next"
              aria-label="ภาพถัดไป"
              onClick={handleNext}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {caption && <div className="portfolio-carousel__caption">{caption}</div>}
      </div>

      {slides.length > 1 && (
        <div className="portfolio-carousel__dots">
          {slides.map((src, idx) => (
            <button
              key={src}
              type="button"
              className={`portfolio-carousel__dot${idx === selectedIndex ? ' is-active' : ''}`}
              aria-label={`ภาพที่ ${idx + 1}`}
              aria-current={idx === selectedIndex ? 'true' : undefined}
              onClick={() => emblaApi?.scrollTo(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PortfolioCard({
  project,
  showCta = true,
  compact = false
}: {
  project: PortfolioProject;
  showCta?: boolean;
  compact?: boolean;
  key?: React.Key;
}) {
  const imagePos = project.imagePosition ?? 'right';

  const titleBlock = (
    <>
      <h3 className="portfolio-card-title">
        {project.logo && (
          <img
            src={project.logo}
            alt=""
            className={`portfolio-card-logo${project.logoSize === 'sm' ? ' portfolio-card-logo--sm' : ''}`}
            aria-hidden="true"
          />
        )}
        {project.title}
      </h3>
      <p className="portfolio-card-categories">{project.categories.join(' / ')}</p>
    </>
  );

  const copyBlock = (
    <FadeContent
      className="portfolio-card-copy"
      blur
      duration={1000}
      delay={80}
      threshold={0.12}
    >
      {titleBlock}
      {!compact && <p className="portfolio-card-desc">{project.desc}</p>}
      {!compact && (
        <ul className="portfolio-features">
          {project.features.map((feat) => (
            <li key={feat}>
              <FeatureCheckIcon />
              {formatFeature(feat)}
            </li>
          ))}
        </ul>
      )}
    </FadeContent>
  );

  const visualBlock = (
    <FadeContent
      className="portfolio-card-visual"
      blur
      duration={1200}
      delay={200}
      threshold={0.1}
    >
      <div className="portfolio-visual">
        <PortfolioCarousel alt={project.title} slides={project.slides} />
      </div>
    </FadeContent>
  );

  if (compact) {
    return (
      <article
        className={`portfolio-card portfolio-card--compact${
          project.spatialTilt ? ` portfolio-card--spatial portfolio-card--spatial-${project.spatialTilt}` : ''
        }`}
      >
        <div className="portfolio-card-spatial-ground" aria-hidden="true" />
        <div className="portfolio-card-spatial-inner">
          <FadeContent blur duration={1200} delay={200} threshold={0.1}>
            <div className="portfolio-visual">
              <PortfolioCarousel
                alt={project.title}
                slides={project.slides}
                caption={<div className="portfolio-card-caption">{titleBlock}</div>}
              />
            </div>
          </FadeContent>
        </div>
      </article>
    );
  }

  return (
    <article className="portfolio-card">
      <div className="portfolio-card-glow" aria-hidden="true" />
      <div
        className={`portfolio-card-inner${
          imagePos === 'left' ? ' portfolio-card-inner--image-left' : ''
        }`}
      >
        {imagePos === 'left' ? (
          <>
            {visualBlock}
            {copyBlock}
          </>
        ) : (
          <>
            {copyBlock}
            {visualBlock}
          </>
        )}
      </div>

      {showCta && (
        <div className="portfolio-card-footer">
          <FadeContent blur duration={1000} delay={160} threshold={0.12}>
            <a
              href={project.url}
              className="btn-depth btn-depth-primary"
              target="_blank"
              rel="noreferrer"
            >
              <span className="btn-depth-shadow" aria-hidden="true" />
              <span className="btn-depth-face">เยี่ยมชมเว็บไซต์ ➔</span>
            </a>
          </FadeContent>
        </div>
      )}
    </article>
  );
}

export default function PortfolioSection() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-banner">
        <p className="portfolio-eyebrow">ผลงานของเรา</p>
        <h2 className="portfolio-heading">
          โปรดักต์ที่เรา<span className="portfolio-heading-accent">พัฒนาเอง</span>
        </h2>
        <p className="portfolio-subtitle">
          ตอบโจทย์ทุกความต้องการ ใช้งานง่าย ลื่นไหล และเป็นมิตรกับทุกคน
        </p>
      </div>

      <div className="portfolio-list">
        {portfolioProjects.map((proj) => (
          <PortfolioCard key={proj.title} project={proj} />
        ))}
      </div>

      <div className="portfolio-mini">
        <div className="portfolio-mini-header">
          <h3 className="portfolio-mini-heading">
            มินิโปรเจกต์
            <span className="portfolio-mini-heading-en">(Mini Project)</span>
          </h3>
        </div>

        <div className="portfolio-mini-list">
          {miniProjects.map((proj) => (
            <PortfolioCard key={proj.title} project={proj} showCta={false} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
