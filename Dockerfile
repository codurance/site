FROM codurance/website_build_base:latest

COPY . .

CMD bundle exec rake serve

EXPOSE 4000
