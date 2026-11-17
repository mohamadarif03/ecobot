import { useEffect, useRef, useState } from 'react';
import {
  VIDEO_FADE_DURATION_SECONDS,
  VIDEO_LOOP_RESTART_DELAY_MS,
  calculateVideoLoopOpacity,
} from '../utils/videoLoop';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';
const LOCAL_BACKUP_VIDEO = '/r2-hero.webm';

export function LoopingVideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isRestartingRef = useRef(false);
  const [videoSrc, setVideoSrc] = useState(HERO_VIDEO_URL);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    let restartTimer: ReturnType<typeof setTimeout> | null = null;
    let isDisposed = false;

    const updateOpacity = () => {
      if (isDisposed) return;

      if (!isRestartingRef.current) {
        const opacity = calculateVideoLoopOpacity(
          video.currentTime,
          video.duration,
          VIDEO_FADE_DURATION_SECONDS,
        );
        video.style.opacity = String(opacity);
      }

      rafId = window.requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      isRestartingRef.current = true;
      video.style.opacity = '0';

      if (restartTimer !== null) {
        clearTimeout(restartTimer);
      }

      restartTimer = setTimeout(() => {
        if (isDisposed) return;
        video.currentTime = 0;
        isRestartingRef.current = false;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            // Autoplay might be blocked by browser policy until user gesture
          });
        }
      }, VIDEO_LOOP_RESTART_DELAY_MS);
    };

    const handleError = () => {
      if (videoSrc !== LOCAL_BACKUP_VIDEO) {
        setVideoSrc(LOCAL_BACKUP_VIDEO);
      }
    };

    video.style.opacity = '0';
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    rafId = window.requestAnimationFrame(updateOpacity);

    const initialPlay = video.play();
    if (initialPlay && typeof initialPlay.catch === 'function') {
      initialPlay.catch(() => {
        // Autoplay blocked gracefully
      });
    }

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(rafId);
      if (restartTimer !== null) {
        clearTimeout(restartTimer);
      }
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  return (
    <div
      className="absolute z-0 pointer-events-none overflow-hidden"
      style={{ inset: 'auto 0 0 0', top: '300px' }}
      aria-hidden="true"
      data-testid="hero-video-container"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover opacity-0 will-change-[opacity]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
    </div>
  );
}
