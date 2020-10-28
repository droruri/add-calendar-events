export function getAuthDetails(){
  if (!localStorage.getItem('googleUser')) return null;

  return JSON.parse(localStorage.getItem('googleUser'));
}
