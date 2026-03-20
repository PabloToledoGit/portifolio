import { useReducer, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useExperience } from '../context/ExperienceContext';
import { motion } from 'framer-motion';
import { MetricCard } from '../components/console/MetricCard';
import { ActivityLog } from '../components/console/ActivityLog';
import {
  initialDashboardMetrics,
  createLogEntry,
  type DashboardMetrics,
  type LogEntry,
} from '../data/dashboardSeed';
import { Play } from 'lucide-react';

type ConsoleState = 'idle' | 'processing';

interface ConsoleReducerState {
  metrics: DashboardMetrics;
  logs: LogEntry[];
  status: ConsoleState;
}

type ConsoleAction =
  | { type: 'ADD_LOG'; payload: LogEntry }
  | { type: 'UPDATE_METRICS'; payload: Partial<DashboardMetrics> }
  | { type: 'ADD_METRICS'; payload: Partial<DashboardMetrics> }
  | { type: 'SET_STATUS'; payload: ConsoleState };

function reducer(state: ConsoleReducerState, action: ConsoleAction): ConsoleReducerState {
  switch (action.type) {
    case 'ADD_LOG':
      return { ...state, logs: [...state.logs, action.payload].slice(-50) };
    case 'UPDATE_METRICS':
      return { ...state, metrics: { ...state.metrics, ...action.payload } };
    case 'ADD_METRICS': {
      const m = state.metrics;
      const p = action.payload;
      return {
        ...state,
        metrics: {
          mrr: m.mrr + (p.mrr ?? 0),
          activeUsers: m.activeUsers + (p.activeUsers ?? 0),
          conversionsToday: m.conversionsToday + (p.conversionsToday ?? 0),
          reportsGenerated: m.reportsGenerated + (p.reportsGenerated ?? 0),
          queueProcessed: m.queueProcessed + (p.queueProcessed ?? 0),
        },
      };
    }
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    default:
      return state;
  }
}

const initialState: ConsoleReducerState = {
  metrics: { ...initialDashboardMetrics },
  logs: [],
  status: 'idle',
};

export const LiveConsole = () => {
  const { t } = useLanguage();
  const { trackInteraction } = useExperience();
  const [state, dispatch] = useReducer(reducer, initialState);
  const sectionRef = useRef<HTMLElement>(null);
  const hasRecordedVisit = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || hasRecordedVisit.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          hasRecordedVisit.current = true;
          trackInteraction('visit_console');
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [trackInteraction]);

  const runSimulation = () => {
    if (state.status === 'processing') return;
    dispatch({ type: 'SET_STATUS', payload: 'processing' });

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      dispatch({
        type: 'ADD_LOG',
        payload: createLogEntry('info', '[Client] Purchase event triggered'),
      });
      await delay(600);

      dispatch({
        type: 'ADD_LOG',
        payload: createLogEntry('webhook', '[Webhook] Mercado Pago payment.confirmed received'),
      });
      await delay(400);

      dispatch({
        type: 'ADD_LOG',
        payload: createLogEntry('payment', '[Payment] R$ 97,00 processed — plan_id: premium_monthly'),
      });
      await delay(500);

      dispatch({
        type: 'ADD_LOG',
        payload: createLogEntry('queue', '[Queue] Job plan_generation queued'),
      });
      await delay(300);

      dispatch({
        type: 'ADD_LOG',
        payload: createLogEntry('queue', '[Queue] Job plan_generation completed'),
      });
      await delay(400);

      dispatch({
        type: 'ADD_LOG',
        payload: createLogEntry('success', '[API] Plan delivered to user'),
      });

      dispatch({
        type: 'ADD_METRICS',
        payload: {
          mrr: 97,
          activeUsers: 1,
          conversionsToday: 1,
          reportsGenerated: 1,
          queueProcessed: 1,
        },
      });

      await delay(200);
      dispatch({ type: 'SET_STATUS', payload: 'idle' });
      trackInteraction('simulate_dashboard');
    })();
  };

  return (
    <section id="console" className="live-console section-padding" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">04 // {t('console.title')}</span>
          <h2 className="section-title">{t('console.subtitle')}</h2>
        </div>

        <div className="console-grid">
          <div className="console-metrics">
            <MetricCard
              label={t('console.mrr')}
              value={state.metrics.mrr}
              prefix="R$ "
            />
            <MetricCard label={t('console.active_users')} value={state.metrics.activeUsers} />
            <MetricCard label={t('console.conversions_today')} value={state.metrics.conversionsToday} />
            <MetricCard label={t('console.reports_generated')} value={state.metrics.reportsGenerated} />
            <MetricCard label={t('console.queue_processed')} value={state.metrics.queueProcessed} />
          </div>

          <div className="console-actions">
            <motion.button
              className="simulate-btn"
              onClick={runSimulation}
              disabled={state.status === 'processing'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={18} />
              <span>
                {state.status === 'processing' ? t('console.simulating') : t('console.simulate_flow')}
              </span>
            </motion.button>
          </div>

          <div className="console-log-section">
            <span className="log-section-title">{t('console.activity_log')}</span>
            <ActivityLog logs={state.logs} emptyMessage={t('console.empty_log')} />
          </div>
        </div>
      </div>

      <style>{`
        .live-console {
          background: var(--surface);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .console-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-8);
          margin-top: var(--space-10);
        }

        @media (min-width: 768px) {
          .console-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }

          .console-metrics {
            grid-column: 1 / -1;
          }

          .console-log-section {
            grid-column: 1 / -1;
          }
        }

        .console-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: var(--space-4);
        }

        .metric-card {
          padding: var(--space-4);
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .metric-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .console-actions {
          display: flex;
          align-items: center;
        }

        .simulate-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          background: var(--accent);
          color: var(--bg);
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .simulate-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .simulate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .log-section-title {
          display: block;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-bottom: var(--space-2);
        }
      `}</style>
    </section>
  );
};
