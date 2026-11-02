import React, { useState, useEffect, useRef } from "react";

export default function Numbers() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({ collections: 0, billions: 0, countries: 0, years: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateNumbers();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 2000;
    const start = performance.now();

    const targets = { collections: 200, billions: 2.8, countries: 47, years: 15 };

    const frame = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(2, -10 * progress);

      setCounts({
        collections: Math.floor(targets.collections * ease),
        billions: (targets.billions * ease).toFixed(1),
        countries: Math.floor(targets.countries * ease),
        years: Math.floor(targets.years * ease)
      });

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setCounts(targets);
      }
    };

    requestAnimationFrame(frame);
  };

  return (
    <section id="numbers" className="numbers" ref={sectionRef}>
      <div className="container">
        <div className="numbers-grid" data-reveal>
          <div className="number-item">
            <div className="number-row">
              <span className="number-value">{counts.collections}</span>
              <span className="number-suffix">+</span>
            </div>
            <p className="number-label">Private Collections Curated</p>
          </div>

          <div className="number-item">
            <div className="number-row">
              <span className="number-prefix">$</span>
              <span className="number-value">{counts.billions}</span>
              <span className="number-suffix">B</span>
            </div>
            <p className="number-label">In Blue-Chip Art Acquired</p>
          </div>

          <div className="number-item">
            <div className="number-row">
              <span className="number-value">{counts.countries}</span>
            </div>
            <p className="number-label">Countries Represented</p>
          </div>

          <div className="number-item">
            <div className="number-row">
              <span className="number-value">{counts.years}</span>
            </div>
            <p className="number-label">Years of Discretion &amp; Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
}

