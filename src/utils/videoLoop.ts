export const VIDEO_FADE_DURATION_SECONDS = 0.5;
export const VIDEO_LOOP_RESTART_DELAY_MS = 100;

export function calculateVideoLoopOpacity(
  currentTime: number,
  duration: number,
  fadeDuration: number = VIDEO_FADE_DURATION_SECONDS,
): number {
  if (!Number.isFinite(duration) || duration <= 0 || !Number.isFinite(currentTime)) {
    return 0;
  }
  if (currentTime <= 0 || currentTime >= duration) {
    return 0;
  }

  const effectiveFade = Math.min(Math.max(fadeDuration, 0.01), duration / 2);

  if (currentTime < effectiveFade) {
    return Math.min(1, Math.max(0, currentTime / effectiveFade));
  }

  const remaining = duration - currentTime;
  if (remaining < effectiveFade) {
    return Math.min(1, Math.max(0, remaining / effectiveFade));
  }

  return 1;
}

export interface JourneyFormData {
  name: string;
  email: string;
  focus: string;
}

export interface ReachUsFormData {
  name: string;
  email: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<'name' | 'email' | 'focus' | 'message', string>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateJourneyForm(data: JourneyFormData): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!data.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.focus.trim()) {
    errors.focus = 'Please select a discipline.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateReachUsForm(data: ReachUsFormData): ValidationResult {
  const errors: ValidationResult['errors'] = {};

  if (!data.name.trim()) {
    errors.name = 'Please enter your name.';
  }
  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (data.message.trim().length < 10) {
    errors.message = 'Please share a brief note (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
