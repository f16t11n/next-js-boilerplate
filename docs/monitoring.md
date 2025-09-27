# Open Source Monitoring & Logging

## 1. Sentry (Error Tracking)
- [Sentry](https://sentry.io/) has a free open source plan.
- Install: `npm install @sentry/nextjs`
- Add DSN and config to `/config` (e.g., `sentryDsn`)
- Initialize in `_app.tsx` or custom middleware:
  ```ts
  import * as Sentry from '@sentry/nextjs';
  import config from '@/config/config.dev';
  Sentry.init({ dsn: config.sentryDsn, tracesSampleRate: 1.0 });
  ```
- See Sentry docs for advanced usage.

## 2. Prometheus + Grafana (Metrics & Dashboards)
- [Prometheus](https://prometheus.io/) scrapes metrics from your app.
- [Grafana](https://grafana.com/oss/) visualizes metrics.
- Use [prom-client](https://github.com/siimon/prom-client) for Node.js metrics:
  - `npm install prom-client`
  - Expose `/metrics` endpoint in your API:
    ```ts
    import client from 'prom-client';
    // ...setup metrics
    export async function GET() {
      return new Response(await client.register.metrics(), { headers: { 'Content-Type': client.register.contentType } });
    }
    ```
- Add Prometheus scrape config for `/metrics` endpoint.

## 3. Loki (Log Aggregation)
- [Loki](https://grafana.com/oss/loki/) is a log aggregation system.
- Use [winston-loki](https://github.com/JaniAnttonen/winston-loki):
  - `npm install winston-loki`
  - Add Loki config to `/config` and update Winston logger:
    ```ts
    import LokiTransport from 'winston-loki';
    logger.add(new LokiTransport({ host: config.lokiHost }));
    ```

## 4. Config Example
```ts
// /config/types.ts
export interface Config {
  // ...existing
  sentryDsn?: string;
  lokiHost?: string;
}
```

## 5. Dashboard
- Grafana connects to Prometheus and Loki for unified metrics/logs dashboard.
- All monitoring config is parameterized in `/config`.

---

For more, see official docs:
- Sentry: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- Prometheus: https://prometheus.io/docs/introduction/overview/
- Grafana: https://grafana.com/docs/grafana/latest/
- Loki: https://grafana.com/docs/loki/latest/
