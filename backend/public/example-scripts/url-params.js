/*
Prefill Form from URL Params by Memberstack
Source: https://www.memberstack.com/scripts/prefill-form-based-on-url-parameters

*/

// Function to get URL parameters
function getURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlParams.entries());
}

// Function to prefill inputs based on URL parameters
function prefillInputs() {
  const urlParams = getURLParams();
  const inputElements = document.querySelectorAll("[ms-code-prefill-param]");
  inputElements.forEach((inputElement) => {
    const paramKey = inputElement.getAttribute("ms-code-prefill-param");
    if (paramKey && urlParams[paramKey]) {
      inputElement.value = urlParams[paramKey];
    }
  });
}

// Call the function to prefill inputs when the page loads
prefillInputs();
