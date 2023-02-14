import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatAdded'
})
export class VatAddedPipe implements PipeTransform {
// k  value=burası değiştirilecek parametre , rate ona verilen değer(birden fazla parametre varsa yanına virgul ıle eklenır), number da dönus tıpı
  transform(value: number, rate: number): number {
    return value + (value*rate/100);
  }

}
