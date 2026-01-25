# Retailpulses GK Corporate Website

This repository contains the static corporate website for リテルパルス合同会社 (Retailpulses GK). The site presents the company’s EC-focused retail business, curated product themes by life scene, service offerings, and corporate information in Japanese.

## Site overview

- **Home (`index.html`)**: Introduces the company’s EC retail focus and highlights the “life scene” concept for product presentation.
- **Products (`products.html`)**: Curated product themes (e.g., new life, solo living, home office, outdoor/exterior) shown as life-scene collections rather than direct sales.
- **Services (`services.html`)**: Describes EC retail as the core business plus support for EC operations and management tool development.
- **Company (`company.html`)**: Corporate profile, legal information, and summarized business purpose.
- **Contact (`contact.html`)**: Inquiry form that posts to `/api/submit` and communicates responses to users.
- **Privacy (`privacy.html`)**: Privacy policy page.
- **Specified Commercial Transactions (`tokushoho.html`)**: Required legal disclosure for sales conducted through external EC channels.

## Contact form backend

The contact form submits to a serverless endpoint at `/api/submit`, implemented in `functions/api/submit.js`. The endpoint validates required fields and sends email notifications via MailChannels. Configure the following environment variables for delivery:

- `TO_EMAIL`: Destination email address.
- `FROM_EMAIL`: Sender address on your domain.
- `SUBJECT_PREFIX` (optional): Prefix for email subject lines.

## Local usage

Open `index.html` in a browser or serve the repository with any static file server.
