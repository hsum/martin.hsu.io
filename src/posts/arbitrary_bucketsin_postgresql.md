---
title: arbitrary buckets in postgresql
description: how to bucket sequences into arbitrary buckets in postgresql
date: 2022-06-08
tags:
  - sql
  - postgresql
  - recipe
---

how to bucket sequences into arbitrary buckets in postgresql
```
with cte_buckets(name, start_, length_) as (
values
        ('1', 1, 1),
        ('2', 2, 1),
        ('3', 3, 1),
        ('4', 4, 1),
        ('4', 4, 1),
        ('5', 5, 1),
        ('6', 6, 1),
        ('7', 7, 1),
        ('8', 8, 1),
        ('9', 9, 1),
        ('10', 10, 1),
        ('11', 11, 1),
        ('12', 12, 1),
        ('13-15', 13, 3),
        ('16-18', 16, 3),
        ('19-21', 19, 3),
        ('22-24', 22, 3),
        ('25-30', 25, 6),
        ('31-36', 31, 6),
        ('37+', null, null)
)


select
        coalesce(cte_b.name, cte_b2.name) as name,
        x.number
from
        (
                select generate_series(1, 60) as number
        ) as x left join cte_buckets cte_b on (
                1=1
                and x.number>=cte_b.start_
                and x.number<cte_b.start_+cte_b.length_
        ) join cte_buckets cte_b2 on (
                1=1
                and cte_b2.start_ is null
        )
        ;
```

