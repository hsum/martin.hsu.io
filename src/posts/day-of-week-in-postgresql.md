---
title: day of week in postgresql
description: how to extract day of week from a date in postgresql
date: 2021-10-05
author: Martin J. Hsu
tags:
  - sql
  - postgresql
  - recipe
related_links:
  - ['postgresql datetime extract', 'https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-EXTRACT', 'https://www.postgresql.org/favicon.ico']
---

how to extract day of week from a date in postgresql
```
with cte_dow(dow, name) as (
        values
                (0, '日'),
                (1, '一'),
                (2, '二'),
                (3, '三'),
                (4, '四'),
                (5, '五'),
                (6, '六')
), cte_somedates(date) as (
        values
                ('2020-03-04'::date),
                ('2018-02-21'),
                ('2029-12-31'),
                ('1970-08-07'),
                ('1998-04-02'),
                ('1989-10-11')
        union
        select
                (now() + ('1 day'::interval * days))::date as date
        from
                generate_series(1, 14) as days

)


select
        d.date,
        cte_dow.name
from
        cte_dow,
        cte_somedates d
where
        1=1
        and cte_dow.dow=extract(dow from d.date)
order by
        d.date
;
```
