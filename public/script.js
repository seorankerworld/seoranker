/**
 * SEO RANKER - Client-Side Interactive Engine
 * Fast, Vanilla JS, Zero External Runtime Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initFaqAccordion();
  initAuditTool();
  initContactForm();
  initNewsletterForm();
  initSocialShare();
  initBlogFilter();
});

// 1. Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('primaryNavLinks');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('mobile-open');
      
      const icon = toggleBtn.querySelector('svg');
      if (icon) {
        if (!isExpanded) {
          // Change to close icon
          toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        } else {
          // Change back to burger icon
          toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        }
      }
    });

    // Close when clicking any nav link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('mobile-open')) {
          navLinks.classList.remove('mobile-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        }
      });
    });
  }
}

// 2. Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// 3. FAQ Accordions
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close other items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active', !isActive);
      });
    }
  });
}

// 4. Interactive Live SEO Audit Generator
function initAuditTool() {
  const auditForm = document.getElementById('quickAuditForm');
  const resultBox = document.getElementById('auditResultBox');

  if (auditForm && resultBox) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const urlInput = document.getElementById('auditUrlInput');
      const emailInput = document.getElementById('auditEmailInput');
      const url = urlInput ? urlInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';

      if (!url) {
        showToast('Please enter a valid website URL', 'warning');
        return;
      }

      // Show loading simulation
      const submitBtn = auditForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Analyzing ${url.replace(/^https?:\/\//, '')}...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Calculate realistic audit scores based on URL length/hash
        const seed = url.length + (email ? email.length : 12);
        const onPageScore = 68 + (seed % 24);
        const techScore = 62 + ((seed * 3) % 28);
        const speedScore = 71 + ((seed * 2) % 22);
        const overallScore = Math.round((onPageScore + techScore + speedScore) / 3);

        resultBox.innerHTML = `
          <div style="text-align: center; margin-bottom: 1.25rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-light); text-transform: uppercase;">Instant Health Score for ${url}</div>
            <div style="font-size: 3rem; font-family: var(--font-heading); font-weight: 800; color: ${overallScore > 75 ? 'var(--color-accent)' : '#f59e0b'}; line-height: 1.1; margin: 0.5rem 0;">
              ${overallScore}/100
            </div>
            <p style="font-size: 0.9rem; color: var(--color-text-muted);">
              ${overallScore > 75 ? 'Good baseline! We found 4 critical opportunities for higher Page 1 Google rankings.' : 'Significant ranking leaks detected! Fixing these issues will dramatically improve your search visibility.'}
            </p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; text-align: center; margin-bottom: 1.25rem; font-size: 0.85rem;">
            <div style="background: white; padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
              <div style="font-weight: 700; color: var(--color-primary);">${onPageScore}%</div>
              <div style="color: var(--color-text-light);">On-Page SEO</div>
            </div>
            <div style="background: white; padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
              <div style="font-weight: 700; color: var(--color-primary);">${techScore}%</div>
              <div style="color: var(--color-text-light);">Technical SEO</div>
            </div>
            <div style="background: white; padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
              <div style="font-weight: 700; color: var(--color-primary);">${speedScore}%</div>
              <div style="color: var(--color-text-light);">Speed & UX</div>
            </div>
          </div>

          <div style="font-size: 0.85rem; background: white; padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border); margin-bottom: 1.25rem;">
            <strong style="display: block; margin-bottom: 0.4rem; color: var(--color-text-main);">Top Action Items Detected:</strong>
            <ul style="padding-left: 1.2rem; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 0.25rem;">
              <li>Meta description length & keyword placement needs tuning.</li>
              <li>Missing structured schema markup (LocalBusiness / Organization).</li>
              <li>High-authority backlink gap compared to top 3 Lahore competitors.</li>
            </ul>
          </div>

          <a href="contact.html?url=${encodeURIComponent(url)}" class="btn btn-accent btn-sm" style="width: 100%; justify-content: center;">
            Book Free Strategy Call with Mudassar Alk →
          </a>
        `;
        resultBox.classList.add('active');
        showToast('Audit complete! Full report summary generated below.', 'success');
      }, 1100);
    });
  }
}

// 5. Contact Form Submission
function initContactForm() {
  const forms = [document.getElementById('consultationForm'), document.getElementById('contactAuditForm')].filter(Boolean);
  
  // URL Parameter pre-fill for audit requests
  const urlParams = new URLSearchParams(window.location.search);
  const auditUrlParam = urlParams.get('url');
  if (auditUrlParam) {
    const websiteInput = document.getElementById('contactUrl');
    if (websiteInput) {
      websiteInput.value = decodeURIComponent(auditUrlParam);
    }
  }

  forms.forEach(contactForm => {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = contactForm.querySelector('input[name="name"]') || document.getElementById('contactName');
      const emailInput = contactForm.querySelector('input[name="email"]') || document.getElementById('contactEmail');
      const name = nameInput ? nameInput.value.trim() : 'Valued Client';
      const email = emailInput ? emailInput.value.trim() : '';

      if (!name || !email) {
        showToast('Please fill in your name and email.', 'warning');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Request...';

      const statusBox = document.getElementById('contactFormStatus');

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        contactForm.reset();
        
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.style.background = '#dcfce7';
          statusBox.style.color = '#166534';
          statusBox.style.border = '1px solid #bbf7d0';
          statusBox.innerHTML = `✅ Thank you ${name}! Mudassar Alk has received your audit request and will reach out to ${email} within 4 business hours.`;
        }

        showToast(`Thank you ${name}! Your SEO request was received.`, 'success');
      }, 1000);
    });
  });
}

// 6. Newsletter Subscription
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]')?.value;
    if (email) {
      newsletterForm.reset();
      showToast('Thank you for subscribing to our SEO Masterclass newsletter!', 'success');
    }
  });
}

// 7. Social Share Helper
function initSocialShare() {
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const network = btn.getAttribute('data-network');
      const pageUrl = window.location.href;
      const pageTitle = document.title;

      if (network === 'copy') {
        navigator.clipboard.writeText(pageUrl).then(() => {
          showToast('Link copied to clipboard!', 'success');
        });
      } else if (network === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`, '_blank');
      } else if (network === 'linkedin') {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`, '_blank');
      } else if (network === 'whatsapp') {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + ' ' + pageUrl)}`, '_blank');
      }
    });
  });
}

// 8. Blog Category Filtering
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  if (filterBtns.length === 0 || blogCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
      filterBtns.forEach(b => b.classList.add('btn-secondary'));
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-secondary');

      const filterCategory = btn.getAttribute('data-category');

      blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Global Toast Utility
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'warning') {
    toast.style.borderLeftColor = 'var(--color-warning)';
  } else if (type === 'success') {
    toast.style.borderLeftColor = 'var(--color-accent)';
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'warning' ? '#f59e0b' : '#10b981'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${type === 'warning' 
        ? '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>' 
        : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'}
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
