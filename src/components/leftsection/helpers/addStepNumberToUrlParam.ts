export function addStepNumberToUrlParam(stepNumber: number): void {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("stepnumber", String(stepNumber));
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
}
