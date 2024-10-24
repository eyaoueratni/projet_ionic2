import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

export const authGuard: CanMatchFn = async(route, segments) => {
  try {
    const auth = inject(AuthService);
    const user = await auth.checkAuth(); 

    if (user) {
      return true; // Utilisateur connecté, accès autorisé
    }

    // Naviguer vers la page de login si l'utilisateur n'est pas connecté
    await auth.navigateByUrl('/login'); 
    return false;

  } catch (e) {
    console.error('AuthGuard error:', e);
    return false; 
  }
};