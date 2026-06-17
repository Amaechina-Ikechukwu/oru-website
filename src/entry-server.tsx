import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <App initialPath={url} />
    </StrictMode>
  );

  let title = "ORU PH Study Center - Academic Portal";
  let description = "Welcome to the Oral Roberts University Port Harcourt Study Center. Earn a global degree with local support. Access your student portal, track application status, and view the latest academic news and events.";

  if (url.includes('/about')) {
    title = "About Us - ORU PH Study Center";
    description = "Learn more about the history, vision, and mission of the Oral Roberts University Port Harcourt Study Center in Nigeria.";
  } else if (url.includes('/programs')) {
    title = "Academic Programs & Majors - ORU PH Study Center";
    description = "Explore our diverse academic programs, from Business Administration to Theology, designed for global excellence.";
  } else if (url.includes('/admissions')) {
    title = "Admissions - ORU PH Study Center";
    description = "Apply to the ORU PH Study Center. Find information on requirements, tuition fees, and the registration process.";
  } else if (url.includes('/news')) {
    title = "News & Events - ORU PH Study Center";
    description = "Stay up to date with the latest news, campus events, and academic announcements from the ORU PH Study Center.";
  } else if (url.includes('/student-portal')) {
    title = "Student Portal - ORU PH Study Center";
    description = "Secure student access for course registration, fee payments, and academic records.";
  }

  const head = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://oruphstudycenter.org.ng${url}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="keywords" content="ORU, Port Harcourt Study Center, Oral Roberts University, Nigeria, Admissions, Timetables, Tuition payments, University degree" />
    <link rel="canonical" href="https://oruphstudycenter.org.ng${url}" />
  `;

  return { html, head };
}
