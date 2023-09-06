/**
 * Provides the developer with the ability to
 * call multiple functions at the same time with the
 * same arguments. This is useful for using multiple
 * event handlers for the same event.
 *
 * @param fns a series of functions as positional arguments
 * @returns A function that when called will call all of the provided functions with the same arguments
 */
export const callAll: ICaller = (...fns) => {
  return (...args) => fns.forEach((fn) => fn && fn(...args));
};
