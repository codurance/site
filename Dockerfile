FROM codurance/website_build_base:experimental

COPY . .

CMD rake serve

EXPOSE 4000
