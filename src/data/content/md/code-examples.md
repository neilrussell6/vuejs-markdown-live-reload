Code Examples
=============

```scss
$highlight-color: adjust-hue(red, 15)
$btn-text-color: saturate(blue, 15%);
$btn-hover-text-color: ligthen($btn-text-color, 10%);
.eye-catching {
    border: 32px dashed $highlight-color;

    .btn {
        font-size: 64px;
        color: $btn-text-color;

        &:hover {
            color: $btn-hover-text-color;
        }
    }
}
```

```html
<div class="eye-catching">
    <button class="btn" on-click="goSomewhereNice(me)">escape</button>
</div>
```

```javascript
...
import * as OpinionUtil from 'utils/brain-opinion-util';

const perspective = EmotionUtil.isHappy(me) ? EmotionUtil.OUTLOOK_POSITVE : EmotionUtil.OUTLOOK_NEGATIVE;
const today_data = DataService.fetchDayData(today);
const is_nice_day = OpinionUtil.isNice(today_data, perspective);

if (is_nice_day) {
    // TODO: write go outside code
    ...
```

```bash
# enjoy-the-fresh-air.bash
chars="/-\\|"
echo -e "\e[104menjoyment in progress\e[49m"
while :; do
    for (( i = 0; i < ${#chars}; i++ )); do
        sleep 0.5
        echo -en "\e[32m${chars:$i:1}" "\r\e[39m"
    done
done
```

@[codepen](YNpWQL)
