import { PipeTransform, Pipe } from '@angular/core';
import { TaskSimple } from '../dominio/task.domain';

@Pipe({name:'filter'})
export class FilterPipe implements PipeTransform{
    transform(items: any[], searchText: string):any[] {
        if(!items) return [];
        if(!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(function(item:TaskSimple){
            return item.title.toLowerCase().includes(searchText);
        });
    }
    
}
