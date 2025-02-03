# Migrating to Wagtail CMS

This document outlines the migration plan from static JSON files to a Wagtail CMS backend for the Social Bristol website.

### Version Management and Deployment Strategy

To manage version skew between deployments, pull requests must update the FE at the same time as the BE, or otherwise deprecate the old field with a warning comment and an issue is opened, linked to the corresponding FE issue, that the deprecated field can be removed from the BE. To speed up development, a code comment can be left beside each deprecated field and eventually all the deprecated fields can be deleted in one go.

In the future we will consider a versioned API and more complex measures to prevent potential outages for the site. We're able to be flexible here as we can expect the BE to deploy, and then manually choose when to deploy the FE with a manual action - we don't care too much about instant site updates when content is published in Wagtail yet.

The FE should be able to render nothing and not error if any field of the BE response is missing. This will also help ensure that the site stays live.


## Security Architecture

Todo.

1. Authentication & Authorization:
   - Admin access restricted to authenticated users
   - Role-based access control for content editors
   - API access controlled via tokens
   - Environment variables for sensitive credentials

2. Infrastructure Security:
   - Cloudflare as primary security layer
   - NGINX as reverse proxy with rate limiting
   - PostgreSQL with restricted network access
   - Regular security updates

3. Data Protection:
   - HTTPS everywhere
   - Secure cookie handling
   - CSRF protection
   - Content Security Policy implementation

### NGINX Configuration Requirements

Todo.

1. SSL termination
2. Rate limiting (10r/s with burst)
3. Security headers
4. Static/media file serving
5. Proxy configuration to Wagtail

## Database Configuration

Todo.

### Backup Strategy

Todo.

1. Local backup with cloud sync:
   - Storage: ~$5/month for 50GB S3 storage
   - Retention: 7 days local, 30 days cloud
   - Estimated total: $5-10/month

## Monitoring and Logging

Todo.
