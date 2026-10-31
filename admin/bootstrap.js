const adminOrigin = "https://cuk-core-lab.netlify.app";
const schoolHosts = ["cukcorelab.catholic.ac.kr", "hmh6692.github.io"];

if (schoolHosts.includes(window.location.hostname)) {
  window.location.replace(`${adminOrigin}/admin/${window.location.search}${window.location.hash}`);
}
