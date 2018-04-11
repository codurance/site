FROM ruby:2.3.1

RUN apt-get update 
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y locales
RUN apt-get clean
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen
RUN dpkg-reconfigure --frontend=noninteractive locales

RUN gem install bundler
RUN gem install rspec-core -v '3.4.1'
RUN gem install jekyll

WORKDIR /site

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

COPY . .

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

CMD bundle exec rake serve
EXPOSE 4000

