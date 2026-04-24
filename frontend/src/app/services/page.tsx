import type { Metadata } from 'next';
import styles from './services.module.css';

export const metadata: Metadata = {
  title: 'Services — Webcraft Studio',
  description: 'Premium web design, development, strategy, and growth services from Webcraft Studio. Outcome-driven digital solutions for global brands.',
};

// NOTE: This component is now a server component that fetches data.
// It assumes a new table `services` exists and the CMS service exposes
// an endpoint at `/api/cms/services` to retrieve the data.

interface Service {
  id: string; // Assuming a UUID from the DB
  display_order: number;
  title: string;
  price: string;
  outcomes: string[];
  description: string;
}

async function getServices(): Promise<Service[]> {
  try {
    // This API URL should be in an environment variable
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
    const res = await fetch(`${apiUrl}/cms/services`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) {
      console.error(`Failed to fetch services: ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    // Assuming the API returns { success: true, data: [...] }
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return []; // Return empty array on error to prevent render failure
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.labelWrapper}>
            <div className={styles.accentLine} />
            <span className="label">Our Services</span>
          </div>
          <h1 className="display-2">
            Everything you need.{" "}
            <span className="text-gradient">Nothing you don&apos;t.</span>
          </h1>
        </div>

        {services.length > 0 ? (
          <div className={styles.serviceList}>
            {services.map((s, index) => (
              <div key={s.id} className={`card ${styles.serviceCard}`}>
                <span className={styles.serviceNumber}>{(index + 1).toString().padStart(2, '0')}</span>
                <div>
                  <h2 className={styles.serviceTitle}>{s.title}</h2>
                  <p className={styles.serviceDesc}>{s.description}</p>
                  <ul className={styles.outcomesList}>
                    {s.outcomes.map((o) => (
                      <li key={o} className={styles.outcomeItem}>
                        <span className={styles.outcomeArrow}>→</span> {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.priceWrapper}>
                  <div className={styles.price}>{s.price}</div>
                  <a href="/contact" className={`btn btn-primary ${styles.quoteButton}`}>Get a Quote</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <p className="body-lg">Services information is currently unavailable. Please check back later or contact us directly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
