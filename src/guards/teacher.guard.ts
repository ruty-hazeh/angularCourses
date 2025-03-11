import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const teacherGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  
  if (sessionStorage.getItem('role') === 'teacher')
    return true;
  alert('you are not teacher')

  router.navigate(['/']); 
  return false;
};
