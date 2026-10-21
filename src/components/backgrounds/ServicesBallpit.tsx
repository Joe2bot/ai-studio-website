import {
  lazy,
  Suspense,
  useCallback,
  useState,
  useSyncExternalStore,
} from "react";

const Ballpit = lazy(() => import("./Ballpit"));
const motionQuery = "(prefers-reduced-motion: reduce)";
const mobileQuery = "(max-width: 767px), (pointer: coarse)";
function subscribe(callback: () => void) {
  const queries = [matchMedia(motionQuery), matchMedia(mobileQuery)];
  queries.forEach((q) => q.addEventListener("change", callback));
  return () =>
    queries.forEach((q) => q.removeEventListener("change", callback));
}
function snapshot() {
  return `${matchMedia(motionQuery).matches}:${matchMedia(mobileQuery).matches}`;
}

export function ServicesBallpit() {
  const preferences = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "true:true",
  );
  const [reducedMotion, mobile] = preferences
    .split(":")
    .map((v) => v === "true");
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => {
    setUnavailable(true);
    setReady(false);
  }, []);
  const active = !reducedMotion && !unavailable;
  return (
    <div
      className="services-ballpit"
      aria-hidden="true"
      data-mode={active ? (ready ? "interactive" : "loading") : "static"}
    >
      <div className="ballpit-fallback">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} />
        ))}
      </div>
      {active && (
        <Suspense fallback={null}>
          <Ballpit
            count={mobile ? 12 : 30}
            colors={["#142b46", "#244d70", "#428ba5", "#82ece6", "#b4f3f1"]}
            material="satin"
            minSize={0.65}
            maxSize={1.3}
            gravity={0}
            friction={0.993}
            wallBounce={0.85}
            bounce={0.8}
            depth={2.5}
            drift={0.25}
            cursorSize={1.5}
            followCursor={!mobile}
            grab={false}
            clickEffect="none"
            intro={false}
            lightColor="#d1ffff"
            lightIntensity={1.2}
            exposure={1.1}
            shadows={0.65}
            dpr={mobile ? 1 : 1.5}
            onReady={onReady}
            onUnavailable={onUnavailable}
          />
        </Suspense>
      )}
    </div>
  );
}
