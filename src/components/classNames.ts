export default function classNames(
  ...classes: (string | boolean | undefined)[]
) {
  return classes.filter((x) => x).join(' ')
}
