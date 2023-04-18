export const classnames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
