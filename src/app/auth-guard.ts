import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if(localStorage.getItem('seller')){
    return true
  }
  router.navigate(['/seller'])
  return false
};
