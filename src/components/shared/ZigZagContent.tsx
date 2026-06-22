import * as cheerio from 'cheerio';
import React from 'react';

interface Section {
  heading: string;
  text: string;
  image: string;
}

export default function ZigZagContent({ html }: { html: string }) {
  if (!html) return null;

  const $ = cheerio.load(html);
  const sections: Section[] = [];
  let currentSection: Section = { heading: '', text: '', image: '' };
  
  // Track if we are inside a "skipped" section
  let skipMode = false;

  $('.elementor-widget').each((i, el) => {
    const $el = $(el);
    
    if ($el.hasClass('elementor-widget-heading')) {
      const headingText = $el.find('.elementor-heading-title').text().trim();
      
      // Keywords to ignore completely (these sections will be dropped)
      const ignoreWords = ['CONTACT DETAILS', 'Enquiry Form', 'Equipment Gallery', 'Get in touch', 'Reach Us'];
      if (ignoreWords.some(w => headingText.toUpperCase().includes(w.toUpperCase()))) {
        skipMode = true;
        return;
      }
      
      skipMode = false; // Reset skip mode for a valid heading
      
      // If we have existing content, push it to our sections array
      if (currentSection.text || currentSection.image || currentSection.heading) {
        sections.push({ ...currentSection });
        currentSection = { heading: '', text: '', image: '' };
      }
      currentSection.heading = headingText;
      
    } else if ($el.hasClass('elementor-widget-text-editor')) {
      if (skipMode) return;
      // Get inner HTML, clean up empty paragraphs if needed
      const textHtml = $el.find('.elementor-widget-container').html() || '';
      currentSection.text += textHtml;
      
    } else if ($el.hasClass('elementor-widget-image')) {
      if (skipMode) return;
      // Get the image source
      const src = $el.find('img').attr('src');
      if (src && !currentSection.image) {
        currentSection.image = src;
      }
    }
  });

  // Push the final section if it exists
  if (currentSection.text || currentSection.image || currentSection.heading) {
    sections.push({ ...currentSection });
  }

  // Filter out completely empty sections
  const validSections = sections.filter(s => s.text.trim() || s.image);

  // If we couldn't parse any valid Elementor structure, just render the raw HTML
  // but strip out the bad forms using cheerio first
  if (validSections.length === 0) {
    const cleanedHtml = cheerio.load(html);
    cleanedHtml(':contains("CONTACT DETAILS")').closest('.elementor-section').remove();
    cleanedHtml(':contains("Enquiry Form")').closest('.elementor-section').remove();
    return (
      <div 
        className="prose max-w-none text-gray-600 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: cleanedHtml.html() }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-16 md:gap-24 my-8">
      {validSections.map((section, idx) => {
        // Start with Image on Right (Text on Left) for idx = 0
        const isImageLeft = idx % 2 !== 0;

        return (
          <div key={idx} className={`flex flex-col gap-8 md:gap-16 items-center ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Image Side */}
            <div className="w-full md:w-1/2 flex justify-center">
              {section.image ? (
                <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
                  <img 
                    src={section.image} 
                    alt={section.heading || 'Content Image'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none"></div>
                </div>
              ) : (
                // If there's no image for a section, we just render an empty spacer or nothing
                <div className="hidden md:block w-full max-w-lg aspect-[4/3] rounded-2xl bg-gray-50/50 border border-gray-100 border-dashed"></div>
              )}
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              {section.heading && (
                <h3 className="text-2xl md:text-3xl font-bold text-[#323373] mb-6 relative">
                  {section.heading}
                  <div className="absolute -bottom-3 left-0 w-16 h-1 bg-[#f3b216] rounded-full"></div>
                </h3>
              )}
              {section.text && (
                <div 
                  className="prose prose-lg prose-blue text-gray-600 prose-headings:text-[#323373] prose-a:text-blue-600 marker:text-blue-600 mt-4 max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.text }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
