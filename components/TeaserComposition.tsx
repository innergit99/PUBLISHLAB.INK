import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill, Sequence } from 'remotion';
import { motion } from 'framer-motion';

export const TeaserComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames, width, height } = useVideoConfig();

    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const scale = interpolate(frame, [0, 20], [0.8, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Inter, system-ui' }}>

            {/* Background elements */}
            <div style={{ position: 'absolute', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', top: '-50%', left: '-50%' }} />

            <Sequence durationInFrames={fps * 3}>
                <div style={{ textAlign: 'center', opacity, transform: `scale(${scale})` }}>
                    <h1 style={{ fontSize: 80, fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', letterSpacing: -2 }}>
                        SaaS Hell <span style={{ color: '#ef4444' }}>Ends</span> Today.
                    </h1>
                    <p style={{ fontSize: 24, color: '#94a3b8', fontWeight: 500 }}>Too many subscriptions. Too little profit.</p>
                </div>
            </Sequence>

            <Sequence from={fps * 3} durationInFrames={fps * 4}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: 80, fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic' }}>
                        The <span style={{ color: '#6366f1' }}>Artisan</span> Way.
                    </h1>
                    <p style={{ fontSize: 24, color: '#94a3b8', fontWeight: 500 }}>One Unified Engine. Unlimited Growth.</p>
                </div>
            </Sequence>

            <Sequence from={fps * 7}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: 120, height: 120, border: '4px solid #6366f1', borderRadius: '30px', margin: '0 auto 40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 60, height: 60, backgroundColor: '#6366f1', borderRadius: '15px' }} />
                    </div>
                    <h2 style={{ fontSize: 60, fontWeight: 900 }}>ARTISAN AI</h2>
                    <p style={{ fontSize: 20, color: '#6366f1', fontWeight: 900, letterSpacing: 4, textTransform: 'uppercase' }}>Launch Your Studio</p>
                </div>
            </Sequence>

        </AbsoluteFill>
    );
};
