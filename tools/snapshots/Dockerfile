FROM backstopjs/backstopjs:4.5.0
RUN apt-get update && apt-get install -y \
  fonts-oxygen \
  fonts-font-awesome
COPY fonts-open-sans_1.11-1_all.deb /etc/fonts-open-sans_1.11-1_all.deb
RUN apt install /etc/fonts-open-sans_1.11-1_all.deb
