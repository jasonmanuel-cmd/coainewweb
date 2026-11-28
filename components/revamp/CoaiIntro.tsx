"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SEEN = "coai-brand-intro-v1";
const VIDEO = "/brand/coai-intro.mp4";

export function CoaiIntro() {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [open,setOpen] = useState(false);
  const [muted,setMuted] = useState(true);
  const finish = useCallback(() => {
    video.current?.pause();
    if (dialog.current?.open) dialog.current.close();
    setOpen(false);
  }, []);

  useEffect(() => {
    // Never interrupt a deep link, accessibility preference, or a returning visitor.
    if (window.location.hash || window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        (navigator as Navigator & {connection?: {saveData?: boolean}}).connection?.saveData ||
        document.visibilityState !== "visible") return;
    try { if (sessionStorage.getItem(SEEN)) return; } catch { /* storage unavailable */ }
    let active = true;
    const controller = new AbortController();
    const cancel = () => { active = false; controller.abort(); };
    window.addEventListener("pointerdown", cancel, {once:true});
    window.addEventListener("keydown", cancel, {once:true});
    const deadline = window.setTimeout(cancel, 1500);
    fetch(VIDEO,{method:"HEAD",signal:controller.signal}).then(r => {
      if (!active || !r.ok || !r.headers.get("content-type")?.includes("video/mp4")) return;
      try { sessionStorage.setItem(SEEN,"1"); } catch { /* nonpersistent mode */ }
      setOpen(true);
    }).catch(() => { /* absent file or failed network: homepage remains available */ }).finally(() => window.clearTimeout(deadline));
    return () => {
      cancel();
      window.clearTimeout(deadline);
      window.removeEventListener("pointerdown",cancel);
      window.removeEventListener("keydown",cancel);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = dialog.current;
    if (!el || typeof el.showModal !== "function") {finish(); return;}
    try { el.showModal(); } catch { finish(); return; }
    const timer = window.setTimeout(finish,13000);
    const player = video.current;
    if (player) {
      player.muted = true;
      player.play().catch(finish);
    }
    return () => {window.clearTimeout(timer); player?.pause(); if (el.open) el.close();};
  },[open,finish]);

  if (!open) return null;
  return <dialog className="cl-intro" ref={dialog} aria-label="COAI introduction" onCancel={e=>{e.preventDefault();finish();}}>
    <video ref={video} muted={muted} autoPlay playsInline preload="metadata" poster="/brand/coai-banner.webp"
      onEnded={finish} onError={finish} aria-label="COAI brand introduction">
      <source src={VIDEO} type="video/mp4"/>
    </video>
    <div className="cl-intro-controls">
      <button type="button" onClick={() => {if(video.current){video.current.muted=!video.current.muted;setMuted(video.current.muted);}}} aria-pressed={!muted}>{muted?"Enable sound":"Mute sound"}</button>
      <button type="button" className="cl-intro-skip" onClick={finish} autoFocus>Skip intro →</button>
    </div>
    <p className="cl-intro-note">Find the leak. Fix the leak. Run the system.</p>
  </dialog>;
}

export function CoaiBrandMark(){
  const [loaded,setLoaded]=useState(false);
  // Image is decorative; the accessible wordmark remains present.
  return <img className="cl-brand-mark" src="/brand/coai-mark.webp" alt="" width={50} height={50}
      style={{display:loaded?"block":"none"}} onLoad={()=>setLoaded(true)} onError={()=>setLoaded(false)}/>;
}

export function CoaiBrandArtwork(){
  const [loaded,setLoaded]=useState(false);
  return <figure className="cl-brand-art" hidden={!loaded}>
    <img src="/brand/coai-banner.webp" alt="Chaotically Organized AI — Intelligent Business Infrastructure" width={1600} height={678} loading="lazy" onLoad={()=>setLoaded(true)} onError={()=>setLoaded(false)}/>
  </figure>;
}

export function CoaiFullLogo(){
  const [loaded,setLoaded]=useState(false);
  return <img src="/brand/coai-logo.webp" alt="Chaotically Organized AI — Intelligent Business Infrastructure" width={1100} height={733} loading="lazy" style={{display:loaded?"block":"none",width:"min(100%,520px)",height:"auto",margin:"20px 0",borderRadius:"8px"}} onLoad={()=>setLoaded(true)} onError={()=>setLoaded(false)}/>;
}
