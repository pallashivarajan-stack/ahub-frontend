# Implementation Guide - Remaining Critical Items

## 1. Newsletter API Setup

### Option A: Mailchimp (Easiest for Marketing)

**Step 1: Create API route**

Create: `src/routes/api/subscribe.ts`

```tsx
import { createAPIFileRoute } from '@tanstack/react-start/server';
import { z } from 'zod';

const SubscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const Route = createAPIFileRoute('/api/subscribe')({
  methods: ['POST'],
  async handler({ request }) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const body = await request.json();
      const { email } = SubscribeSchema.parse(body);

      // Add to Mailchimp
      const response = await fetch(
        'https://us1.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email_address: email,
            status: 'pending', // Requires double-opt-in confirmation
            tags: ['ahub-newsletter'],
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return new Response(JSON.stringify({ 
          error: error.title || 'Failed to subscribe' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ 
        success: true,
        message: 'Check your email to confirm subscription' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('[Newsletter Error]', error);
      return new Response(JSON.stringify({ 
        error: 'An error occurred. Please try again.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
});
```

**Step 2: Update Footer component**

```tsx
const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setMessage('❌ Please enter a valid email');
    return;
  }

  setLoading(true);
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json();
      setMessage(`❌ ${data.error || 'Subscription failed'}`);
    } else {
      setMessage('✅ Check your email to confirm subscription!');
      setEmail('');
    }
  } catch (error) {
    setMessage('❌ Network error. Please try again.');
    console.error(error);
  } finally {
    setLoading(false);
  }
};
```

**Step 3: Configure environment**

Add to `.env.production`:
```
MAILCHIMP_API_KEY=your_api_key_here
```

And to `wrangler.jsonc`:
```json
{
  "env": {
    "production": {
      "vars": {
        "MAILCHIMP_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

---

### Option B: SendGrid (Most Reliable)

```tsx
import { Mail } from '@sendgrid/mail';

const mail = new Mail();
mail.setApiKey(process.env.SENDGRID_API_KEY);

export const Route = createAPIFileRoute('/api/subscribe')({
  methods: ['POST'],
  async handler({ request }) {
    try {
      const { email } = await request.json();

      await mail.send({
        to: email,
        from: 'noreply@ahub.in',
        subject: 'Confirm your AHUB Newsletter subscription',
        html: `
          <h1>Welcome to AHUB Newsletter</h1>
          <p>Click the link below to confirm your subscription:</p>
          <a href="https://ahub.in/confirm?email=${encodeURIComponent(email)}">
            Confirm Subscription
          </a>
        `,
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
});
```

---

## 2. Error Monitoring Setup (Sentry)

### Step 1: Install Sentry

```bash
npm install @sentry/react @sentry/tracing
```

### Step 2: Create Sentry Configuration

Create: `src/lib/sentry.ts`

```tsx
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export function initSentry() {
  if (typeof window === 'undefined') return;

  Sentry.init({
    dsn: process.env.VITE_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 
      process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in prod, 100% in dev
    integrations: [
      new BrowserTracing(),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    beforeSend(event) {
      // Filter out errors you don't care about
      if (event.exception) {
        const error = event.exception.values?.[0]?.value;
        if (error?.includes('ResizeObserver')) return null;
        if (error?.includes('SecurityError')) return null;
      }
      return event;
    },
  });
}
```

### Step 3: Initialize in Root Component

Update: `src/routes/__root.tsx`

```tsx
import { useEffect } from 'react';
import { initSentry } from '@/lib/sentry';
import * as Sentry from '@sentry/react';

function RootComponent() {
  useEffect(() => {
    initSentry();
  }, []);

  return (
    // Component JSX
  );
}

// Wrap with Sentry error boundary and profiler
export default Sentry.withProfiler(Sentry.withErrorBoundary(RootComponent, {
  fallback: <DefaultErrorPage />,
}));
```

### Step 4: Enhanced Error Logging

Update: `src/routes/__root.tsx`

```tsx
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Capture error in Sentry
    Sentry.captureException(error, {
      level: 'error',
      tags: {
        source: 'error-boundary',
        page: window.location.pathname,
      },
      contexts: {
        react: {
          componentStack: 'ErrorComponent',
        },
      },
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Our team has been notified and is working on a fix.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={reset} className="...">
            Try again
          </button>
          <a href="/" className="...">
            Go home
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Error ID: {(error as any).__sentryEventId__ || 'unknown'}
        </p>
      </div>
    </div>
  );
}
```

### Step 5: Environment Setup

Add to `.env.production`:
```
VITE_SENTRY_DSN=https://your-key@sentry.io/project
```

Add to `.env.development`:
```
VITE_SENTRY_DSN=https://your-key@sentry.io/project
```

### Step 6: Set Up Sentry Alerts

In Sentry dashboard:
1. Go to Alerts → Create Alert
2. Set condition: When `error.level` is `error`
3. Set action: Send to Slack/Email
4. Set frequency: Real-time

**Recommended Settings**:
- Alert on: Errors, Performance issues
- Notify: Slack channel #engineering
- Frequency: Immediate for 🔴 Critical, Daily digest for 🟠 High

---

## 3. Create Privacy Policy Page

### Create: `src/routes/privacy.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { InternalPageShell } from '@/components/layout/InternalPageShell';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: 'Privacy Policy — AHUB' },
      { 
        name: 'description', 
        content: 'AHUB Privacy Policy. How we collect and use your data.' 
      },
    ],
  }),
});

function PrivacyPage() {
  return (
    <InternalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="How AHUB collects, uses, and protects your personal data."
    >
      <section className="mx-auto max-w-3xl px-6 py-12 md:px-10">
        <article className="prose prose-neutral max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            When you visit our website or subscribe to our newsletter, we collect:
          </p>
          <ul>
            <li><strong>Email Address</strong>: For newsletter subscription</li>
            <li><strong>Usage Data</strong>: Pages visited, time spent (via analytics)</li>
            <li><strong>Device Information</strong>: Browser type, device type</li>
          </ul>

          <h2>2. How We Use Your Data</h2>
          <ul>
            <li>Send newsletters and updates</li>
            <li>Improve website functionality</li>
            <li>Analyze usage patterns</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>
            We use industry-standard encryption and security measures to protect your data.
            Data is stored securely on Cloudflare Workers with end-to-end encryption.
          </p>

          <h2>4. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Request deletion (right to be forgotten)</li>
            <li>Opt-out of communications</li>
            <li>Data portability</li>
          </ul>

          <p>
            To exercise these rights, contact us at{' '}
            <a href="mailto:privacy@ahub.in">privacy@ahub.in</a>
          </p>

          <h2>5. Third-Party Services</h2>
          <ul>
            <li><strong>Mailchimp</strong>: Newsletter management</li>
            <li><strong>Sentry</strong>: Error tracking</li>
            <li><strong>Google Analytics</strong>: Usage analytics</li>
          </ul>

          <p>These services have their own privacy policies.</p>

          <h2>6. Cookies</h2>
          <p>
            We use minimal cookies. Essential cookies are required for site functionality.
            You can control cookies through your browser settings.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about this policy? Contact us at{' '}
            <a href="mailto:privacy@ahub.in">privacy@ahub.in</a>
          </p>

          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </article>
      </section>
    </InternalPageShell>
  );
}
```

---

## 4. Deployment Checklist

Before deploying to production:

### Security
- [ ] Environment variables configured in Cloudflare
- [ ] CORS headers set correctly
- [ ] CSP headers configured
- [ ] HTTPS enforced
- [ ] No secrets in code or git history

### Functionality
- [ ] Newsletter form connects to API
- [ ] Emails sent to subscribers
- [ ] Error monitoring captures errors
- [ ] All external links working
- [ ] Privacy page accessible

### Performance
- [ ] LCP < 2.5s
- [ ] FCP < 1.5s
- [ ] CLS < 0.1
- [ ] Images optimized
- [ ] Code minified

### SEO
- [ ] Meta tags correct
- [ ] OG images present
- [ ] sitemap.xml generated
- [ ] robots.txt configured
- [ ] Schema markup valid

### Accessibility
- [ ] WCAG AA score > 90
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Colors have sufficient contrast
- [ ] Motion animations respect prefers-reduced-motion

---

## 5. Monitoring & Metrics

### Key Metrics to Track

**User Engagement**:
- Newsletter signups per day
- Click-through rate on CTAs
- Scroll depth (how far users scroll)

**Technical Health**:
- Error rate (should be < 0.1%)
- API response time (should be < 500ms)
- Page load time (should be < 2.5s LCP)

**Business Metrics**:
- Visitor count
- Bounce rate
- Conversion rate (signup → inquiry)

### Setup Monitoring

In Sentry dashboard:
1. Create custom metrics for newsletter signups
2. Set alerts for error rate > 1%
3. Enable performance monitoring
4. Track custom events in Google Analytics

---

*Implementation Guide Complete*  
*Last Updated: June 1, 2026*
