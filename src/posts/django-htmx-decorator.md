---
title: 'view decorator: htmx_only'
description: htmx is a natural extension of html.  It works well with Django and other server side page generating frameworks and such.  I wrote a simple decorator to require view can be accessed from htmx only.
author: Martin J. Hsu
date: 2021-10-01
tags:
  - django
  - htmx
related_links:
  - ['htmx request headers', 'https://htmx.org/reference/#request_headers', '</>']
  - ['Django, HTMX and Alpine.JS: A Match Made In Heaven', 'https://dev.to/nicholas_moen/what-i-learned-while-using-django-with-htmx-and-alpine-js-24jg', null]
---
htmx is a natural extension of html.  It works well with Django and other server side page generating frameworks and such.  I wrote a simple decorator to require view can be accessed from htmx only.

Aside from testing, you want your htmx Django callables to be accessed from htmx only.  This decorator assures this to be the case.
```
from django.http import HttpResponseForbidden

def htmx_only(view_func):
    def wrap(request, *args, **kwargs):
        if request.headers.get('HX-Request'):
            return view_func(request, *args, **kwargs)
        else:
            return HttpResponseForbidden()
    return wrap
```
