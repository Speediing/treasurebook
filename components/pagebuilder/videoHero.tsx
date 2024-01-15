'use client';
import MuxPlayer from '@mux/mux-player-react';

export const VideoHero = ({ module }: { module: any }) => {
  console.log(module);

  return (
    <div className="relative flex h-[calc(100vh-76px)] min-h-full w-full flex-col justify-center align-middle text-white md:h-[calc(100vh-91px)]">
      <MuxPlayer
        autoPlay={'muted'}
        loop={true}
        className="--media [--media-object-fit: contain] absolute h-full object-contain"
        streamType="on-demand"
        playbackId={module.playbackId}
        metadata={{
          video_id: module.playbackId,
          video_title: 'Test video title',
          viewer_user_id: 'user-id-007'
        }}
      />
      <h1 className="z-10">Be the hero.</h1>
      <p className="z-10">Build video into your application with ease.</p>
    </div>
  );
};
