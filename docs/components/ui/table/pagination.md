---
Pagination
---

# Pagination

<script setup>
import {
PaginationComponent
} from "@ghentcdh/ui";


const itemsPerPage = 20;
</script>

## Default
<PaginationComponent 
   :totalItems="itemsPerPage * 5" 
   :itemsPerPage="itemsPerPage" 
   :currentPage="1"/>


## One item
<PaginationComponent
:totalItems="1"
:itemsPerPage="itemsPerPage"
:currentPage="1"/>

## Zero items
<PaginationComponent
:totalItems="0"
:itemsPerPage="itemsPerPage"
:currentPage="1"/>

## 40 pages
<PaginationComponent
:totalItems="itemsPerPage * 48"
:itemsPerPage="itemsPerPage"
:currentPage="1"/> 

## Active page in the middle
<PaginationComponent
:totalItems="itemsPerPage * 50"
:itemsPerPage="itemsPerPage"
:currentPage="25"/>

## Active page at the end
<PaginationComponent
:totalItems="itemsPerPage * 48"
:itemsPerPage="itemsPerPage"
:currentPage="48"/>