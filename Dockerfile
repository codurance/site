FROM docker.io/ruby:2.3.1

RUN apt-get update 
RUN apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y locales
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN npm install pug -g
RUN apt-get clean
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen
RUN dpkg-reconfigure --frontend=noninteractive locales

# This steps are needed to have aws cli installed on the system
RUN apt-get -y install python3 python-pip python-dev
RUn pip install --upgrade pip
RUN pip install awscli --upgrade --user

RUN gem install bundler
RUN gem install rspec-core -v '3.4.1'
RUN gem install jekyll

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV LC_ALL en_US.UTF-8

WORKDIR /usr/local/src

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

COPY . .

CMD bundle exec rake serve

EXPOSE 4000
