# Menu


<script setup>
import { Menu } from "@ghentcdh/ui";

const menuItems = [
     {
        label: "item",
        action: () => alert("Item clicked")
     },
     {
        label: "Disabled item",
        disabled: true,
        // action: () => alert("Disabled item clicked")
      },
     { 
        label: 'Menu dropdown',
        items:[
           {
            label: "label"
          },
           {
            label: "Item 1",
            action: () => alert("Item 1 clicked")
          },
          {
            label: "Item 2",
            action: () => alert("Item 2 clicked")
          },
          {
            label: "Item 3",
            action: () => alert("Item 3 clicked")
          },
          {
            label: "Disabled item",
            disabled: true,
            action: () => alert("Item 3 clicked")
          },
          {
            label: "Submenu",
            items:[
               {
                label: "Item 1",
                action: () => alert("Submenu Item 1 clicked")
              },
              {
                label: "Item 2",
                action: () => alert("Submenu Item 2 clicked")
              },
            ]
          },
        ]
    }
];

const breadcrumbs = [
    { label: 'Home'},
    { label: 'this page' }
]
</script>


<Menu :breadcrumbs="breadcrumbs" :menu="menuItems"/>
