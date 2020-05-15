---
layout: post
asset-type: post
name: Demo
title: Demo
title-es: Demo
date: 1999-05-15 00:00:00 +00:00
author: Demo
---

{% capture background_image %}/assets/custom/img/softmod/bg-cta-banneer-business-case-for-change-{{ site.lang }}.jpg{% endcapture %}
{% assign background_position = 'top left' %}
{% capture title %}{% t software-modernisation.cheat-sheet-cta-banner-title %}{% endcapture %}
{% capture description %}{% t software-modernisation.cheat-sheet-cta-banner-text %}{% endcapture %}
{% capture cta_href %}  
  {% if site.lang == "en" %}
      https://info.codurance.com/{{ site.lang }}/case-for-change-questionnaire
  {% else %}
      https://info.codurance.com/{{ site.lang }}/cuestionario-para-preparar-la-gestion-del-cambio
  {% endif %}
{% endcapture %}
{% capture cta_text %}{% t software-modernisation.cheat-sheet-cta-banner-link %}{% endcapture %}
{% capture title %}{% t software-modernisation.in-page-banner-publications-title %}{% endcapture %}
{% include in_page_banner.html background_image=background_image background_position=background_position class="soft-mod-cheat-sheet-cta-banner" cta_href=cta_href cta_text=cta_text description=description title=title %}
