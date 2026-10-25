/** Explicit lifecycle ownership for the imperative WebGL renderer. No browser globals are patched. */
export class RuntimeScope {
  readonly controller = new AbortController();
  readonly frames = new Set<number>();
  readonly timers = new Set<number>();
  readonly intervals = new Set<number>();
  private readonly cleanups = new Set<() => void>();

  get signal(): AbortSignal {
    return this.controller.signal;
  }

  own(cleanup: () => void): void {
    if (this.signal.aborted) cleanup();
    else this.cleanups.add(cleanup);
  }

  dispose(): void {
    if (this.signal.aborted) return;
    this.controller.abort();
    this.frames.forEach((id) => window.cancelAnimationFrame(id));
    this.timers.forEach((id) => window.clearTimeout(id));
    this.intervals.forEach((id) => window.clearInterval(id));
    this.cleanups.forEach((cleanup) => cleanup());
    this.frames.clear();
    this.timers.clear();
    this.intervals.clear();
    this.cleanups.clear();
    if (activeScope === this) activeScope = null;
  }
}

let activeScope: RuntimeScope | null = null;
export function activateRuntime(scope: RuntimeScope): void {
  activeScope = scope;
}

function within<T>(scope: RuntimeScope | null, work: () => T): T {
  const previous = activeScope;
  activeScope = scope;
  try {
    return work();
  } finally {
    activeScope = previous;
  }
}

const listeners = new WeakMap<
  EventTarget,
  Map<string, Map<EventListenerOrEventListenerObject, EventListener>>
>();

export function listen(
  target: EventTarget | null | undefined,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void {
  if (!target) return;
  const scope = activeScope;
  if (scope?.signal.aborted) return;
  const config: AddEventListenerOptions =
    typeof options === "boolean" ? { capture: options } : { ...options };
  if (scope && !(target instanceof AbortSignal)) {
    config.signal = config.signal ? AbortSignal.any([scope.signal, config.signal]) : scope.signal;
  }
  const wrapped: EventListener = (event) =>
    within(scope, () =>
      typeof listener === "function" ? listener.call(target, event) : listener.handleEvent(event),
    );
  let events = listeners.get(target);
  if (!events) {
    events = new Map();
    listeners.set(target, events);
  }
  const key = `${type}:${Boolean(config.capture)}`;
  let entries = events.get(key);
  if (!entries) {
    entries = new Map();
    events.set(key, entries);
  }
  if (entries.has(listener)) return;
  entries.set(listener, wrapped);
  target.addEventListener(type, wrapped, config);
  scope?.own(() => {
    target.removeEventListener(type, wrapped, config.capture);
    entries.delete(listener);
  });
}

export function unlisten(
  target: EventTarget | null | undefined,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions,
): void {
  if (!target) return;
  const capture = typeof options === "boolean" ? options : Boolean(options?.capture);
  const entries = listeners.get(target)?.get(`${type}:${capture}`);
  target.removeEventListener(type, entries?.get(listener) ?? listener, options);
  entries?.delete(listener);
}

export function runtimeFrame(callback: FrameRequestCallback): number {
  const scope = activeScope;
  if (scope?.signal.aborted) return 0;
  const id = window.requestAnimationFrame((time) => {
    scope?.frames.delete(id);
    if (!scope?.signal.aborted) within(scope, () => callback(time));
  });
  scope?.frames.add(id);
  return id;
}

export function runtimeCancelFrame(id: number): void {
  window.cancelAnimationFrame(id);
  activeScope?.frames.delete(id);
}

export function runtimeTimeout(callback: () => void, delay = 0): number {
  const scope = activeScope;
  if (scope?.signal.aborted) return 0;
  const id = window.setTimeout(() => {
    scope?.timers.delete(id);
    if (!scope?.signal.aborted) within(scope, callback);
  }, delay);
  scope?.timers.add(id);
  return id;
}

export function runtimeClearTimeout(id: number): void {
  window.clearTimeout(id);
  activeScope?.timers.delete(id);
}
export function runtimeInterval(callback: () => void, delay: number): number {
  const scope = activeScope;
  if (scope?.signal.aborted) return 0;
  const id = window.setInterval(() => {
    if (!scope?.signal.aborted) within(scope, callback);
  }, delay);
  scope?.intervals.add(id);
  return id;
}
export function runtimeClearInterval(id: number): void {
  window.clearInterval(id);
  activeScope?.intervals.delete(id);
}

export function createResizeObserver(callback: ResizeObserverCallback): ResizeObserver {
  const scope = activeScope;
  const observer = new ResizeObserver((entries, instance) => {
    if (!scope?.signal.aborted) within(scope, () => callback(entries, instance));
  });
  scope?.own(() => observer.disconnect());
  return observer;
}
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): IntersectionObserver {
  const scope = activeScope;
  const observer = new IntersectionObserver((entries, instance) => {
    if (!scope?.signal.aborted) within(scope, () => callback(entries, instance));
  }, options);
  scope?.own(() => observer.disconnect());
  return observer;
}
export function createMutationObserver(callback: MutationCallback): MutationObserver {
  const scope = activeScope;
  const observer = new MutationObserver((entries, instance) => {
    if (!scope?.signal.aborted) within(scope, () => callback(entries, instance));
  });
  scope?.own(() => observer.disconnect());
  return observer;
}
export function trackWorker(worker: Worker): Worker {
  activeScope?.own(() => worker.terminate());
  return worker;
}
export function trackContext<T extends RenderingContext | null>(context: T): T {
  if (
    (typeof WebGL2RenderingContext !== "undefined" && context instanceof WebGL2RenderingContext) ||
    (typeof WebGLRenderingContext !== "undefined" && context instanceof WebGLRenderingContext)
  ) {
    activeScope?.own(() => context.getExtension("WEBGL_lose_context")?.loseContext());
  }
  return context;
}
