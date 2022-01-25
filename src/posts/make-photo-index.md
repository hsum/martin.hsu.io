---
title: make photo index
description: create single image index
date: 2022-01-25
tags:
  - imagemagick
  - recipe
related_links:
  - ['montage', 'https://stackoverflow.com/questions/37709879/how-to-generate-a-collage-image-like-shown', null]
  - ['mogrify', 'https://legacy.imagemagick.org/discourse-server/viewtopic.php?t=19423', null]
---
```
2022-01-25 11:42:10 [hsum@5700g photos ]$ mogrify -resize 400x300! -bordercolor "#222222" -border "0x5%" -gravity SouthEast -font Ubuntu  -pointsize 14 -fill "#eeeeee" -annotate +0+0  %[exif:DateTimeOriginal] -path ./annotated *.jpg
2022-01-25 11:42:12 [hsum@5700g annotated ]$ montage -geometry +0+0 -tile 8x *.jpg index.jpg
```



