---
---

# Button badge

<script setup>
import {
BtnBadge, Size, Color,IconEnum
} from "@ghentcdh/ui";


const configs =  {
        default: {},
        square: { square: true },
        ['square outline']: { square: true, outline: true },
        outline: { outline: true },
      };
const buttonSize = Object.values(Size);
const buttonColor = Object.values(Color);
const icons = [undefined, IconEnum.Plus]

</script>

  <table class="table">
    <thead>
      <th></th>
      <template v-for="icon in icons" :key="icon">
        <th v-for="size in buttonSize" :key="size">{{size}}</th>
      </template>
    </thead>
    <tbody>
    <template v-for="(item, key, index) in configs" :key="index">
     <tr> <th>{{key}}</th></tr>
     <tr
        v-for="color in buttonColor"
        :key="color"
      >
      <td>{{color}}</td>
      <template v-for="icon in icons" :key="icon">
        <td v-for="size in buttonSize"
            :key="size"
            class="text-center m-2"
          > 
          <BtnBadge v-bind="item" :size="size" :color="color" :icon="icon">
            {{ item.square ? icon ? '' : 'Square' : 'Button'}} 
          </BtnBadge>
        </td>
      </template>
      </tr>
      </template>
    </tbody>
  </table>