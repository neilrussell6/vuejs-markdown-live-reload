import { BasicModel } from '../basic.model';

export class CounterDom extends BasicModel {

    get defaults () {
        return {
            cog:                null,
            heading:            null,
            counter:            null,
            button_start:       null,
            button_stop:        null,
            button_reset:       null,
            button_fibonacci:   null
        };
    }
}
