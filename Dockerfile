FROM codurance/website_build_base:latest

COPY . .

CMD rake serve

EXPOSE 4000
