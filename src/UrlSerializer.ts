import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    // Reemplazar los espacios en blanco con guiones (-)
    url = url.replace(/\%20/g, '-');
    // Llamar al método parse de la clase padre (DefaultUrlSerializer)
    return super.parse(url);
  }
}
