import posthog from 'posthog-js';

const KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://app.posthog.com';

let initialized = false;

function init() {
    if (initialized || !KEY) return;
    posthog.init(KEY, {
        api_host: HOST,
        capture_pageview: true,
        autocapture: false, // manual only — keep events clean
        persistence: 'localStorage',
    });
    initialized = true;
}

function identify(userId: string, email?: string) {
    init();
    if (!KEY) return;
    posthog.identify(userId, { email });
}

function reset() {
    if (!KEY) return;
    posthog.reset();
}

function track(event: string, props?: Record<string, unknown>) {
    init();
    if (!KEY) return;
    posthog.capture(event, props);
}

// Named event helpers — keeps call sites clean and event names consistent
export const analytics = {
    init,
    identify,
    reset,

    // Auth
    signedUp: (userId: string, email: string) => {
        identify(userId, email);
        track('signed_up', { email });
    },
    loggedIn: (userId: string, email: string) => {
        identify(userId, email);
        track('logged_in');
    },
    loggedOut: () => {
        track('logged_out');
        reset();
    },

    // Generation
    generationStarted: (genre: string, title: string) =>
        track('generation_started', { genre, title }),
    generationCompleted: (genre: string, chapterCount: number, durationMs: number) =>
        track('generation_completed', { genre, chapter_count: chapterCount, duration_ms: durationMs }),
    generationFailed: (genre: string, error: string) =>
        track('generation_failed', { genre, error }),

    // Export
    exportStarted: (target: string) => track('export_started', { target }),
    exportCompleted: (target: string) => track('export_completed', { target }),

    // Upgrade funnel
    upgradePromptShown: (trigger: string, currentTier: string) =>
        track('upgrade_prompt_shown', { trigger, current_tier: currentTier }),
    upgradeClicked: (targetTier: string, billingCycle: string) =>
        track('upgrade_clicked', { target_tier: targetTier, billing_cycle: billingCycle }),
    upgradeCompleted: (tier: string) =>
        track('upgrade_completed', { tier }),

    // Onboarding
    onboardingStarted: () => track('onboarding_started'),
    onboardingCompleted: (stepsViewed: number) =>
        track('onboarding_completed', { steps_viewed: stepsViewed }),
    onboardingSkipped: (atStep: number) =>
        track('onboarding_skipped', { at_step: atStep }),
};
