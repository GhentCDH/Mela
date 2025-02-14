---
Table
---

# Table

<script setup>
import {
Table, TextCell
} from "@ghentcdh/ui";

const displayColumns = [
  {
    component: TextCell,
    id: 'name',
    label: 'Name',
  },
  {
    component: TextCell,
    id: 'firstName',
    label: 'First Name',
  },
];

const data = [
  { name: 'Six', firstName: 'Joren' },
  { name: 'Vandersteene', firstName: 'Bo' },
];

const pageSize = 20;
const page = {
  count: pageSize * 5,
  pageSize,
  page: 1,
};

</script>

<Table :loading="false" 
        :data="data"        
        :displayColumns="displayColumns" 
        :page="page"/>

## Loading table
<Table :loading="true"
        :displayColumns="displayColumns"
        :page="page"/>