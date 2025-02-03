# Repository Architecture Decision

Do we use separate repositories for the Wagtail CMS backend and Next.js frontend, or adopt a monorepo approach?

## Option 1: Monorepo Approach

Advantages for Open Source:
- Single repository for contributors to clone and understand
- Easier to maintain consistency between API changes and frontend updates
- Simplified contribution process with coordinated PR reviews
- Guaranteed version compatibility between frontend and backend
- Single issue tracker for end-to-end features
- Easier to maintain comprehensive documentation
- Simpler local development setup for contributors

Challenges:
- Larger codebase to download and manage
- Mixed technology stacks in one repository
- CI/CD pipelines need to handle multiple languages/frameworks
- Potential for larger git history

## Option 2: Separate Repositories

Advantages:
1. Clear Separation of Concerns
   - Distinct codebases for content management (Python/Django) and presentation (JavaScript/Next.js)
   - Independent technology stacks can evolve separately
   - Clearer boundaries for team responsibilities

2. Security Benefits
   - The BE CMS code and configuration can be entirely hidden, making it harder for bad actors to find vulnerabilities.

Challenges for Open Source:
- Contributors need to clone multiple repositories
- More complex coordination for related changes
- Risk of version mismatches between frontend and API
- Split issue tracking across repositories
- More complex documentation management

## Decision

Given the open source nature of the project and the tight coupling between frontend and backend changes, we will be adopting a **monorepo approach**. This will:

1. Lower the barrier to entry for contributors, simplifying the development and testing process
2. Help BE API and frontend changes remain in sync.
4. Make it easier to maintain comprehensive documentation.
5. Provide a better experience for issue tracking and feature requests

To address the challenges of a monorepo:
- Use workspace tools (e.g., yarn workspaces, npm workspaces) to manage dependencies
- Set up specialized CI/CD pipelines for each component
- Use git sparse checkout for developers working on specific components
- Maintain clear separation through folder structure:
  ```
  /
  ├── frontend/        # Next.js application
  ├── backend/         # Wagtail CMS
  ├── docs/            # Shared documentation
  ├── scripts/         # Development and deployment scripts
  └── docker/          # Docker configurations
  ```