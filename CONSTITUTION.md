# SmartTrak Constitution

## Purpose

SmartTrak exists to deliver dependable software with clear ownership, strong product judgment, and sustainable engineering practices. This document defines the standards that guide how the project is built, reviewed, and maintained.

## Core Principles

1. Users first. Product and technical decisions should improve reliability, clarity, safety, and usefulness for the people depending on SmartTrak.
2. Simplicity over cleverness. Prefer solutions that are easy to understand, test, operate, and extend.
3. Quality is a feature. Code is not complete until it is maintainable, reviewed, and verified at an appropriate level.
4. Transparent collaboration. Decisions, tradeoffs, and follow-up work should be documented where teammates can find them.
5. Sustainable progress. We optimize for steady delivery rather than short-term speed that creates long-term instability.

## Non-Negotiable Standards

1. Every change must have a clear reason.
2. Production code must be readable by someone new to the project.
3. Changes should be as small as practical while still solving the problem well.
4. Breaking changes must be explicit and documented.
5. Security, privacy, and data integrity concerns take priority over convenience.
6. Known risks and shortcuts must be called out rather than hidden.

## Engineering Expectations

### Code

- Prefer explicit, well-named code over dense abstractions.
- Match existing project patterns unless there is a strong reason to improve them.
- Keep modules focused on a single responsibility.
- Add comments only when they explain intent, tradeoffs, or non-obvious behavior.

## Tech Stack

- The default frontend stack for SmartTrak is Next.js with React.js and Tailwind CSS.
- Frontend navigation, layouts, and route composition should follow Next.js conventions unless a strong project-level reason requires a different approach.
- Frontend features should be implemented as composable React components with clear responsibilities and predictable data flow.
- Frontend UI work should prefer Tailwind utility classes over ad hoc CSS unless there is a clear maintainability or performance reason not to.
- Shared visual patterns should be composed into reusable React components instead of repeating long utility chains across the codebase.
- Python is the default backend language for SmartTrak.
- Django is the default backend framework and should be used for core application logic, APIs, admin workflows, and data modeling unless a strong architectural reason requires otherwise.
- PostgreSQL is the default primary database for SmartTrak and should be treated as the source of truth for application data.
- Backend changes should favor clear service boundaries, explicit schema evolution, and safe database migrations.

## Recommended Structure

```text
smarttrak/
├── frontend/
│   ├── public/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── features/
│       ├── services/
│       ├── hooks/
│       ├── utils/
│       ├── styles/
│       └── assets/
├── backend/
│   ├── manage.py
│   ├── config/
│   │   ├── settings/
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── users/
│   │   ├── tracking/
│   │   └── common/
│   ├── templates/
│   ├── static/
│   └── requirements/
├── docs/
├── scripts/
├── .env.example
├── docker-compose.yml
└── README.md
```

- Keep Django project configuration under `backend/config/` and group domain logic into separate apps under `backend/apps/`.
- Keep Next.js application routes and layouts inside `frontend/src/app/`, with shared UI in `components/` and domain-specific code in `features/`.
- Store project documentation in `docs/`, automation helpers in `scripts/`, and environment examples at the repository root.
- This structure is a starting point; it may evolve as long as responsibilities remain clear and the separation between frontend, backend, and shared project operations stays clean.

## Design System

- Design tokens for spacing, color, typography, and layout should be expressed through the Tailwind theme wherever practical.
- Custom CSS should be minimal, intentional, and reserved for cases Tailwind cannot express cleanly.
- New UI should follow consistent primitives so the product feels cohesive across screens and features.

### Testing

- New behavior should include tests when practical.
- Bug fixes should include regression coverage when practical.
- If a change cannot be tested automatically, document how it was validated manually.
- Failing or skipped tests must be intentional and explained.

### Review

- No meaningful change should merge without review.
- Reviews should prioritize correctness, regressions, maintainability, and user impact.
- Feedback should be direct, respectful, and actionable.
- Authors remain responsible for the quality of the final merged change.

### Documentation

- Update documentation when behavior, setup, or operating assumptions change.
- Record important architectural decisions in a durable place.
- Prefer short, current documentation over long, outdated documentation.

## Decision-Making

1. Favor reversible decisions when uncertainty is high.
2. For irreversible decisions, document alternatives and tradeoffs before proceeding.
3. When product, design, and engineering goals conflict, resolve the conflict explicitly instead of letting it drift.
4. In the absence of guidance, choose the path that reduces future maintenance burden.

## Operational Commitments

1. Protect user data and access with least-privilege thinking.
2. Treat reliability issues as product issues, not just technical issues.
3. Make systems observable enough to diagnose failures.
4. Prefer safe rollouts and recovery paths for higher-risk changes.

## Contribution Rules

1. Start with context: understand the problem before changing code.
2. Communicate assumptions early, especially when requirements are ambiguous.
3. Do not silently expand scope; separate follow-up work when needed.
4. Leave the codebase in better shape than you found it when reasonable.
5. Never hide debt. Track it, name it, and make its cost visible.

## Amendment Policy

This constitution is a living project document. It may be amended when the team learns something important, but changes should preserve the spirit of clarity, accountability, and long-term quality. Amendments should be made in pull requests with a short rationale describing what changed and why.

## Default Rule

If a situation is not covered here, choose the option that best supports users, reduces long-term complexity, and improves team clarity.
