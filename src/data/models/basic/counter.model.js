import { BasicModel } from '../basic.model';
import { CounterDom } from './counter-dom.model';

export const TYPE_NORMAL     = 'counter-type-normal';
export const TYPE_FIBONACCI  = 'counter-type-fibonacci';

export class Counter extends BasicModel {

    get defaults () {
        return {
            local_id:       null,
            dom:            new CounterDom(),
            count:          0,
            interval:       null,
            previous_count: 0,
            type:           TYPE_NORMAL
        };
    }
}
