---
title: better arbitrary buckets in postgresql
description: how to better bucket sequences into arbitrary buckets in postgresql
date: 2022-12-15
tags:
  - sql
  - postgresql
  - recipe
  - better
---

how to better bucket sequences into arbitrary buckets in postgresql
This method is more declarative and easier to maintain.  The 2nd cte computes the non-inclusive end values and a reasonable human friendly name for the bucket.  int4range would have been nice, but it can't handle null end values.
```
with cte_buckets_starts(start_) as (
    select ARRAY[
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        16,
        19,
        22,
        25,
        31,
        37
    ]
), cte_buckets(name, start_, end_) as (
    select
        case
            when length_ = 1 then start_::text
            when length_ is null then concat(start_, '+')
            else concat(start_, '-', start_+length_-1)
        end as name_,
        start_,
        start_ + length_ as end_

    from
        (
            select
                start_,
                lead(start_) over (order by start_) - start_ as length_
            from
                (select unnest(start_) from cte_buckets_starts) as b(start_)
        ) as x
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
                and x.number<cte_b.end_
        ) join cte_buckets cte_b2 on (
                1=1
                and cte_b2.end_ is null
        )
        ;
```

