import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
    src: string;
    poster?: string;
    autoPlay?: boolean;
    className?: string;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({ src, poster, autoPlay = false, className }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hls: Hls;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (autoPlay) {
                    video.play().catch(e => console.error("Autoplay failed:", e));
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native support (e.g. Safari)
            video.src = src;
            video.addEventListener('loadedmetadata', () => {
                if (autoPlay) {
                    video.play().catch(e => console.error("Autoplay failed:", e));
                }
            });
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [src, autoPlay]);

    return (
        <video
            ref={videoRef}
            poster={poster}
            controls
            playsInline
            className={className}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
    );
};

export default HlsPlayer;
