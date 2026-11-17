import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateVideoLoopOpacity,
  validateJourneyForm,
  validateReachUsForm,
} from './videoLoop';

test('calculateVideoLoopOpacity handles invalid or zero duration', () => {
  assert.equal(calculateVideoLoopOpacity(0, 0), 0);
  assert.equal(calculateVideoLoopOpacity(1, NaN), 0);
  assert.equal(calculateVideoLoopOpacity(-0.5, 10), 0);
  assert.equal(calculateVideoLoopOpacity(10, 10), 0);
});

test('calculateVideoLoopOpacity fades in over 0.5s at start', () => {
  assert.equal(calculateVideoLoopOpacity(0, 10, 0.5), 0);
  assert.equal(calculateVideoLoopOpacity(0.25, 10, 0.5), 0.5);
  assert.equal(calculateVideoLoopOpacity(0.5, 10, 0.5), 1);
});

test('calculateVideoLoopOpacity stays opaque during middle of playback', () => {
  assert.equal(calculateVideoLoopOpacity(1.5, 10, 0.5), 1);
  assert.equal(calculateVideoLoopOpacity(5.0, 10, 0.5), 1);
  assert.equal(calculateVideoLoopOpacity(9.5, 10, 0.5), 1);
});

test('calculateVideoLoopOpacity fades out over 0.5s before end', () => {
  assert.equal(calculateVideoLoopOpacity(9.75, 10, 0.5), 0.5);
  assert.equal(calculateVideoLoopOpacity(9.9, 10, 0.5), 0.1999999999999993);
  assert.equal(calculateVideoLoopOpacity(10.0, 10, 0.5), 0);
});

test('calculateVideoLoopOpacity clamps fade duration for short clips', () => {
  const mid = calculateVideoLoopOpacity(0.3, 0.6, 0.5);
  assert.equal(mid, 1);
  const quarter = calculateVideoLoopOpacity(0.15, 0.6, 0.5);
  assert.equal(quarter, 0.5);
});

test('validateJourneyForm validates required fields and email format', () => {
  const empty = validateJourneyForm({ name: '', email: '', focus: '' });
  assert.equal(empty.valid, false);
  assert.ok(empty.errors.name);
  assert.ok(empty.errors.email);
  assert.ok(empty.errors.focus);

  const badEmail = validateJourneyForm({
    name: 'Elena Vance',
    email: 'not-an-email',
    focus: 'Digital Haven',
  });
  assert.equal(badEmail.valid, false);
  assert.ok(badEmail.errors.email);

  const valid = validateJourneyForm({
    name: 'Elena Vance',
    email: 'elena@aethera.studio',
    focus: 'Digital Haven',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('validateReachUsForm enforces message length and valid email', () => {
  const shortMessage = validateReachUsForm({
    name: 'Marcus',
    email: 'marcus@example.com',
    message: 'Hi',
  });
  assert.equal(shortMessage.valid, false);
  assert.ok(shortMessage.errors.message);

  const valid = validateReachUsForm({
    name: 'Marcus',
    email: 'marcus@example.com',
    message: 'We would love to collaborate on a focused workspace platform.',
  });
  assert.equal(valid.valid, true);
});
