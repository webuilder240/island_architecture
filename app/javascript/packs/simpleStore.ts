export function createStore<S, AN>(options: {
  state: S;
  // eslint-disable-next-line @typescript-eslint/ban-types
  actions: Record<string, Function>;
  middlewares?: ((state: S) => void)[];
}) {
  const _state: S = options.state;
  const actions = options.actions;
  const dispathcer = createEmitter();
  const actionNames = Object.keys(actions);
  const middlewares = options.middlewares || [];

  const actionHandler = {
    get: function (target: any, key: any): any {
      if (typeof target[key] === "object" && target[key] !== null) {
        return new Proxy(target[key], actionHandler);
      } else {
        return target[key];
      }
    },
    set: function (obj: any, prop: string, value: any) {
      obj[prop] = value;
      dispathcer.emit();
      callMiddleware()

      return true;
    },
    deleteProperty: function (obj: any, prop: any) {
			delete obj[prop];
      dispathcer.emit()
      callMiddleware()

			return true;
		}
  };

  const proxyState: S = new Proxy(_state, actionHandler);

  async function dispatch(actionName: AN, ...params: any[]) {
    const key = String(actionName);
    if (actionNames.includes(key)) {
      await actions[key](proxyState, ...params);
    } else {
      throw new Error(`Not Found Action: ${key}`);
    }
  }

  function callMiddleware() {
    const s = getState();
    for (const middleware of middlewares) {
      middleware(s);
    }
  }

  function onChange(callback: () => void) {
    dispathcer.on(callback);
  }

  function getState(): S {
    return proxyState;
  }

  return { dispatch, getState, onChange };
}

type EmitterHandler = () => void;

function createEmitter() {
  const set: Set<EmitterHandler> = new Set<EmitterHandler>();

  const on = (handler: EmitterHandler) => { set.add(handler); };
  const off = (handler: EmitterHandler) => { set.delete(handler); };
  const offAll = () => { set.clear(); };
  const emit = () => { set.forEach((handler) => handler()); };

  return { on, off, offAll, emit };
}
