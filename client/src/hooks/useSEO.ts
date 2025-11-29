import { useEffect, useRef } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
}

const DEFAULT_TITLE = "AgroClimb | Career Guidance for BSc Agriculture & Horticulture Students India";
const DEFAULT_DESCRIPTION = "Free career guidance for BSc Agriculture, BSc Horticulture students in India. Discover your best career path - ICAR JRF, IBPS AFO Banking, Agribusiness MBA, Government Jobs. Take our AI career quiz and get personalized guidance from successful alumni.";
const DEFAULT_KEYWORDS = "BSc Agriculture career, BSc Horticulture jobs, ICAR JRF preparation, IBPS AFO exam, agriculture career guidance India, BSc Agriculture government jobs, agribusiness MBA, NET agriculture, career after BSc agriculture, horticulture career options, agricultural officer jobs, NABARD career, FCI jobs agriculture";
const DEFAULT_CANONICAL = "https://agroclimb.com/";

export function useSEO({ title, description, keywords, canonicalPath, ogType = "website" }: SEOProps) {
  const previousValues = useRef<{
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogType: string;
    ogUrl: string;
    twitterTitle: string;
    twitterDescription: string;
    canonical: string;
  } | null>(null);

  useEffect(() => {
    const getMeta = (name: string, isProperty = false): string => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      const meta = document.querySelector(selector) as HTMLMetaElement;
      return meta?.content || "";
    };

    const getCanonical = (): string => {
      const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      return link?.href || DEFAULT_CANONICAL;
    };

    if (!previousValues.current) {
      previousValues.current = {
        title: document.title,
        description: getMeta("description"),
        keywords: getMeta("keywords"),
        ogTitle: getMeta("og:title", true),
        ogDescription: getMeta("og:description", true),
        ogType: getMeta("og:type", true),
        ogUrl: getMeta("og:url", true),
        twitterTitle: getMeta("twitter:title"),
        twitterDescription: getMeta("twitter:description"),
        canonical: getCanonical(),
      };
    }

    const fullTitle = `${title} | AgroClimb`;
    document.title = fullTitle;

    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (meta) {
        meta.content = content;
      } else {
        meta = document.createElement("meta");
        if (isProperty) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    updateMeta("description", description);
    updateMeta("keywords", keywords || DEFAULT_KEYWORDS);
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    
    const fullUrl = canonicalPath ? `https://agroclimb.com${canonicalPath}` : DEFAULT_CANONICAL;
    updateMeta("og:url", fullUrl, true);
    
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) {
      canonical.href = fullUrl;
    }

    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);

    return () => {
      if (previousValues.current) {
        document.title = DEFAULT_TITLE;
        updateMeta("description", DEFAULT_DESCRIPTION);
        updateMeta("keywords", DEFAULT_KEYWORDS);
        updateMeta("og:title", DEFAULT_TITLE, true);
        updateMeta("og:description", DEFAULT_DESCRIPTION, true);
        updateMeta("og:type", "website", true);
        updateMeta("og:url", DEFAULT_CANONICAL, true);
        updateMeta("twitter:title", DEFAULT_TITLE);
        updateMeta("twitter:description", DEFAULT_DESCRIPTION);
        
        const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (canonicalLink) {
          canonicalLink.href = DEFAULT_CANONICAL;
        }
        
        previousValues.current = null;
      }
    };
  }, [title, description, keywords, canonicalPath, ogType]);
}
