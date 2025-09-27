# Isolated Admin Dashboard

## Overview
- The admin dashboard (`/admin`) is an isolated, non-public route for config/service management.
- Not linked from public UI. Must be protected in production (authentication, IP allowlist, etc.).

## Features
- **Config Snapshot:**
  - Shows current config as JSON (read-only for now).
- **Service Management:**
  - Placeholder for future UI/API to manage config/services live.
- **Security Notice:**
  - This dashboard is for internal use only. Never expose without strong protection.

## Usage
- Access: Go to `/admin` route in your app (not linked from navigation).
- To add features: Extend `src/app/admin/page.tsx` with forms, API calls, etc.
- All config changes should be reflected via `/config` files and, in future, via this dashboard.

## Security Best Practices
- Require authentication (admin login) for all access.
- Restrict by IP/network if possible.
- Never expose in production without proper protection.

## Future Enhancements
- Live config editing (with audit log)
- Service toggling/restart
- User management
- Monitoring/metrics integration

---

**Note:**
This dashboard is intentionally isolated for safety and maintainability. All core config remains file-driven unless/until dashboard management is fully implemented and secured.
